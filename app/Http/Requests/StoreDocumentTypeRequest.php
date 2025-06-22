<?php

namespace App\Http\Requests;

use App\Enums\CharType;
use App\Enums\LengthType;
use Illuminate\Foundation\Http\FormRequest;
use Joalvm\Utils\Rules\PgInteger;

class StoreDocumentTypeRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'abbr' => ['required', 'string'],
            'length_type' => ['required', 'string', LengthType::ruleIn()],
            'length' => ['required', 'integer', PgInteger::positive(2)],
            'char_type' => ['required', 'string', CharType::ruleIn()],
        ];
    }
}
