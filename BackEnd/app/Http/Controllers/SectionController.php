<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use App\Models\sections;
use Illuminate\Support\Facades\DB;
use Exception;

class SectionController extends Controller
{
    public function addSection(Request $request)
    {
        $section = new sections();
        $section->fill($request->all());
        $section->save();
    }

    public function getSection()
    {
        return sections::all();
    }

    public function getSectionById($id)
    {
        return sections::where('id', $id)->first();
    }

    public function sectionClass($id)
    {
        return sections::where('ClassId', $id)->get();
    }

    public function editSection(Request $request, $id)
    {
        $section = sections::where('id', $id)->first();
        $section->update($request->all());
        if ($section) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteSection($id)
    {
        try{
        $result=sections::where('id', $id)->delete();
        if($result){
            return [
                'success' => true,
                'message'=>'Section Deleted !!'
            ]; 
        }
        else{
            return [
                'success' => false,
                'message'=>'Section does\'t Exist !!'
            ]; 
        }
    } catch (Exception $e) {
        return [
            'success' => false,
            'message'=>'You can\'t Delete this Section Because it is has Students !!'
        ]; 
    }
    }

    public function ok()
    {
        $data = sections::join('classes', 'classId', 'classes.id')
            ->select([
                'sections.*',
                'classes.Description as class_Description'
            ])
            ->paginate(5);
        return $data;
    }

    public function sectionbyid($id)
    {
        $data = sections::join('classes', 'classId', 'classes.id')
            ->where('sections.id', 'like', $id)
            ->get([
                'sections.*',
                'classes.Description as class_Description'
            ]);
        return $data;
    }
    
}

