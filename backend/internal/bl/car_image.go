package bl

import (
	"context"
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/repo/models"
)

type ICarImageLogic interface {
	Get(ctx context.Context, id int) (*models.CarImage, error)
	Save(ctx context.Context, carImg models.CarImage) error
	Delete(ctx context.Context, id int) error
	Update(ctx context.Context, carImg models.CarImage) error
	Query(ctx context.Context, limit, offset int) ([]models.CarImage, int, error)
}

type carImageLogic struct {
	di internal.IAppDeps
}

func NewCarImageLogic(di internal.IAppDeps) ICarImageLogic {
	return &carImageLogic{
		di: di,
	}
}

func (c *carImageLogic) Get(ctx context.Context, id int) (*models.CarImage, error) {
	bookingData, err := c.di.Postgres().CarImage.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return bookingData, nil
}

func (c *carImageLogic) Save(ctx context.Context, carImg models.CarImage) error {
	return c.di.Postgres().CarImage.Create(ctx, carImg)
}

func (c *carImageLogic) Delete(ctx context.Context, id int) error {
	return c.di.Postgres().CarImage.Delete(ctx, id)
}

func (c *carImageLogic) Update(ctx context.Context, carImg models.CarImage) error {
	return c.di.Postgres().CarImage.Update(ctx, carImg)
}

func (c *carImageLogic) Query(ctx context.Context, limit, offset int) ([]models.CarImage, int, error) {
	images, total, err := c.di.Postgres().CarImage.Query(ctx, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	return images, total, nil
}
