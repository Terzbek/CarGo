package controller

import (
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/bl"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRoutes(bl *bl.BL, di internal.IAppDeps) *gin.Engine {
	g := gin.New()
	g.Use(gin.Recovery())
	g.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: false,
	}))

	cars := NewCarsController(bl)
	booking := NewBookingController(bl)
	user := NewUserController(bl)

	apiV1 := g.Group("/api/v1")

	carsRouter := apiV1.Group("/cars")
	carsRouter.GET("/:id", cars.Get)
	carsRouter.POST("/search", cars.Search)
	carsRouter.POST("", cars.Post)
	carsRouter.PUT("", cars.Put)
	carsRouter.DELETE("/:id", cars.Delete)

	bookingRouter := apiV1.Group("/booking")
	bookingRouter.GET("/:id", booking.Get)
	bookingRouter.POST("/search", booking.Search)
	bookingRouter.POST("/status/update", booking.UpdateStatus)
	bookingRouter.GET("/requests/:id", booking.GetBookingRequest)
	bookingRouter.POST("", booking.Post)
	bookingRouter.PUT("", booking.Put)
	bookingRouter.DELETE("/:id", booking.Delete)

	userRouter := apiV1.Group("/user")
	userRouter.POST("/login", user.Login)
	userRouter.GET("/:id", user.Get)
	userRouter.GET("", user.GetAll)
	userRouter.POST("", user.Post)
	userRouter.PUT("", user.Put)
	userRouter.DELETE("/:id", user.Delete)

	return g
}
