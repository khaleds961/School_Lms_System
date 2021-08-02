import './StudentProfile.css'
import SideNav from '../../components/SideNav/SideNav'
import React, { useState, useEffect } from "react";
import axios from "axios";

import API from '../../api';

export default function StudentProfile(props) {
  const[students,setstudents]=useState({})

  const fetchData = async (id) => {
    await API.get(`joinstudentbyid/${id}`)
      .then(res => {
      setstudents(res.data.data[0]);

        
      })
  }

  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

// console.log("hi",students)
let class_name=students.class_name
return(
  <>
  <SideNav/>
    <div class="rt-container">
    <div class="col-rt-12">
      <div class="Scriptcontent">

        <div class="student-profile py-4">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="card shadow-sm">
                  <div class="card-header bg-transparent text-center">
                    <img class="profile_img" src={`http://localhost:8000/storage/images/${students.Image}`} alt="student dp"/>
                    <h3>{students.FName} {students.LName}</h3>
                  </div>
                  <div class="card-body">
                    <p class="mb-0"><strong class="pr-1">Student ID:</strong>{students.id}</p>
                    <p class="mb-0"><strong class="pr-1">Class:</strong>{class_name}</p>
                    <p class="mb-0"><strong class="pr-1">Section:</strong>{students.section_name}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card shadow-sm">
                  <div class="card-header bg-transparent border-0">
                    <h3 class="mb-0"><i class='bx bx-merge' style={{color:"#ee5e46"}}  ></i>  General Information</h3>
                  </div>
                  <div class="card-body pt-0">
                    <table class="table table-bordered">
                      <tr>
                        <th style={{width:"30%"}}>Email</th>
                        <td style={{width:"2%"}}>:</td>
                        <td>{students.Email}</td>
                      </tr>
                      <tr>
                        <th style={{width:"30%"}}>Number </th>
                        <td style={{width:"2%"}}>:</td>
                        <td>{students.Number}</td>
                      </tr>
                      <tr>
                        <th style={{width:"30%"}}>Birthdate</th>
                        <td style={{width:"2%"}}>:</td>
                        <td>{students.BirthDate}</td>
                      </tr>
                      <tr>
                        <th style={{width:"30%"}}>Adress</th>
                        <td style={{width:"2%"}}>:</td>
                        <td>{students.Adress}</td>
                      </tr>
                      <tr>
                        <th style={{width:"30%"}}>blood</th>
                        <td style={{width:"2%"}}>:</td>
                        <td>{students.BloodType}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div style={{height:"26px"}}></div>
        <div class="card shadow-sm">
          <div class="card-header bg-transparent border-0">
            <h3 class="mb-0"><i class='bx bxs-error-circle bx-flashing' style={{color:"#ee5e46"}}></i>  Attention</h3>
          </div>
          <div class="card-body pt-0">
              <p>This information is private to the organization and no one has the right to use it or use it for any purpose</p>
          </div>
        </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  </>
);


}