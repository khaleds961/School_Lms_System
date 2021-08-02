<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('FName');
            $table->string('LName');
            $table->string('Number')->unique();
            $table->string('Email')->unique();
            $table->date('BirthDate');
            $table->string('BloodType');
            $table->string('Adress');
            $table->string('Image');
            $table->timestamps();
            $table->
            foreignId('SectionId')->
            constrained('sections')->
            onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
