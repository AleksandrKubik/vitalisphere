# Technical Setup Guide for Developers

This document contains technical details for setting up the VITALISPHERE LIMITED website. This is intended for developers or technical staff, not for the client.

## Local Development

### Prerequisites
- Go 1.16 or higher
- Docker and Docker Compose (optional, for containerized development)

### Running Locally
1. Clone the repository:
```bash
git clone <repository-url>
cd VITALISPHERE
```

2. Run directly with Go:
```bash
go run main.go
```

3. Open http://localhost:8080 in your browser

## Production Deployment

### Docker Deployment

1. Build and run using Docker Compose:
```bash
docker-compose up -d --build
```

This will:
- Build a Docker image based on the Dockerfile
- Run the container, mapping port 80 to the application's port 8080
- Mount volumes for static and template files for easy updates

### Nginx Configuration

1. Install Nginx on your server:
```bash
apt-get update
apt-get install nginx
```

2. Copy the provided nginx.conf to your server:
```bash
cp nginx.conf /etc/nginx/sites-available/vitalisphere
```

3. Edit the configuration, replacing:
   - `yourdomain.com` with your actual domain
   - `/path/to/your/app/static/` with the actual path to static files

4. Enable the site and restart Nginx:
```bash
ln -s /etc/nginx/sites-available/vitalisphere /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### SSL Certificate Setup

1. Install Certbot for Let's Encrypt:
```bash
apt-get install certbot python3-certbot-nginx
```

2. Obtain and configure certificates:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Application Structure

- `main.go` - Web server and request handlers
- `templates/` - HTML templates
- `static/` - Static assets (CSS, JS, images, robots.txt, sitemap.xml)
- `Dockerfile` - Container definition
- `docker-compose.yml` - Service configuration
- `nginx.conf` - Reverse proxy configuration

## GitHub Workflow

The included GitHub Actions workflow `.github/workflows/docker-build.yml` will:
1. Build the Docker image on every push to the main branch
2. Test that the application starts correctly
3. Ready for expansion to automatically deploy to production 