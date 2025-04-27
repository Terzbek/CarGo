package bl

import (
	"github.com/diploma/cargo/internal"
)

type BL struct {
	BookingLogic  IBookingLogic
	CarLogic      ICarLogic
	CarImageLogic ICarImageLogic
	UserLogic     IUserLogic
}

func NewBL(di internal.IAppDeps) *BL {
	return &BL{
		BookingLogic:  NewBookingLogic(di),
		CarLogic:      NewCarLogic(di),
		CarImageLogic: NewCarImageLogic(di),
		UserLogic:     NewUserLogic(di),
	}
}
