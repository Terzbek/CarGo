package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

type Config struct {
	Listen      string `envconfig:"LISTEN" default:"8080"`
	MigratePath string `envconfig:"MIGRATE_PATH" default:"./migrations"`
	Postgres    Postgres
}

type Postgres struct {
	DBHost    string `envconfig:"DB_HOST" default:"localhost"`
	DBPort    string `envconfig:"DB_PORT" default:"5432"`
	DBUser    string `envconfig:"DB_USER" default:"admin"`
	DBPass    string `envconfig:"DB_PASSWORD"`
	DBName    string `envconfig:"DB_NAME" default:"car"`
	DBSSLMode string `envconfig:"DB_SSL_MODE" default:"disable"`
}

func New() *Config {
	cfg := Config{}
	err := envconfig.Process("", &cfg)
	if err != nil {
		log.Fatal(err.Error())
		return nil
	}
	return &cfg
}
