<?php

namespace App\Http\Requests;

use App\Enums\CharType;
use App\Enums\LengthType;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class UpdateDocumentTypeRequest extends FormRequest
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
     * @return array<string, array|\Illuminate\Contracts\Validation\ValidationRule|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['filled', 'string'],
            'abbr' => ['filled', 'string'],
            'length_type' => ['filled', 'string', LengthType::ruleIn()],
            'length' => ['filled', 'integer', PgInteger::positive(2)],
            'char_type' => ['filled', 'string', CharType::ruleIn()],
        ];
    }
}
