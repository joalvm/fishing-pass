<?php

namespace App\Models\Person;

use App\Enums\CharType;
use App\Enums\LengthType;
use App\Enums\Person\Gender;
use App\Models\Company\Company;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;
use Joalvm\Utils\Model;
use Joalvm\Utils\Rules\AlphaSpace;
use Joalvm\Utils\Rules\PgInteger;

/**
 * @property      int          $id
 * @property      int|null     $company_id
 * @property      int          $document_type_id
 * @property      string       $document_number
 * @property      string       $first_name
 * @property      string|null  $middle_name
 * @property      string       $last_name_paternal
 * @property      string|null  $last_name_maternal
 * @property      Gender       $gender
 * @property      string|null  $email
 * @property      string|null  $phone
 * @property-read DocumentType $documentType
 * @property-read Company|null $company
 * @property-read User|null    $user
 */
class Person extends Model
{
    /** @use HasFactory<\Database\Factories\Person\PersonFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $table = 'public.persons';

    protected $fillable = [
        'company_id',
        'document_type_id',
        'document_number',
        'first_name',
        'middle_name',
        'last_name_paternal',
        'last_name_maternal',
        'gender',
        'email',
        'phone',
    ];

    protected $casts = [
        'client_id' => 'integer',
        'document_type_id' => 'integer',
        'gender' => Gender::class,
    ];

    public static function boot(): void
    {
        parent::boot();

        // Modificar el email del usuario asociado a la persona
        static::updated(function (self $person) {
            if (!$person->relationLoaded('user')) {
                return;
            }

            /** @var User $user */
            $user = $person->user;
            if (!$user or $user->email === $person->email) {
                return;
            }

            $user->email = $person->email;
            $user->update();
        });
    }

    public function rules(): array
    {
        return [
            'company_id' => [
                'nullable',
                'integer',
                PgInteger::id(),
                $this->ruleExistsCompany(),
            ],
            'first_name' => ['required', 'string', 'max:100', AlphaSpace::rule()],
            'middle_name' => ['nullable', 'string', 'max:100', AlphaSpace::rule()],
            'last_name_paternal' => ['required', 'string', 'max:100', AlphaSpace::rule()],
            'last_name_maternal' => ['nullable', 'string', 'max:100', AlphaSpace::rule()],
            'gender' => ['required', Gender::rule()],
            'email' => ['nullable', 'string', 'email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'document_type_id' => [
                'required',
                'integer',
                PgInteger::id(),
                $this->ruleExistsDocumentType(),
            ],
            'document_number' => [
                'required',
                'string',
                $this->ruleUniqueDocumentNumber(),
                $this->ruleCharactersBasedOnDocumentType(),
            ],
        ];
    }

    public function documentType(): BelongsTo
    {
        return $this->belongsTo(DocumentType::class, 'document_type_id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'person_id');
    }

    private function ruleExistsCompany(): \Closure
    {
        return function ($attribute, $value, $fail) {
            if (is_null($value)) {
                return true; // Skip validation if company_id is null
            }

            $query = $this->company()->getQuery();

            if (!$query->exists()) {
                $fail(Lang::get('validation.exists', ['attribute' => $attribute]));
            }
        };
    }

    private function ruleExistsDocumentType(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->documentType()->getQuery();

            if (!$query->exists()) {
                $fail(Lang::get('validation.exists', ['attribute' => $attribute]));
            }
        };
    }

    private function ruleUniqueDocumentNumber(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->query()->where('document_number', $value);

            if ($this->exists) {
                $query->where('id', '<>', $this->getAttribute('id'));
            }

            if ($query->exists()) {
                $fail(Lang::get('validation.unique', ['attribute' => $attribute]));
            }
        };
    }

    /**
     * Valida que los caracteres establecidos en `document_number` cumplan con las reglas
     * establecidas en el tipo de documento (tamaña, tipo de caracteres, etc.).
     */
    private function ruleCharactersBasedOnDocumentType(): \Closure
    {
        return function ($attribute, $value, $fail) {
            /** @var DocumentType $documentType */
            $documentType = $this->documentType()->first();

            if (!$documentType) {
                return true;
            }

            $isCorrectLength = match ($documentType->length_type) {
                LengthType::MAX => strlen($value) <= $documentType->length,
                LengthType::MIN => strlen($value) >= $documentType->length,
                LengthType::EXACT => strlen($value) === $documentType->length,
            };

            if (!$isCorrectLength) {
                $fail(
                    Lang::get(
                        'validation.size.string',
                        ['attribute' => $attribute, 'size' => $documentType->length]
                    )
                );
            }

            if (CharType::NUMERIC === $documentType->char_type and !is_numeric($value)) {
                $fail(Lang::get('validation.numeric', ['attribute' => $attribute]));
            }

            if (CharType::ALPHA_NUMERIC === $documentType->char_type and !ctype_alnum($value)) {
                $fail(Lang::get('validation.alpha_num', ['attribute' => $attribute]));
            }
        };
    }
}
