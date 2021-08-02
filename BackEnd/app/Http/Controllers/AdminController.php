<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Exception;


class AdminController extends Controller
{


    public function addAdmin(Request $request)
    {
        $admin = new Admin;
        try {

            $admin->fill($request->all());

            if ($request->Image && $request->Image != "") {
                $image = $request->Image;
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('Image'))->save(storage_path('app/public/images/') . $name);
                $admin->Image = $name;
            }
            $admin->save();

            return [
                'success' => true,
                'data' => $admin,
            ];
        } catch (Exception $e) {
            return false;
        }
    }


    public function getAdmin()
    {
        return Admin::paginate(5);
    }

    public function getAdminbyEmail(Request $request)
    {
        $data = Admin::where('Email', $request->Email)->first();
        return $data;
    }

    public function getAdminById($id)
    {
        return Admin::where('id', $id)->first();
    }


    public function editAdmin($id, Request $request)
    {
        $data = Admin::where('id', $id)->first();

        try {
            if ($request->Image && $request->Image != $data->Image) {

                
                $image = $request->Image;
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('Image'))->save(storage_path('app/public/images/') . $name);
                if (file_exists(storage_path('app/public/images/') . $data->Image)) {
                    unlink(storage_path('app/public/images/') . $data->Image);
                }
                $data->update(['Image' => $name]);
            }

            $data->update(['UserName' => $request->UserName]);
            $data->update(['Number' => $request->Number]);
            $data->update(['Email' => $request->Email]);
            $data->update(['Password' => $request->Password]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }
public function countAdmin(){
    $count = Admin::count();    
    return $count;
} 
public function deleteAdmin($id)
    {
        try{
        $result=Admin::where('id', $id)->delete();
        if($result){
            return [
                'success' => true,
                'message'=>'Admin Deleted !!'
            ]; 
        }
        else{
            return [
                'success' => false,
                'message'=>'Admin doesn\'t Exist !'
            ]; 
        }
    } catch (Exception $e) {
        return [
            'success' => false,
            'message'=>'Wrong Error !!'
        ]; 
    }
    }
}