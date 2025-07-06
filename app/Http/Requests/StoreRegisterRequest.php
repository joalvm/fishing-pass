<?php

namespace App\Http\Requests;

use App\Enums\Company\EntityType;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class StoreRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'entity_type' => ['required', 'string', EntityType::ruleIn()],
            'document_type_id' => ['required', 'integer', PgInteger::id()],
            'document_number' => ['required', 'string'],
            'business_name' => ['required', 'string'],
            'address' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['filled', 'string'],
        ];
    }
}
