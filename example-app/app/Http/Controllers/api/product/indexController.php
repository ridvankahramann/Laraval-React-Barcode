<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ProductModel;
use Faker\Core\Barcode;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function barcode(Request $request)
    {
        $data = $request->except("_token");
        $result = ProductModel::where("pd_barcode", $data['barcode'])->first();

        if ($result) {
            return parent::success("Ürün bulundu", $result);
        } else {
            return parent::error("Ürün bulunamadi", [], 404);
        }
    }

    public function newbarcode(Request $request)
    {
        $data = $request->all();
        $result = ProductModel::create([
            'pd_barcode' => $data['data']['pd_barcode'],
            'pd_name' => $data['data']['pd_name'],
            'pd_price' => $data['data']['pd_price'],
            'deleted_at' => $data['data']['deleted_at'],
            'pd_created_at' => $data['data']['pd_created_at'],
            'pd_updated_at' => $data['data']['pd_updated_at']
        ]);

        if ($result) {
            return parent::success("Ürün Kaydettiniz", $result);
        } else {
            return parent::error("Ürün Kaydedilmedi", [], 404);
        }
    }
}
