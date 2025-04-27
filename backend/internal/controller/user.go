package controller

import (
	"github.com/diploma/cargo/internal/bl"
	"github.com/diploma/cargo/internal/repo/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type UserController struct {
	bl *bl.BL
}

func NewUserController(bl *bl.BL) *UserController {
	return &UserController{
		bl: bl,
	}
}

// @Title		Get
// @Summary	Получить детали пользователя
// @Tags		user
// @Router		/api/v1/user/:id [GET]
// @Success	200	{object}	models.User
func (uc *UserController) Get(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userData, err := uc.bl.UserLogic.Get(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, userData)
	return
}

// @Title		GetAll
// @Summary	Получить всех пользователей. Сырой роут
// @Tags		user
// @Router		/api/v1/user [GET]
// @Success	200	{object}	[]models.User
func (uc *UserController) GetAll(c *gin.Context) {
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

	users, total, err := uc.bl.UserLogic.Query(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users, "total": total, "limit": limit, "offset": offset})
}

// @Title		Post
// @Summary Создать запись пользователя
// @Tags		user
// @Router		/api/v1/user [POST]
// @Param 		req body models.User true "тело запроса"
// @Success	200	{object}	models.User
func (uc *UserController) Post(c *gin.Context) {
	var userData models.User
	err := c.BindJSON(&userData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.bl.UserLogic.Save(c.Request.Context(), &userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userData})
	return
}

// @Title		Put
// @Summary Обновить запись пользователя
// @Tags		user
// @Router		/api/v1/user [PUT]
// @Param 		req body models.User true "тело запроса"
// @Success	200	{object}	models.User
func (uc *UserController) Put(c *gin.Context) {
	var userData models.User
	err := c.BindJSON(&userData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.bl.UserLogic.Update(c.Request.Context(), &userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userData})
	return
}

// @Title		Delete
// @Summary	Удалить пользователя
// @Tags		user
// @Router		/api/v1/user/:id [DELETE]
// @Param 		id path string true "id"
func (uc *UserController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.bl.UserLogic.Delete(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
	return
}

// @Title		Login
// @Summary	Имитация логина пользователя. Нужно просто отправить номер телефона пользователя. Вернет данные пользователя, которые затем можно использовать в дальнейшем
// @Tags		user
// @Router		/api/v1/user/login [POST]
// @Param 		req body models.User true "тело запроса"
// @Success	200	{object}	models.User
func (uc *UserController) Login(c *gin.Context) {
	var userData models.User
	err := c.BindJSON(&userData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data, total, err := uc.bl.UserLogic.Search(c.Request.Context(), &userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if total == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
		return
	}

	c.JSON(http.StatusOK, data[0])
	return
}
