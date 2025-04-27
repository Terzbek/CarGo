package repo

import (
	"context"
	"github.com/diploma/cargo/internal/repo/models"
	"gorm.io/gorm"
)

type IUserRepo interface {
	Get(ctx context.Context, id int) (*models.User, error)
	Create(ctx context.Context, user *models.User) error
	Update(ctx context.Context, user *models.User) error
	Delete(ctx context.Context, id int) error
	UpdatePassword(ctx context.Context, user *models.User) error
	Query(ctx context.Context, offset, limit int) ([]models.User, int, error)
	Search(ctx context.Context, filters *models.User) ([]models.User, int, error)
}

type userRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) IUserRepo {
	return &userRepo{
		db: db,
	}
}

func (u *userRepo) Get(ctx context.Context, id int) (*models.User, error) {
	var user models.User
	result := u.db.Preload("Cars").First(&user, id)
	return &user, result.Error
}

func (u *userRepo) Query(ctx context.Context, offset, limit int) ([]models.User, int, error) {
	var users []models.User
	var count int
	result := u.db.Find(&users).Limit(limit).Offset(offset)
	return users, count, result.Error
}

func (u *userRepo) Create(ctx context.Context, user *models.User) error {
	return u.db.Create(user).Error
}

func (u *userRepo) Update(ctx context.Context, user *models.User) error {
	return u.db.Save(user).Error
}

func (u *userRepo) Delete(ctx context.Context, id int) error {
	return u.db.Delete(&models.User{}, id).Error
}

func (u *userRepo) UpdatePassword(ctx context.Context, user *models.User) error {
	return u.db.Save(user).Error
}

func (u *userRepo) Search(ctx context.Context, filters *models.User) ([]models.User, int, error) {
	if filters == nil {
		return nil, 0, nil
	}

	var users []models.User
	var total int64
	query := u.db.Model(&models.User{})

	if filters.PhoneNumber != "" {
		query = query.Where("phone_number = ?", filters.PhoneNumber)
	}

	err := query.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	err = query.Find(&users).Error
	if err != nil {
		return nil, 0, err
	}

	return users, int(total), nil
}
