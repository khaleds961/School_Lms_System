<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\students;
use Exception;
use GrahamCampbell\ResultType\Success;

class StudentsController extends Controller
{

    public function addStudent(Request $request)
    {
        $student = new students;
        try {

            $student->fill($request->all());

            if ($request->Image && $request->Image != "") {
                $image = $request->Image;
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('Image'))->save(storage_path('app/public/images/') . $name);
                $student->Image = $name;
            }
            $student->save();

            return [
                'success' => true,
                'data' => $student,
            ];
        } catch (Exception $e) {
            return false;
        }
    }


    public function getStudent()
    {
        try {
            $data = students::all();
            return [
                'success' => true,
                'data' => $data
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e
            ];
        }
    }
 


    public function editStudent($id, Request $request)
    {
        $data = students::where('id', $id)->first();

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

            $data->update(['FName' => $request->FName]);
            $data->update(['LName' => $request->LName]);
            $data->update(['Number' => $request->Number]);
            $data->update(['Email' => $request->Email]);
            $data->update(['SectionId' => $request->SectionId]);
            $data->update(['BloodType' => $request->BloodType]);
            $data->update(['BirthDate' => $request->BirthDate]);
            $data->update(['Adress' => $request->Adress]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }



    public function deleteStudent($id)
    {

        $student = students::where('id', $id)->first();
        if ($student->Image && $student->Image != "") {
            if (file_exists(storage_path('app/public/images/') . $student->Image)) {
                unlink(storage_path('app/public/images/') . $student->Image);
            }
        }
        try{
        $res = students::where('id', $id)->delete();
        if($res){
            return[
                'success' => true,
                'message' => 'Student Deleted !'
            ];
        }else{
            return[
                'success' => false,
                'message' => 'Student Doesn\'t Exist !!'
            ];
        }
        }catch (Exception $e){
            return[
            'success' => false,
            'message' =>'You Can\'t Delete this Student !! '
            ];
        }
    }

    public function joinstudent()
    {

        try {
            $data = students::join('sections', 'SectionId', '=', 'sections.id')
                ->join('classes', 'classId', 'classes.id')

                ->select([
                    'students.*',
                    'classes.Description as class_name',
                    'classes.id as ClassId',
                    'sections.Description as section_name'
                ])
                ->paginate(5);

            return [
                'success' => true,
                'data' => $data
            ];
        } catch (Exception $e) {
        }
    }       

    public function joinstudentnopaginate()
    {

        try {
            $data = students::join('sections', 'SectionId', '=', 'sections.id')
                ->join('classes', 'classId', 'classes.id')

                ->get([
                    'students.*',
                    'classes.Description as class_name',
                    'classes.id as ClassId',
                    'sections.Description as section_name'
                ]);

            return [
                'success' => true,
                'data' => $data
            ];
        } catch (Exception $e) {
        }
    }


    public function joinstudentbyid($id)
    {

        try {
            $data = students::join('sections', 'SectionId', '=', 'sections.id')
                ->join('classes', 'classId', 'classes.id')
                ->where('students.id', $id)
                ->get([
                    'students.*',
                    'classes.Description as class_name',
                    'classes.id as ClassId',
                    'sections.Description as section_name'
                ]);

            return [
                'success' => true,
                'data' => $data
            ];
        } catch (Exception $e) {
        }
    }

    public function countstudent(){
        $count = Students::count();


        return [
            'success' => true,
            'data' => $count
        ];
        }

        public function studentbysection($id)
    {
        return students::where('SectionId', $id)->get();
    }
    
}