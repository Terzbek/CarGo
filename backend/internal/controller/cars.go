package controller

import (
	"github.com/diploma/cargo/internal/bl"
	"github.com/diploma/cargo/internal/repo/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type CarsController struct {
	bl *bl.BL
}

func NewCarsController(bl *bl.BL) *CarsController {
	return &CarsController{
		bl: bl,
	}
}

// @Title		Get
// @Summary	Получить детали машины
// @Tags		car
// @Router		/api/v1/cars/:id [GET]
// @Success	200	{object}	models.Booking
func (cc *CarsController) Get(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	carData, err := cc.bl.CarLogic.Get(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, carData)
	return
}

// not used
func (cc *CarsController) GetAll(c *gin.Context) {
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

	cars, total, err := cc.bl.CarLogic.Query(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cars, "total": total, "limit": limit, "offset": offset})
}

// @Title		Post
// @Summary	Создать запись машины.При создании записи не нужно отправлять поле bookings.
// @Tags		car
// @Router		/api/v1/cars [POST]
// @Param 		req body models.Car true "тело запроса"
// @Success	200	{object}	models.Car
func (cc *CarsController) Post(c *gin.Context) {
	var carData models.Car
	err := c.BindJSON(&carData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.bl.CarLogic.Save(c.Request.Context(), &carData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carData})
	return
}

// @Title		Put
// @Summary	Обновить запись машины
// @Tags		car
// @Router		/api/v1/cars [PUT]
// @Param 		req body models.Car true "тело запроса"
// @Success	200	{object}	models.Car
func (cc *CarsController) Put(c *gin.Context) {
	var carData models.Car
	err := c.BindJSON(&carData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.bl.CarLogic.Update(c.Request.Context(), &carData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carData})
	return
}

// @Title		Delete
// @Summary	Удалить машину
// @Tags		car
// @Router		/api/v1/cars/:id [DELETE]
// @Param 		id path string true "id"
func (cc *CarsController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.bl.CarLogic.Delete(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
	return
}

// @Title		Search
// @Summary	Поиск по машинам. Фильтр: тело запроса
// @Tags		cars
// @Router		/api/v1/cars/search [POST]
// @Param 		req body models.Car true "тело запроса"
// @Success	200	{object}	[]models.Car
func (cc *CarsController) Search(c *gin.Context) {
	var filter models.Car
	err := c.BindJSON(&filter)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cars, total, err := cc.bl.CarLogic.Search(c.Request.Context(), &filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cars, "total": total, "limit": filter.Limit, "offset": filter.Offset})
	return
}
