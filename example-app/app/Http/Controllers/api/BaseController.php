<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function success($message = "", $data = [], $status = 200)
    {
        $results = [
            "success" => true,
            "title" => "Başarili",
            "message" => $message,
            "data" => $data
        ];

        return response()->json($results, $status);
    }

    public function error($message = "", $errorData = [], $status = 500)
    {
        $results = [
            "success" => false,
            "title" => "Hata",
            "message" => $message
        ];

        if (!empty($errorData)) {
            $results["data"] = $errorData;
        }

        return response()->json($results, $status);
    }
}
