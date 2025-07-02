<?php

namespace App\Http\Requests\Admin\Settings;

use App\Enums\Person\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->exists;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['filled', 'string', 'alpha'],
            'middle_name' => ['nullable', 'string', 'alpha'],
            'last_name_paternal' => ['filled', 'string', 'alpha'],
            'last_name_maternal' => ['nullable', 'string', 'alpha'],
            'document_type_id' => ['filled', 'integer', PgInteger::id()],
            'document_number' => ['filled', 'string'],
            'gender' => ['filled', 'string', Gender::ruleIn()],
            'phone' => ['nullable', 'string', 'regex:/^\+?[0-9]+$/'],
            'email' => ['filled', 'email'],
        ];
    }
}
