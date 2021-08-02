<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/////// Admin Route ///////

Route::post('/addadmin', [\App\Http\Controllers\AdminController::class,'addAdmin']);

Route::get('/getadmin',[\App\Http\Controllers\AdminController::class,'getAdmin']);
Route::get('/getadminbyid/{id}',[\App\Http\Controllers\AdminController::class,'getAdminById']);
Route::get('/countadmin',[\App\Http\Controllers\AdminController::class,'countAdmin']);


Route::put('/editadmin/{id}',[\App\Http\Controllers\AdminController::class,'editAdmin']);

Route::delete('/deleteadmin/{id}',[\App\Http\Controllers\AdminController::class,'deleteAdmin']);

/////// Admin Route ///////


/////// Class Route ///////

Route::post('/addclass', [\App\Http\Controllers\ClassesController::class,'addClass']);

Route::get('/getclass',[\App\Http\Controllers\ClassesController::class,'getClass']);
Route::get('/getclassbyid/{id}',[\App\Http\Controllers\ClassesController::class,'getClassById']);
Route::get('/getclassforsection',[\App\Http\Controllers\ClassesController::class,'getclassforsection']);


Route::put('/editclass/{id}',[\App\Http\Controllers\ClassesController::class,'editClass']);

Route::delete('/deleteclass/{id}',[\App\Http\Controllers\ClassesController::class,'deleteClass']);


/////// Class Route ///////


/////// Section Route ///////

Route::post('/addsection', [\App\Http\Controllers\SectionController::class,'addSection']);

Route::get('/getsection',[\App\Http\Controllers\SectionController::class,'getSection']);

//Route::get('/getsectionbyid/{id}',[\App\Http\Controllers\SectionController::class,'getSectionById']);

Route::get('/ok',[\App\Http\Controllers\SectionController::class,'ok']);

Route::get('/sectionbyid/{id}',[\App\Http\Controllers\SectionController::class,'sectionbyid']);

Route::get('/sec-class/{id}',[\App\Http\Controllers\SectionController::class,'sectionClass']);


Route::post('/editsection/{id}',[\App\Http\Controllers\SectionController::class,'editSection']);

Route::delete('/deletesection/{id}',[\App\Http\Controllers\SectionController::class,'deleteSection']);




/////// Section Route ///////



/////// Student Route ///////

Route::post('/addstudent', [\App\Http\Controllers\StudentsController::class,'addStudent']);

Route::get('/getstudent',[\App\Http\Controllers\StudentsController::class,'getStudent']);
Route::get('/set-sec-class',[\App\Http\Controllers\StudentsController::class,'joinstudent']);
Route::get('/join-st-sec',[\App\Http\Controllers\StudentsController::class,'joinstudentnopaginate']);
Route::get('/joinstudentbyid/{id}',[\App\Http\Controllers\StudentsController::class,'joinstudentbyid']);
Route::get('/countstudent',[\App\Http\Controllers\StudentsController::class,'countstudent']);


Route::put('/editstudent/{id}',[\App\Http\Controllers\StudentsController::class,'editStudent']);

Route::delete('/deletestudent/{id}',[\App\Http\Controllers\StudentsController::class,'deleteStudent']);

Route::get('/studentbysection/{id}',[\App\Http\Controllers\StudentsController::class,'studentbysection']);


// Route::put('/editstudentwithjoin/{id}',[\App\Http\Controllers\StudentsController::class,'joinstudentgetallbyID']);


/////// attendance Route ///////

Route::post('/addsattendance', [\App\Http\Controllers\AttendancesController::class,'takeAttendace']);

Route::delete('/deleteAttendace/{id}',[\App\Http\Controllers\AttendancesController::class,'deleteAttendace']);

Route::get('/studentattendance', [\App\Http\Controllers\AttendancesController::class,'studentAttendanceByDate']);
Route::get('/countpresent', [\App\Http\Controllers\AttendancesController::class,'countpresent']);

Route::post('/viewattendaceStudent', [\App\Http\Controllers\AttendancesController::class,'viewattendaceStudent']);

Route::post('/searchstudentbyname', [\App\Http\Controllers\AttendancesController::class,'searchstudentbyname']);
Route::post('/countbystatus', [\App\Http\Controllers\AttendancesController::class,'countbystatus']);
Route::get('/countallstudentattendance', [\App\Http\Controllers\AttendancesController::class,'countallstudentattendance']);

/////// attendance Route ///////



Route::post('/register', [\App\Http\Controllers\AuthController::class,'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class,'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class,'logout']);


// Route::post('/register', 'AuthController@register');
// Route::post('/login', 'AuthController@login');
// Route::post('/logout', 'AuthController@logout');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/tasks', 'TaskController@index');
    Route::get('/task/{id}', 'TaskController@show');
    Route::post('/task/{id}', 'TaskController@update');
    Route::post('/task', 'TaskController@store');
    Route::delete('/task/{id}', 'TaskController@destroy');
});


