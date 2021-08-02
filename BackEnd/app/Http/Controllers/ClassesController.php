<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classes;
use PhpParser\Builder\Class_;
use Exception;

class ClassesController extends Controller
{
    public function addClass(Request $request){
        $class = new Classes();
        $class -> fill($request -> all());
        $class -> save();
    }

    public function getClass (){
        return Classes::paginate(5);
    }
    public function getclassforsection (){
        return Classes::all();
    }

    public function getClassById($id)
    {
        return Classes::where('id', $id)->first();
    }
    public function editClass(Request $request,$id){
        $class = Classes::where('id',$id)->first();
        $class -> update($request -> all());
    }

    public function deleteClass($id){
        try{
        $result = Classes::where('id',$id)->delete();
        if($result){
            return[
            'success' => true,
            'message' => 'Class Deleted !!'
            ];
        }else{
            return[
                'success' => false,
                'message' => 'Class Does\'t Exist !!'
            ];
        }
    }catch(Exception $e){
        return[
        'success' => false,
        'message'=>'You can\'t delete this Class because it has Sections !!'
        ];
    }
}
}
