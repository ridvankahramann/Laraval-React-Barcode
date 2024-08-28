<?php

use App\Http\Controllers\api\product\indexController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'product', 'as' => 'product.'], function () {
    Route::post('barcode', [indexController::class, 'barcode'])->name('barcode');

    Route::post('newbarcode', [indexController::class, 'newbarcode'])->name('newbarcode');
});
