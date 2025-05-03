FROM golang:1.19-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY main.go ./
COPY templates ./templates
COPY static ./static

RUN go build -o vitalisphere-server .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/vitalisphere-server .
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/static ./static

ENV PORT=8080
EXPOSE 8080

CMD ["./vitalisphere-server"] 