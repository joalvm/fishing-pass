<?php

namespace Database\Factories;

use App\Enums\CharType;
use App\Enums\LengthType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentType>
 */
class DocumentTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'abbr' => $this->faker->lexify('???'),
            'length_type' => $this->faker->randomElement(LengthType::values()),
            'length' => $this->faker->numberBetween(1, 20),
            'char_type' => $this->faker->randomElement(CharType::values()),
        ];
    }
}
