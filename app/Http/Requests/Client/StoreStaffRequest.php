<?php

namespace App\Http\Requests\Client;

use App\Enums\Person\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Joalvm\Utils\Rules\PgInteger;

class StoreStaffRequest extends FormRequest
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
            'first_name' => ['required', 'string'],
            'middle_name' => ['nullable', 'string'],
            'last_name_paternal' => ['required', 'string'],
            'last_name_maternal' => ['filled', 'string'],
            'gender' => ['required', 'string', Gender::ruleIn()],
            'document_type_id' => ['required', 'integer', PgInteger::id()],
            'document_number' => ['required', 'string'],
            'phone' => ['filled', 'string'],
            'user' => ['filled', 'array:email,password'],
            'user.email' => ['required_with:user', 'filled', 'email'],
            'user.password' => [
                'required_with:user',
                'filled',
                'string',
                Password::min(6)->letters()->numbers()->symbols()->mixedCase(),
            ],
        ];
    }
}
