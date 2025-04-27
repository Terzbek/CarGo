package repo

import (
	"context"
	"github.com/diploma/cargo/internal/repo/models"
	"gorm.io/gorm"
)

type ICarImageRepo interface {
	Get(ctx context.Context, id int) (*models.CarImage, error)
	Query(ctx context.Context, offset, limit int) ([]models.CarImage, int, error)
	Create(ctx context.Context, carImage models.CarImage) error
	Update(ctx context.Context, carImage models.CarImage) error
	Delete(ctx context.Context, id int) error
}

type carImageRepo struct {
	db *gorm.DB
}

func NewCarImageRepo(db *gorm.DB) ICarImageRepo {
	return &carImageRepo{
		db: db,
	}
}

func (r *carImageRepo) Get(ctx context.Context, id int) (*models.CarImage, error) {
	var carImage models.CarImage
	result := r.db.Where("id = ?", id).First(&carImage)
	if result.Error != nil {
		return nil, result.Error
	}
	return &carImage, nil
}

func (r *carImageRepo) Query(ctx context.Context, offset, limit int) ([]models.CarImage, int, error) {
	var carImages []models.CarImage
	var count int
	result := r.db.Find(&carImages).Offset(offset).Limit(limit)
	if result.Error != nil {
		return nil, 0, result.Error
	}
	return carImages, count, nil
}

func (r *carImageRepo) Create(ctx context.Context, carImage models.CarImage) error {
	return r.db.Create(&carImage).Error
}

func (r *carImageRepo) Update(ctx context.Context, carImage models.CarImage) error {
	return r.db.Save(&carImage).Error
}

func (r *carImageRepo) Delete(ctx context.Context, id int) error {
	return r.db.Delete(&models.CarImage{}, id).Error
}
