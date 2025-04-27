package bl

import (
	"context"
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/repo/models"
)

type IUserLogic interface {
	Save(ctx context.Context, user *models.User) error
	Get(ctx context.Context, id int) (*models.User, error)
	Delete(ctx context.Context, id int) error
	Update(ctx context.Context, user *models.User) error
	UpdatePassword(ctx context.Context, user *models.User) error
	Query(ctx context.Context, limit, offset int) ([]models.User, int, error)
	Search(ctx context.Context, filter *models.User) ([]models.User, int, error)
}

type userLogic struct {
	di internal.IAppDeps
}

func NewUserLogic(di internal.IAppDeps) IUserLogic {
	return &userLogic{
		di: di,
	}
}
func (l *userLogic) Get(ctx context.Context, id int) (*models.User, error) {
	userData, err := l.di.Postgres().User.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return userData, nil
}

func (l *userLogic) Save(ctx context.Context, user *models.User) error {
	return l.di.Postgres().User.Create(ctx, user)
}

func (l *userLogic) Delete(ctx context.Context, id int) error {
	return l.di.Postgres().User.Delete(ctx, id)
}

func (l *userLogic) Update(ctx context.Context, user *models.User) error {
	return l.di.Postgres().User.Update(ctx, user)
}

func (l *userLogic) UpdatePassword(ctx context.Context, user *models.User) error {
	return l.di.Postgres().User.UpdatePassword(ctx, user)
}

func (l *userLogic) Query(ctx context.Context, limit, offset int) ([]models.User, int, error) {
	users, total, err := l.di.Postgres().User.Query(ctx, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

func (l *userLogic) Search(ctx context.Context, filter *models.User) ([]models.User, int, error) {
	users, total, err := l.di.Postgres().User.Search(ctx, filter)
	if err != nil {
		return nil, 0, err
	}

	return users, total, nil
}
