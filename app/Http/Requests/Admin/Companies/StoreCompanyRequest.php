<?php

namespace App\Http\Requests\Admin\Companies;

use App\Enums\Company\EntityType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Joalvm\Utils\Rules\PgInteger;

class StoreCompanyRequest extends FormRequest
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
            'business_name' => ['required', 'string'],
            'document_type_id' => ['required', 'integer', PgInteger::id()],
            'document_number' => ['required', 'string'],
            'entity_type' => ['required', 'string', EntityType::ruleIn()],
            'email' => ['required', 'string', 'email'],
            'address' => ['required', 'string'],
            'phone' => ['filled', 'string'],
            // Para la creacion del usuario de la empresa
            'user' => ['filled', 'array:email,password,first_name,last_name,notify'],
            'user.first_name' => ['required_with:user', 'string'],
            'user.last_name' => ['required_with:user', 'string'],
            'user.email' => ['required_with:user', 'string', 'email'],
            'user.password' => ['required_with:user', 'string', Password::min(6)->letters()->numbers()->symbols()],
            'user.notify' => [
                'filled',
                function ($attribute, $value, $fail) {
                    if (!is_bool($value)) {
                        $fail(__('validation.boolean', ['attribute' => $attribute]));
                    }
                },
            ],
        ];
    }
}
