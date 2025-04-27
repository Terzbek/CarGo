package bl

import (
	"context"
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/repo/models"
)

type ICarLogic interface {
	Get(ctx context.Context, id int) (*models.Car, error)
	Save(ctx context.Context, car *models.Car) error
	Delete(ctx context.Context, id int) error
	Update(ctx context.Context, car *models.Car) error
	Query(ctx context.Context, limit, offset int) ([]models.Car, int, error)
	Search(ctx context.Context, filter *models.Car) ([]models.Car, int, error)
}

type carLogic struct {
	di internal.IAppDeps
}

func NewCarLogic(di internal.IAppDeps) ICarLogic {
	return &carLogic{
		di: di,
	}
}

func (c *carLogic) Get(ctx context.Context, id int) (*models.Car, error) {
	carData, err := c.di.Postgres().Car.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return carData, nil
}

func (c *carLogic) Save(ctx context.Context, car *models.Car) error {
	return c.di.Postgres().Car.Create(ctx, car)
}

func (c *carLogic) Delete(ctx context.Context, id int) error {
	return c.di.Postgres().Car.Delete(ctx, id)
}

func (c *carLogic) Update(ctx context.Context, car *models.Car) error {
	return c.di.Postgres().Car.Update(ctx, car)
}

func (c *carLogic) Query(ctx context.Context, limit, offset int) ([]models.Car, int, error) {
	cars, total, err := c.di.Postgres().Car.Query(ctx, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	return cars, total, nil
}

func (c *carLogic) Search(ctx context.Context, filter *models.Car) ([]models.Car, int, error) {
	cars, total, err := c.di.Postgres().Car.Search(ctx, filter)
	if err != nil {
		return nil, 0, err
	}

	return cars, total, nil
}
