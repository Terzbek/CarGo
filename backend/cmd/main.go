package main

import (
	"context"
	"errors"
	"github.com/diploma/cargo/internal"
	"github.com/diploma/cargo/internal/bl"
	"github.com/diploma/cargo/internal/config"
	"github.com/diploma/cargo/internal/controller"
	"github.com/diploma/cargo/internal/repo"
	"go.uber.org/zap"
	_ "go.uber.org/zap/zapcore"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	log, _ := zap.NewProduction()
	defer log.Sync()
	log.Info("starting CarGo service")

	cfg := config.New()
	if cfg == nil {
		log.Fatal("config is nil")
		return
	}

	err := repo.MigrateDB(cfg)
	if err != nil {
		log.Fatal("failed to migrate database", zap.Error(err))
		return
	}

	postgresConnection, err := repo.OpenConnection(cfg)
	if err != nil {
		log.Fatal("failed to connect to postgres", zap.Error(err))
		return
	}

	postgresRepo := repo.NewPostgresRepo(postgresConnection)
	di := internal.NewDI(postgresRepo, cfg)
	serverBl := bl.NewBL(di)

	srvSvc := &http.Server{
		Addr:         ":" + cfg.Listen,
		Handler:      controller.InitRoutes(serverBl, di),
		WriteTimeout: 10 * time.Minute,
		ReadTimeout:  10 * time.Minute,
	}
	go func() {
		err = srvSvc.ListenAndServe()
		if err != nil && !errors.Is(http.ErrServerClosed, err) {
			log.Fatal("failed to listen and server", zap.Error(err))
			return
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Info("shutting down server...")

	ctx, timeOutCancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer timeOutCancel()

	err = srvSvc.Shutdown(ctx)
	if err != nil {
		log.Fatal("server forced to shutdown", zap.Error(err))
		return
	}

	log.Info("server exiting")
}
