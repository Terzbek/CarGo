package repo

import (
	"errors"
	"fmt"
	"github.com/diploma/cargo/internal/config"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func MigrateDB(cfg *config.Config) error {
	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", cfg.Postgres.DBUser, cfg.Postgres.DBPass, cfg.Postgres.DBHost, cfg.Postgres.DBPort, cfg.Postgres.DBName)
	m, err := migrate.New("file://migrations", dbURL)
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return err
	}

	return nil
}

func OpenConnection(cfg *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Almaty", cfg.Postgres.DBHost, cfg.Postgres.DBUser, cfg.Postgres.DBPass, cfg.Postgres.DBName, cfg.Postgres.DBPort)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}
