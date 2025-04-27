package repo

import (
	"gorm.io/gorm"
)

// PostgresRepo - интерфейс работы с базой данных
type PostgresRepo struct {
	DB       *gorm.DB
	Booking  IBookingRepo
	Car      ICarRepo
	CarImage ICarImageRepo
	User     IUserRepo
}

// NewPostgresRepo - конструктор интерфейса работы с базой данных
func NewPostgresRepo(dbHandler *gorm.DB) *PostgresRepo {
	return &PostgresRepo{
		DB:       dbHandler,
		Booking:  NewBookingRepo(dbHandler),
		Car:      NewCarRepo(dbHandler),
		CarImage: NewCarImageRepo(dbHandler),
		User:     NewUserRepo(dbHandler),
	}
}
