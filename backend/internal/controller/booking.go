package controller

import (
	"github.com/diploma/cargo/internal/bl"
	"github.com/diploma/cargo/internal/repo/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type BookingController struct {
	bl *bl.BL
}

func NewBookingController(bl *bl.BL) *BookingController {
	return &BookingController{
		bl: bl,
	}
}

// @Title		Get
// @Summary	Получить детали бронирования
// @Tags		booking
// @Router		/api/v1/booking/:id [GET]
// @Success	200	{object}	models.Booking
func (bc *BookingController) Get(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	bookingData, err := bc.bl.BookingLogic.Get(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, bookingData)
	return
}

// not used
func (bc *BookingController) GetAll(c *gin.Context) {
	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	offset, err := strconv.Atoi(c.Query("offset"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	bookings, total, err := bc.bl.BookingLogic.Query(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookings, "total": total, "limit": limit, "offset": offset})
}

// @Title		Post
// @Summary	Создать запись для брони
// @Tags		booking
// @Router		/api/v1/booking [POST]
// @Param 		req body models.Booking true "тело запроса для бронирования"
// @Success	200	{object}	models.Booking
func (bc *BookingController) Post(c *gin.Context) {
	var bookingData models.Booking
	err := c.BindJSON(&bookingData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = bc.bl.BookingLogic.Save(c.Request.Context(), &bookingData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookingData})
	return
}

// @Title		Put
// @Summary	Обновить запись для брони
// @Tags		booking
// @Router		/api/v1/booking [PUT]
// @Param 		req body models.Booking true "тело запроса"
// @Success	200	{object}	models.Booking
func (bc *BookingController) Put(c *gin.Context) {
	var bookingData models.Booking
	err := c.BindJSON(&bookingData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = bc.bl.BookingLogic.Update(c.Request.Context(), &bookingData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookingData})
	return
}

// @Title		Delete
// @Summary	Удалить бронь
// @Tags		booking
// @Router		/api/v1/booking/:id [DELETE]
// @Param 		id path string true "id"
// @Success	200	{object}	models.Booking
func (bc *BookingController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = bc.bl.BookingLogic.Delete(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
	return
}

// @Title		Search
// @Summary	Поиск по записям брони.Почти все что есть в теле запроса можно найти. То есть можно использовать как фильтр
// @Tags		booking
// @Router		/api/v1/booking/search [POST]
// @Param 		req body models.Booking true "тело запроса"
// @Success	200	{object}	models.Booking
func (bc *BookingController) Search(c *gin.Context) {
	var filter models.Booking
	err := c.BindJSON(&filter)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	bookings, total, err := bc.bl.BookingLogic.Search(c.Request.Context(), &filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookings, "total": total, "limit": filter.Limit, "offset": filter.Offset})
	return
}

// @Title		GetBookingRequest
// @Summary Роут возвращает запросы на бронь на машину пользователя.
// @Tags		booking
// @Router		/api/v1/booking/request/:id [GET]
// @Param 		id path string true "id пользователя"
// @Success	200	{object}	[]models.Booking
func (bc *BookingController) GetBookingRequest(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	requests, err := bc.bl.BookingLogic.GetBookingRequest(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, requests)
	return
}

// @Title		UpdateStatus
// @Summary Роут используется для принятия/отклонения запроса на бронь. Возможные статусы: pending, confirmed, canceled
// @Tags		booking
// @Router		/api/v1/booking/status/update [POST]
// @Param 		req body models.Booking true "достаточны поля id и status"
// @Success	200	{object}	models.Booking
func (bc *BookingController) UpdateStatus(c *gin.Context) {
	var update models.Booking
	err := c.BindJSON(&update)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if update.ID == 0 || update.Status == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id or status"})
		return
	}

	err = bc.bl.BookingLogic.UpdateStatus(c.Request.Context(), update.ID, update.Status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}
