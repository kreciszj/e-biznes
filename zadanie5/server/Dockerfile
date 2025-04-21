FROM golang:1.24.2-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o shop-server .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/shop-server .
EXPOSE 8081
CMD ["./shop-server"]
