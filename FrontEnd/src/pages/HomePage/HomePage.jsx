import "./HomePage.css";
// import Image from 'react-bootstrap/Image'
import SideNav from "../../components/SideNav/SideNav";
import API from "../../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [countadmin, setcountadmin] = useState(0);
  const [countstudent, setcountstudent] = useState(0);
  const [countpresent, setcountpresent] = useState("No");

  

  const getData = async (e) => {
    try {
      let res = await API.get(`countadmin`).then((res) => {
        const result = res.data;
        setcountadmin(result);
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }

    try {
      let res = await API.get(`countstudent`).then((res) => {
        const result = res.data.data;
        setcountstudent(result);
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }

    try {
      let res = await API.get(`countpresent`).then((res) => {
        const result = res.data[0].value;
        setcountpresent(result);
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(countadmin);

  

  return (
    <>
      <SideNav />
      {/* This is the Picture Div */}
      <div id="test" class="jumbotron bg-cover text-white container">
        <div class="container py-5 text-center">
          <h1 class="display-4 font-weight-bold title">
            <mark class="markTitle">Learning Hub</mark>
          </h1>
          <p class="font-italic mb-0 ">
          “School bells are ringing loud and clear; vacation’s over, school is here.”
          </p>
          <p class="font-italic">
          – Winifred C. Marshal
          <a href="https://bootstrapious.com" class="text-white">
            </a>
          </p>
          <Link to="/attendance">
            <button class="btntakeattendance">Take attendance</button>
          </Link>
        </div>
      </div>
      {/* This is the Picture Div */}

      <div class="containercard container">
        <div className="row">
          <div class="cardh col-sm-12 col-md-12 col-lg-4">
            <div class="facecard face1card">
              <div class="contentcard">
                <div class="iconcard">
                  <i class="bx bxs-user-badge icard"></i>{" "}
                </div>
              </div>
            </div>
            <div class="facecard face2card">
              <div class="contentcard">
                <h3>{countadmin} Admins</h3>
                <p>
              Admins are able to Manage Student Class, Section, And their Attendance.
                </p>
              </div>
            </div>
          </div>

          <div class="cardh col-sm-12 col-md-12 col-lg-4">
            <div class="facecard face1card">
              <div class="contentcard">
                <div class="iconcard">
                  <i class="bx bx-happy icard"></i>
                </div>
              </div>
            </div>
            <div class="facecard face2card">
              <div class="contentcard">
                <h3>{countstudent} Students</h3>
                <p>
  Here is the Numbers of Students, They have their Own Profile.
                  </p>
              </div>
            </div>
          </div>

          <div class="cardh col-sm-12 col-md-12 col-lg-4">
            <div class="facecard face1card">
              <div class="contentcard">
                <div class="iconcard">
                  <i class="bx bx-line-chart icard"></i>
                </div>
              </div>
            </div>
            <div class="facecard face2card">
              <div class="contentcard">
                <h3>{countpresent} Presents</h3>
                <p>
          Here is the Daily Students Attendance. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
