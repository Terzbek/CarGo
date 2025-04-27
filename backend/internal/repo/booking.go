package repo

import (
	"context"
	"github.com/diploma/cargo/internal/repo/models"
	"gorm.io/gorm"
)

type IBookingRepo interface {
	Get(ctx context.Context, id int) (*models.Booking, error)
	Query(ctx context.Context, offset, limit int) ([]models.Booking, int, error)
	Create(ctx context.Context, booking *models.Booking) error
	Update(ctx context.Context, booking *models.Booking) error
	Delete(ctx context.Context, id int) error
	Search(ctx context.Context, filters *models.Booking) ([]models.Booking, int, error)
}

type bookingRepo struct {
	db *gorm.DB
}

func NewBookingRepo(db *gorm.DB) IBookingRepo {
	return &bookingRepo{
		db: db,
	}
}

func (b *bookingRepo) Get(ctx context.Context, id int) (*models.Booking, error) {
	var booking models.Booking
	err := b.db.First(&booking, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &booking, nil
}

func (b *bookingRepo) Query(ctx context.Context, offset, limit int) ([]models.Booking, int, error) {
	var bookings []models.Booking
	var count int
	result := b.db.Find(&bookings).Limit(limit).Offset(offset)
	return bookings, count, result.Error
}

func (b *bookingRepo) Create(ctx context.Context, booking *models.Booking) error {
	return b.db.Create(booking).Error
}

func (b *bookingRepo) Update(ctx context.Context, booking *models.Booking) error {
	return b.db.Save(booking).Error
}

func (b *bookingRepo) Delete(ctx context.Context, id int) error {
	return b.db.Delete(&models.Booking{}, id).Error
}

func (b *bookingRepo) Search(ctx context.Context, filters *models.Booking) ([]models.Booking, int, error) {
	if filters == nil {
		return nil, 0, nil
	}

	var bookings []models.Booking
	var total int64
	query := b.db.Preload("Car").Model(&models.Booking{})

	if filters.Status != "" {
		query = query.Where("status = ?", filters.Status)
	}
	if filters.RenterID != 0 {
		query = query.Where("renter_id = ?", filters.RenterID)
	}
	if filters.CarID != 0 {
		query = query.Where("car_id = ?", filters.CarID)
	}

	err := query.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	if filters.Limit > 0 {
		query = query.Limit(filters.Limit).Offset(filters.Offset)
	}

	err = query.Find(&bookings).Error
	if err != nil {
		return nil, 0, err
	}

	return bookings, int(total), nil
}
