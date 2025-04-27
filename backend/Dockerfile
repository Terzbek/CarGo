FROM golang:1.23.6-alpine AS builder

RUN go version

COPY . /github.com/diploma/cargo
WORKDIR /github.com/diploma/cargo

# RUN go mod download
RUN GOOS=linux go build -mod vendor -o ./.bin/cargo ./cmd/.

# RUN CGO_ENABLED=0 GOOS=linux go build -mod vendor -o cargo ./cmd/.

FROM alpine:latest

WORKDIR /root/
COPY --from=0 /github.com/diploma/cargo/.bin/cargo .
COPY --from=0 /github.com/diploma/cargo/migrations ./migrations
EXPOSE 8080
        
CMD ["./cargo"]