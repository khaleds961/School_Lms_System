import "./Attendance.css";
import Classes_List from "../../components/Classes_List";
import Sections_Class from "../../components/Sections_Class";
import React, { useState, useEffect } from "react";
import StudentSection from "../../components/StudentSection";
import SideNav from "../../components/SideNav/SideNav";
import API from "../../api";
import moment from "moment";

export default function Attendance(props) {
  const [classs, setclass] = useState("");
  const [section, setsection] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState("");

  const getStudentbyDate = async () => {
    await API.get(`studentattendance`).then((res) => {
      const result = res.data;
      setAttendance(result);
    });
  };

  const getData = async () => {
    await API.get(`studentbysection/${section}`).then((res) => {
      const result = res.data;
      setStudents(result);
    });
  };

  useEffect(() => {
    getData();
    getStudentbyDate();
  }, [section]);

  let today = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date();
  var dayName = days[d.getDay()];

  const handleClick = async (id, status) => {
    const datee=moment().format("YYYY-MM-DD");
    let reqBody = {
      StudentId: id,
      SectionId: section,
      datee:datee,
      status: status,
    };
    setStatus("");
    console.log('before',attendance)
    try {
      const l = await API.post(`addsattendance`, reqBody);
      if (l) {
        let attendance = [...students].filter((st) => st.id !== id);
        setStudents(attendance);
      }
      console.log('after',attendance)
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

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
                    <b> Take Daily Attendance</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <b>
                    {dayName +
                      "-" +
                      today.getFullYear() +
                      "-" +
                      (today.getMonth() + 1) +
                      "-" +
                      today.getDate()}
                  </b>
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
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Attendance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.filter((student) => {
                    return !attendance.find((item) => {
                      return item.StudentId === student.id;
                    })
                  }).map((student) => (
                    <StudentSection
                      FName={student.FName}
                      LName={student.LName}
                      id={student.id}
                      att={student.attendance}
                      handleClick={handleClick}
                    />
                  ))
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
