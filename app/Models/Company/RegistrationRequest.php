<?php

namespace App\Models\Company;

use App\Enums\CharType;
use App\Enums\Company\EntityType;
use App\Enums\Company\RegistrationStatus;
use App\Enums\LengthType;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Lang;
use Joalvm\Utils\Model;
use Joalvm\Utils\Rules\PgInteger;

/**
 * Representa una solicitud de registro de empresa.
 *
 * @property      int                $id
 * @property      EntityType         $entity_type
 * @property      string             $business_name
 * @property      int                $document_type_id
 * @property      string             $document_number
 * @property      string|null        $address
 * @property      string|null        $phone
 * @property      string|null        $email
 * @property      RegistrationStatus $status
 * @property      Carbon|null        $approved_at
 * @property      int|null           $approved_by
 * @property      string|null        $rejected_reason
 * @property-read DocumentType       $documentType
 * @property-read Company|null       $company
 */
class RegistrationRequest extends Model
{
    /** @use HasFactory<\Database\Factories\Company\RegistrationRequestFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $table = 'public.company_registration_requests';

    protected $fillable = [
        'business_name',
        'entity_type',
        'document_type_id',
        'document_number',
        'address',
        'phone',
        'email',
        'status',
        'approved_at',
        'approved_by',
        'rejected_reason',
    ];

    protected $casts = [
        'document_type_id' => 'integer',
        'entity_type' => EntityType::class,
        'status' => RegistrationStatus::class,
        'approved_at' => 'datetime',
        'approved_by' => 'integer',
    ];

    public function __construct(array $attributes = [])
    {
        $this->setAttribute('entity_type', EntityType::JURIDICAL_PERSON);
        $this->setAttribute('status', RegistrationStatus::PENDING);

        parent::__construct($attributes);
    }

    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string'],
            'entity_type' => ['required', EntityType::rule()],
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
                $this->ruleValidDocumentNumber(),
            ],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'status' => ['required', RegistrationStatus::rule()],
            'approved_at' => ['nullable', 'date'],
            'approved_by' => ['required_with:approved_at', 'integer'],
            'rejected_reason' => [
                'nullable',
                'required_with:status,' . RegistrationStatus::REJECTED->value,
                'string',
            ],
        ];
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class, 'document_type_id');
    }

    public function company()
    {
        return $this->hasOne(Company::class, 'registration_request_id');
    }

    protected function ruleExistsDocumentType(): \Closure
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

    /**
     * Valida el número de documento según el tipo de documento.
     *
     * @todo Implementar esta funcionalidad en un validator personalizado para no repetir código.
     */
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
