package repo

import (
	"context"
	"github.com/diploma/cargo/internal/repo/models"
	"gorm.io/gorm"
)

type ICarRepo interface {
	Get(ctx context.Context, id int) (*models.Car, error)
	Query(ctx context.Context, offset, limit int) ([]models.Car, int, error)
	Create(ctx context.Context, car *models.Car) error
	Update(ctx context.Context, car *models.Car) error
	Delete(ctx context.Context, id int) error
	Search(ctx context.Context, filters *models.Car) ([]models.Car, int, error)
}

type carRepo struct {
	db *gorm.DB
}

func NewCarRepo(db *gorm.DB) ICarRepo {
	return &carRepo{
		db: db,
	}
}

func (r *carRepo) Get(ctx context.Context, id int) (*models.Car, error) {
	var car models.Car
	err := r.db.Preload("Owner").Preload("Images").Preload("Bookings").First(&car, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &car, nil
}

func (r *carRepo) Query(ctx context.Context, offset, limit int) ([]models.Car, int, error) {
	var cars []models.Car
	var count int
	result := r.db.Find(&cars).Limit(limit).Offset(offset)
	return cars, count, result.Error
}

func (r *carRepo) Create(ctx context.Context, car *models.Car) error {
	return r.db.Create(car).Error
}

func (r *carRepo) Update(ctx context.Context, car *models.Car) error {
	return r.db.Save(car).Error
}

func (r *carRepo) Delete(ctx context.Context, id int) error {
	return r.db.Delete(&models.Car{}, id).Error
}

func (r *carRepo) Search(ctx context.Context, filters *models.Car) ([]models.Car, int, error) {
	if filters == nil {
		return nil, 0, nil
	}

	var cars []models.Car
	var total int64
	query := r.db.Preload("Images").Preload("Bookings").Model(&models.Car{})

	if filters.OwnerID != 0 {
		query = query.Where("owner_id = ?", filters.OwnerID)
	}
	if filters.Make != "" {
		query = query.Where("make = ?", filters.Make)
	}
	if filters.Model != "" {
		query = query.Where("model = ?", filters.Model)
	}
	if filters.MinYear != 0 {
		query = query.Where("year >= ?", filters.MinYear)
	}
	if filters.MaxYear != 0 {
		query = query.Where("year <= ?", filters.MaxYear)
	}
	if filters.MinPrice != 0 {
		query = query.Where("price_per_day >= ?", filters.MinPrice)
	}
	if filters.MaxPrice != 0 {
		query = query.Where("price_per_day <= ?", filters.MaxPrice)
	}
	if filters.FuelType != "" {
		query = query.Where("fuel_type = ?", filters.FuelType)
	}
	if filters.Transmission != "" {
		query = query.Where("transmission = ?", filters.Transmission)
	}
	if filters.Seats != 0 {
		query = query.Where("seats = ?", filters.Seats)
	}
	if filters.Location != "" {
		query = query.Where("location = ?", filters.Location)
	}

	query = query.Where("is_available = ?", true)

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if filters.Limit > 0 {
		query = query.Limit(filters.Limit).Offset(filters.Offset)
	}

	err := query.Find(&cars).Error
	if err != nil {
		return nil, 0, err
	}

	return cars, int(total), nil
}
