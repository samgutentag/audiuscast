<p align="center"><a href="https://audiuscast.com" target="_blank"><img src="https://raw.githubusercontent.com/samgutentag/audiuscast/main/public/logo.png" width="400" alt="Laravel Logo"></a></p>

# Sync your podcast with Audius

Easily import your existing podcast episodes and keep your new ones in sync, with one easy step. It's as simple as adding your podcast's RSS feed and watching the tracks upload automatically

## Running Locally

1. clone the repo
2. copy `.env.example` to `.env`

3. install `mysql`

    1. `brew install mysql` on macOS
    2. start `mysql` with `mysql.server start`
    3. create a database called `laravel`
        1. `mysql> CREATE DATABASE laravel;`
        2. `mysql> USE laravel;`

4. install `redis`

    1. [guide here](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/)
    2. `brew install redis`
    3. start redis server with `redis-server`

5. Running laravel locally
    1. [guide on github](https://gist.github.com/hootlex/da59b91c628a6688ceb1)
    2. make sure `composer` is installed, [guide here](https://formulae.brew.sh/formula/composer)
        1. `brew install composer` on macOS
    3. Rename or copy `.env.example` file to `.env` inside your project root and fill the database information.
    4. Run `composer install`
    5. Run `php artisan key:generate`
    6. Run `php artisan migrate`
    7. Run `php artisan db:seed` to run seeders, if any.
6. install dependencies
    1. `nmp i`
7. start laravel server with `php artisan serve`
8. start Vite app with `npm run dev`

> app will be running on `localhost:8000` by default

## First Run Issues

-   `A class import is missing: You have a missing class import. Try importing this class: 'Illuminate\Support\Facades\Redis'.` error:
    -   **Solve:** in `config/app.php` update the `aliases` function to include `Redis` import at the bottom of the file.

```php
'aliases' => Facade::defaultAliases()->merge([
        // 'Example' => App\Facades\Example::class,
        'Redis' => Illuminate\Support\Facades\Redis::class,
    ])->toArray(),
```
