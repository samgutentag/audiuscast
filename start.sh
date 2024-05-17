#!/bin/bash
set -e

# Run migrations
php artisan migrate || echo "Migrations failed, but continuing to start the server..."

# Start the server
exec php artisan serve --host=0.0.0.0 --port=8000
