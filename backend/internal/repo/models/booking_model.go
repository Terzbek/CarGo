package models

import (
	"time"
)

type Booking struct {
	ID         int       `gorm:"primaryKey" json:"id"`
	CarID      uint      `json:"car_id"`
	Car        Car       `gorm:"foreignKey:CarID" json:"car"`
	RenterID   uint      `json:"renter_id"`
	Renter     User      `gorm:"foreignKey:RenterID" json:"-"`
	StartDate  time.Time `json:"start_date"`
	EndDate    time.Time `json:"end_date"`
	TotalPrice float64   `json:"total_price"`
	Status     string    `json:"status"` // pending, confirmed, canceled, completed
	CreatedAt  time.Time `json:"created_at"`
	Limit      int       `gorm:"-" json:"limit,omitempty"`
	Offset     int       `gorm:"-" json:"offset,omitempty"`
}
