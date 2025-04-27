package bl

import (
	"context"
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/repo/models"
)

type IBookingLogic interface {
	Get(ctx context.Context, id int) (*models.Booking, error)
	Save(ctx context.Context, booking *models.Booking) error
	Delete(ctx context.Context, id int) error
	Update(ctx context.Context, booking *models.Booking) error
	Query(ctx context.Context, limit, offset int) ([]models.Booking, int, error)
	Search(ctx context.Context, filter *models.Booking) ([]models.Booking, int, error)
	UpdateStatus(ctx context.Context, bookingID int, status string) error
	GetBookingRequest(ctx context.Context, id int) ([]models.Booking, error)
}

type bookingLogic struct {
	di internal.IAppDeps
}

func NewBookingLogic(di internal.IAppDeps) IBookingLogic {
	return &bookingLogic{
		di: di,
	}
}

func (b *bookingLogic) GetBookingRequest(ctx context.Context, id int) ([]models.Booking, error) {
	userCars, total, err := b.di.Postgres().Car.Search(ctx, &models.Car{OwnerID: uint(id)})
	if err != nil {
		return nil, err
	}

	userCarIDs := make([]uint, 0, total)
	bookingRequests := make([]models.Booking, 0, len(userCarIDs))
	for _, car := range userCars {
		userCarIDs = append(userCarIDs, car.ID)
		bookingRequest, _, bErr := b.di.Postgres().Booking.Search(ctx, &models.Booking{CarID: car.ID})
		if bErr != nil {
			return nil, bErr
		}

		bookingRequests = append(bookingRequests, bookingRequest...)
	}

	return bookingRequests, nil
}

func (b *bookingLogic) Get(ctx context.Context, id int) (*models.Booking, error) {
	bookingData, err := b.di.Postgres().Booking.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return bookingData, nil
}

func (b *bookingLogic) Save(ctx context.Context, booking *models.Booking) error {
	err := b.di.Postgres().Booking.Create(ctx, booking)
	if err != nil {
		return err
	}

	return nil
}

func (b *bookingLogic) Delete(ctx context.Context, id int) error {
	return b.di.Postgres().Booking.Delete(ctx, id)
}

func (b *bookingLogic) UpdateStatus(ctx context.Context, bookingID int, status string) error {
	booking, err := b.di.Postgres().Booking.Get(ctx, bookingID)
	if err != nil {
		return err
	}

	booking.Status = status
	return b.di.Postgres().Booking.Update(ctx, booking)
}

func (b *bookingLogic) Update(ctx context.Context, booking *models.Booking) error {
	return b.di.Postgres().Booking.Update(ctx, booking)
}

func (b *bookingLogic) Query(ctx context.Context, limit, offset int) ([]models.Booking, int, error) {
	images, total, err := b.di.Postgres().Booking.Query(ctx, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	return images, total, nil
}

func (b *bookingLogic) Search(ctx context.Context, filter *models.Booking) ([]models.Booking, int, error) {
	cars, total, err := b.di.Postgres().Booking.Search(ctx, filter)
	if err != nil {
		return nil, 0, err
	}

	return cars, total, nil
}
