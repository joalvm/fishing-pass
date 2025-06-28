<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Person\Person;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Lang;
use Joalvm\Utils\Rules\PgInteger;
use Joalvm\Utils\Traits\ValidatesAttributes;

/**
 * @property      int         $id
 * @property      int         $person_id
 * @property      string      $email
 * @property      string      $password
 * @property      string|null $avatar_url
 * @property      bool        $is_super_admin
 * @property      string|null $remember_token
 * @property      Carbon|null $email_verified_at
 * @property      Carbon|null $last_login_at
 * @property      bool        $enabled
 * @property-read Person      $person
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;
    use ValidatesAttributes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'person_id',
        'email', // Mismo email de `persons` y actualizada mediante observer
        'password',
        'avatar_url',
        'is_super_admin',
        'remember_token', // Token para recordar la sesión del usuario
        'email_verified_at',
        'last_login_at',
        'enabled',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $attributes = [
        'is_super_admin' => false,
        'enabled' => true,
    ];

    protected $casts = [
        'person_id' => 'integer',
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'enabled' => 'boolean',
    ];

    public function rules(): array
    {
        return [
            'person_id' => [
                'required',
                'integer',
                PgInteger::id(),
                $this->ruleExistsPerson(),
                $this->ruleUniquePerson(),
            ],
            'email' => [
                'required',
                'email',
                $this->ruleUniqueEmail(),
            ],
            'password' => ['required', 'string'],
            'avatar_url' => ['nullable', 'string', 'max:255'],
            'is_super_admin' => ['boolean'],
        ];
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id');
    }

    public function getAuthIdentifierName(): string
    {
        return 'email';
    }

    private function ruleExistsPerson(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->person()->getQuery();

            if (!$query->exists()) {
                $fail(Lang::get('validation.exists', [
                    'attribute' => $attribute,
                ]));
            }
        };
    }

    private function ruleUniquePerson(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->newQuery()->where('person_id', $value);

            if ($this->exists) {
                $query->where('id', '!=', $this->id);
            }

            if ($query->exists()) {
                $fail(Lang::get('validation.unique', [
                    'attribute' => $attribute,
                ]));
            }
        };
    }

    private function ruleUniqueEmail(): \Closure
    {
        return function ($attribute, $value, $fail) {
            $query = $this->newQuery()->where('email', $value);

            if ($this->exists) {
                $query->where('id', '!=', $this->id);
            }

            if ($query->exists()) {
                $fail(Lang::get('validation.unique', [
                    'attribute' => $attribute,
                ]));
            }
        };
    }
}
