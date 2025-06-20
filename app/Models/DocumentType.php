<?php

namespace App\Models;

use App\Enums\CharType;
use App\Enums\LengthType;
use App\Models\Person\Person;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;
use Joalvm\Utils\Rules\PgInteger;

/**
 * @property      int                          $id
 * @property      string                       $name
 * @property      string                       $abbr
 * @property      LengthType                   $length_type
 * @property      int                          $length
 * @property      CharType                     $char_type
 * @property-read Collection<array-key,Person> $persons
 */
class DocumentType extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'public.document_types';

    protected $fillable = [
        'name',
        'abbr',
        'length_type',
        'length',
        'char_type',
    ];

    protected $casts = [
        'length' => 'integer',
        'length_type' => LengthType::class,
        'char_type' => CharType::class,
    ];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', $this->unique('name')],
            'abbr' => ['required', 'string', $this->unique('abbr')],
            'length_type' => ['required', LengthType::rule()],
            'length' => ['required', 'integer', PgInteger::id()],
            'char_type' => ['required', CharType::rule()],
        ];
    }

    public function persons(): HasMany
    {
        return $this->hasMany(Person::class);
    }

    public function unique(string $column): callable
    {
        return function (string $attribute, mixed $value, \Closure $fail) use ($column) {
            $query = $this->newQuery()->where($column, $value);

            if ($this->exists) {
                $query->where('id', '<>', $this->getAttribute('id'));
            }

            if ($query->exists()) {
                $fail(Lang::get('validation.unique', ['attribute' => $attribute]));
            }
        };
    }
}
