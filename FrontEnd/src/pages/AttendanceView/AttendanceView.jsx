import "../Attendance/Attendance.css";
import Classes_List from "../../components/Classes_List";
import Sections_Class from "../../components/Sections_Class";
import React, { useEffect, useState } from "react";
import API from "../../api";

import { Link } from "react-router-dom";
import ViewStudentAttendance from "../../components/viewstudentattendance";
import SideNav from '../../components/SideNav/SideNav'

export default function Attendance(props) {
  const [classs, setclass] = useState("");
  const [section, setsection] = useState("");
  const [date, setDate] = useState("");
  const [studentsbyname, setstudentsbyname] = useState([]);
  const [fname, SetFname] = useState("");
  const [lname, SetLname] = useState("");
  const [inputSearch, SetInputSearch] = useState("");


  const search = (value) => {
    SetInputSearch(value);
    let res = value.split(" ");
    if (res.length == 3) {
      SetFname(res[0])
      SetLname(res[2])
    } else if (res.length == 2) {
      SetFname(res[0])
      SetLname(res[1])
    }else if(res.length==1){
      SetFname(res[0]);
    }


  }
  // console.log("name "+fname);
  // console.log("llname "+lname);



  const getData = async (e) => {
    let reqBody = {
      SectionId: section,
      datee: date,
      FName: fname,
      LName: lname,
    };
    try {
      let res = await API.post(`searchstudentbyname`, reqBody).then((res) => {
        const result = res.data;
        if (inputSearch == "") {
          setstudentsbyname("")
        } else {
          setstudentsbyname(result);
        }
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  }

  useEffect(() => {
    setstudentsbyname("")
    getData();
  }, [inputSearch]);

  // console.log("hello",studentsbyname);

  return (
    <>
      <SideNav />
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    <b> View Attendance</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link
                    to="/report"
                    class="btn"
                    data-toggle="modal"
                  >
                    <i class='bx bx-pie-chart-alt-2 bx-tada' ></i>{" "}
                    <span>Report</span>
                  </Link>
                </div>
              </div>

            </div>
            <div>
              <Classes_List
                onChange={(e) => {
                  setclass(e.target.value);
                }}
              />

              <Sections_Class
                idClass={classs}
                onChange={(e) => {
                  setsection(e.target.value);
                }}
              />

              <label for="date" id="labeldate" >
                Choose A Date:
              </label>
              <input type="date" name="date" class="dateview" onChange={(e) => {
                setDate(e.target.value);
              }} >

              </input>
              {/* <input placeholder="search" type="text" class="searchview" onChange={(e) => {
                search(e.target.value);
              }} /> */}



              <span class="box">

                <input type="text" class="input" name="txt"
                 onChange={(e) => {
                  search(e.target.value);
                }} />
                <i class='bx bx-search-alt iconsearch'></i>
                
              </span>



            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>

                  </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                <ViewStudentAttendance
                  studentsbyname={studentsbyname}
                  idSection={section}
                  created_at={date}
                />
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
}
