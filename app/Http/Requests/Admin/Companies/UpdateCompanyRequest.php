<?php

namespace App\Http\Requests\Admin\Companies;

use App\Enums\Company\EntityType;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class UpdateCompanyRequest extends FormRequest
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
            'business_name' => ['filled', 'string'],
            'document_type_id' => ['filled', 'integer', PgInteger::id()],
            'document_number' => ['filled', 'string'],
            'entity_type' => ['filled', 'string', EntityType::ruleIn()],
            'email' => ['filled', 'string', 'email'],
            'address' => ['filled', 'string'],
            'phone' => ['nullable', 'string'],
        ];
    }
}
