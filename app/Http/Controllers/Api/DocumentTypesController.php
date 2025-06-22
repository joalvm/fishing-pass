<?php

namespace App\Http\Controllers\Api;

use App\DataObjects\Repositories\CreateDocumentTypeData;
use App\DataObjects\Repositories\UpdateDocumentTypeData;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentTypeRequest;
use App\Http\Requests\UpdateDocumentTypeRequest;
use App\Interfaces\DocumentTypesInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Joalvm\Utils\Facades\Response;

class DocumentTypesController extends Controller
{
    public function __construct(protected DocumentTypesInterface $repository)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return Response::collection(
            $this->repository
                ->setCharType($request->get('char_type'))
                ->setLengthTypes($request->get('length_types'))
                ->all()
        );
    }

    public function show($id): JsonResponse
    {
        return Response::item($this->repository->find($id));
    }

    public function store(StoreDocumentTypeRequest $request): JsonResponse
    {
        $data = CreateDocumentTypeData::from($request->post());

        return Response::stored(
            $this->repository->find(
                $this->repository->create($data)->id
            )
        );
    }

    public function update(int $id, UpdateDocumentTypeRequest $request): JsonResponse
    {
        $data = UpdateDocumentTypeData::from($request->post());
        $model = $this->repository->getModelOrFail($id);

        return Response::updated(
            $this->repository->find(
                $this->repository->update($model, $data)->id
            )
        );
    }

    public function destroy(int $id): JsonResponse
    {
        $model = $this->repository->getModelOrFail($id);

        return Response::destroyed($this->repository->delete($model));
    }
}
