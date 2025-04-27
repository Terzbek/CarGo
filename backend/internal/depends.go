package internal

import (
	"github.com/diploma/cargo/internal/config"
	"github.com/diploma/cargo/internal/repo"
)

// IAppDeps - dependency injection container
type IAppDeps interface {
	Postgres() *repo.PostgresRepo
	Config() *config.Config
}

type di struct {
	postgres *repo.PostgresRepo
	cfg      *config.Config
}

func NewDI(postgres *repo.PostgresRepo, cfg *config.Config) IAppDeps {
	return &di{
		postgres: postgres,
		cfg:      cfg,
	}
}

func (di *di) Postgres() *repo.PostgresRepo {
	return di.postgres
}

func (di *di) Config() *config.Config {
	return di.cfg
}
