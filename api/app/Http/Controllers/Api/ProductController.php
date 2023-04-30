<?php

    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Models\Product;

    class ProductController extends Controller {
       
        public function index() {
            return Product::all();
        }
        
        public function store(Request $request) {
            $product = new Product();
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->save();
        }
        
        public function show(string $id) {
            return Product::find($id);
        }
        
        public function update(Request $request, string $id) {
            $product = Product::findOrFail($request->id);
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->save();
            return $product;
        }
        
        public function destroy(string $id) {
            $product = Product::destroy($id);
        }

    }

?>