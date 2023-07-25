<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('syncs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('podcast_id')->refereences('id')->on('podcasts')->onDelete('cascade');
            $table->string('guid');
            $table->text('title');
            $table->text('image')->nullable();
            $table->text('source');
            $table->string('audius_url')->nullable();
            $table->enum('status', ['queued', 'syncing', 'synced', 'failed'])->default('queued');
            $table->boolean('automated')->default(false);
            $table->timestamp('synced_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('syncs');
    }
};
