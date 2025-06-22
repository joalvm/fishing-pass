<?php

namespace App\Models\Company;

use App\Enums\CharType;
use App\Enums\CompanyEntityType;
use App\Enums\LengthType;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;
use Joalvm\Utils\Model;
use Joalvm\Utils\Rules\PgInteger;

/**
 * @property      int               $id
 * @property      CompanyEntityType $entity_type
 * @property      string            $business_name
 * @property      int               $document_type_id
 * @property      string            $document_number
 * @property      string            $address
 * @property      string|null       $phone
 * @property      string            $email
 * @property-read DocumentType      $documentType
 */
class Company extends Model
{
    /** @use HasFactory<\Database\Factories\Company\CompanyFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $table = 'public.companies';

    protected $fillable = [
        'entity_type',
        'business_name',
        'document_type_id',
        'document_number',
        'address',
        'phone',
        'email',
    ];

    protected $casts = [
        'document_type_id' => 'integer',
        'entity_type' => CompanyEntityType::class,
    ];

    public function __construct(array $attributes = [])
    {
        $this->setAttribute('entity_type', CompanyEntityType::JURIDICAL_PERSON);

        parent::__construct($attributes);
    }

    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string'],
            'document_type_id' => [
                'required',
                'integer',
                PgInteger::id(),
                $this->ruleExistDocumentType(),
            ],
            'document_number' => [
                'required',
                'string',
                $this->ruleUniqueDocumentNumber(),
                $this->ruleValidDocumentNumber(),
            ],
            'address' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['nullable', 'string'],
        ];
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class, 'document_type_id');
    }

    private function ruleExistDocumentType(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->documentType()->getQuery();

            if (!$query->first()) {
                $fail(Lang::get('validation.exists', ['attribute' => $attribute]));
            }
        };
    }

    private function ruleUniqueDocumentNumber(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->newQuery()
                ->where('document_type_id', $this->document_type_id)
                ->where('document_number', $value)
            ;

            if ($this->exists) {
                $query->where('id', '!=', $this->id);
            }

            if ($query->exists()) {
                $fail(Lang::get('validation.unique', ['attribute' => $attribute]));
            }
        };
    }

    private function ruleValidDocumentNumber(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $documentTypeModel = $this->documentType()->getQuery()->first();
            if (!$documentTypeModel) {
                return;
            }

            $lengthType = $documentTypeModel->length_type;
            $length = $documentTypeModel->length;
            $charType = $documentTypeModel->char_type;

            $this->validDocumentNumberCharType($charType, $value, $fail);
            $this->validDocumentNumberLength($lengthType, $length, $value, $fail);
        };
    }

    private function validDocumentNumberCharType(
        CharType $charType,
        mixed $value,
        \Closure $fail,
    ) {
        switch ($charType) {
            case CharType::NUMERIC:
                if (!preg_match('/^\d+$/', $value)) {
                    $fail(Lang::get('validation.numeric', ['attribute' => 'document_number']));
                }
                break;
            case CharType::ALPHA_NUMERIC:
                if (!preg_match('/^[a-zA-Z0-9]+$/', $value)) {
                    $fail(Lang::get('validation.alpha_num', ['attribute' => 'document_number']));
                }
                break;
        }
    }

    private function validDocumentNumberLength(
        LengthType $lengthType,
        int $length,
        mixed $value,
        \Closure $fail,
    ) {
        switch ($lengthType) {
            case LengthType::MIN:
                if (strlen($value) < $length) {
                    $fail(Lang::get('validation.min.string', [
                        'attribute' => 'document_number',
                        'min' => $length,
                    ]));
                }
                break;
            case LengthType::MAX:
                if (strlen($value) > $length) {
                    $fail(Lang::get('validation.max.string', [
                        'attribute' => 'document_number',
                        'max' => $length,
                    ]));
                }
                break;
            case LengthType::EXACT:
                if (strlen($value) !== $length) {
                    $fail(Lang::get('validation.size.string', [
                        'attribute' => 'document_number',
                        'size' => $length,
                    ]));
                }
                break;
        }
    }
}
