package models

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	FullName     string    `json:"full_name"`
	Email        string    `gorm:"uniqueIndex" json:"email"`
	PhoneNumber  string    `json:"phone_number,omitempty"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"created_at"`
	Cars         []Car     `json:"cars" gorm:"foreignKey:OwnerID"` // has many
}
