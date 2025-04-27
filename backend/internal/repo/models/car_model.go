package models

import (
	"time"
)

type Car struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	OwnerID      uint       `json:"owner_id"`
	Owner        User       `gorm:"foreignKey:OwnerID;references:ID" json:"owner"`
	Title        string     `json:"title"`
	Description  string     `json:"description"`
	Make         string     `json:"mark"`
	Model        string     `json:"model"`
	Year         int        `json:"year"`
	PricePerDay  float64    `json:"price_per_day"`
	FuelType     string     `json:"fuel_type"`
	MinYear      int        `gorm:"-" json:"min_year,omitempty"`
	MaxYear      int        `gorm:"-" json:"max_year,omitempty"`
	MinPrice     float64    `gorm:"-" json:"min_price"`
	MaxPrice     float64    `gorm:"-" json:"max_price"`
	Transmission string     `json:"transmission"`
	Seats        int        `json:"seats"`
	Location     string     `json:"location"`
	IsAvailable  bool       `json:"is_available"`
	CreatedAt    time.Time  `json:"created_at"`
	Limit        int        `gorm:"-" json:"limit,omitempty"`
	Offset       int        `gorm:"-" json:"offset,omitempty"`
	Images       []CarImage `gorm:"foreignKey:CarID" json:"images"`
	Bookings     []Booking  `gorm:"foreignKey:CarID" json:"bookings"`
}
