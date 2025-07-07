<?php

namespace App\Http\Middleware;

use App\Models\Company\Company;
use App\Models\Person\Person;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => $this->getAuth($request),
            'flash' => fn () => $request->session()->get('flash'),
            'ziggy' => fn (): array => [
                ...(new Ziggy())->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

    private function getAuth(Request $request): ?array
    {
        /** @var User $user */
        $user = $request->user();
        if (!$user) {
            return null;
        }

        return [
            'type' => $user->person->company ? 'client' : 'internal',
            'user' => $this->getUser($user),
            'person' => $this->getPerson($user->person),
            'company' => $this->getCompany($user->person->company),
        ];
    }

    private function getUser(User $model): array
    {
        return [
            'id' => $model->id,
            'email' => $model->email,
            'avatar_url' => $model->avatar_url,
            'is_super_admin' => $model->is_super_admin,
            'enabled' => $model->enabled,
            'email_verified_at' => $model->email_verified_at,
        ];
    }

    private function getPerson(Person $model): array
    {
        return [
            'id' => $model->id,
            'document_type_id' => $model->document_type_id,
            'document_number' => $model->document_number,
            'first_name' => $model->first_name,
            'middle_name' => $model->middle_name,
            'last_name_paternal' => $model->last_name_paternal,
            'last_name_maternal' => $model->last_name_maternal,
            'gender' => $model->gender->value,
            'email' => $model->email,
            'phone' => $model->phone,
        ];
    }

    private function getCompany(?Company $company): ?array
    {
        if (!$company) {
            return null;
        }

        return [
            'id' => $company->id,
            'entity_type' => $company->entity_type->value,
            'business_name' => $company->business_name,
            'document_type_id' => $company->document_type_id,
            'document_number' => $company->document_number,
            'email' => $company->email,
            'phone' => $company->phone,
            'address' => $company->address,
        ];
    }
}
