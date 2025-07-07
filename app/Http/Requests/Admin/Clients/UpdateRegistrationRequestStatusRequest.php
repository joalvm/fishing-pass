<?php

namespace App\Http\Requests\Admin\Clients;

use App\Enums\Company\RegistrationStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRegistrationRequestStatusRequest extends FormRequest
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
            'status' => ['required', 'string', RegistrationStatus::ruleIn()],
            'rejection_reason' => [
                'filled',
                'required_if:status,' . RegistrationStatus::REJECTED->value,
                'string'
            ],
        ];
    }
}
