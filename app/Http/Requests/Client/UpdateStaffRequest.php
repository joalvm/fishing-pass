<?php

namespace App\Http\Requests\Client;

use App\Enums\Person\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class UpdateStaffRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !is_null($this->user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['filled', 'string'],
            'middle_name' => ['nullable', 'string'],
            'last_name_paternal' => ['filled', 'string'],
            'last_name_maternal' => ['nullable', 'string'],
            'gender' => ['filled', 'string', Gender::ruleIn()],
            'document_type_id' => ['filled', 'integer', PgInteger::id()],
            'document_number' => ['filled', 'string'],
            'phone' => ['nullable', 'string'],
        ];
    }
}
