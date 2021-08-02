<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendances;
use Carbon\Carbon;


class AttendancesController extends Controller
{

    public function takeAttendace(Request  $request)
    {
         $attendance = new  Attendances();
         $attendance->fill($request->all());
         $attendance->save();
    }

    public function deleteAttendace($id)
    {
        Attendances::where('id', $id)->delete();
    }

    public function studentAttendanceByDate(){
        $posts = Attendances::whereDate('created_at', Carbon::today())->get();
        return $posts;
    }

    public function viewattendaceStudent(Request $request)
    {
        $data = Attendances::join('students', 'StudentId', 'students.id')
            ->where('attendances.SectionId', 'like', $request->SectionId)
            ->where('attendances.datee','like',$request->datee)
            ->get([
                'students.*',
                'attendances.*'
            ]);
        return $data;
    }

    public function searchstudentbyname(Request $request)
    {
        $data = Attendances::join('students', 'StudentId', 'students.id')
            ->where('attendances.SectionId', 'like', $request->SectionId)
            ->where('attendances.datee','like',$request->datee)
            ->where('students.FName','like','%'.$request->FName.'%')
            ->where('students.LName','like','%'.$request->LName.'%')
            ->get([
                'students.*',
                'attendances.*'
            ]);
        return $data;
    }


    public function countbystatus(Request $request)
    {

        $status = Attendances::groupBy('status')
        ->selectRaw('count(id) as value, status as name')
        ->where('SectionId','like',$request->SectionId)
        ->where('datee','like',$request->date)
        ->get();
        return $status;
    }

    public function countpresent(Request $request){
    $data='Present';
    $status = Attendances::groupBy('status')
    ->selectRaw('count(id) as value')
    ->where('status','like',$data)
    ->whereDate('created_at', Carbon::today())
      ->get();
    return $status;
}
public function countallstudentattendance(){
    $status = Attendances::groupBy('status')
    ->selectRaw('count(id) as value, status as name')
    ->whereDate('created_at', Carbon::today())
    ->get();
    return $status;
}
}

