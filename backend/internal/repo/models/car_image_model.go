package models

type CarImage struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	CarID    uint   `json:"car_id"`
	ImageURL string `json:"image_url"`
}
