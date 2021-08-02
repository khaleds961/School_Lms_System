import { Link } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage.css";
import React, { useEffect, useState } from 'react'
import StudentCard from '../../components/StudentCard/StudentCard'
import API from '../../api';
import SideNav from '../../components/SideNav/SideNav'
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function StudentPage() {
  

  const [students, setstudents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const fetchData = async () => {

    await API.get(`set-sec-class?page=${page}`)
      .then(res => {
        const result = res.data.data.data;
        setstudents(result);
        setTotal(Math.ceil(res.data.data.total / 5));
      
        
      })
  }



  useEffect(() => {
    fetchData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  };



  const deletestudent = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });
    if(willDelete){
    try {
     let res =  await API.delete(`deletestudent/${id}`);
      const result =  res.data.message;
      if(res.data.success){
        await swal("Deleted", result , "success");
      }else{
        await swal("", result , "error");
      } 
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
    }
  };

  return (
<>
<SideNav/>
    <div>

      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    Manage <b>Students</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link
                    to="/addstudent"
                    class="btn "
                    data-toggle="modal"
                  >
                    <i class='bx bxs-plus-circle bx-burst' ></i>
                    <span>Add New Student</span>
                  </Link>
                 
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    
                  </th>
                  <th>Image</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {students.map(student => (
                  <StudentCard
                    key={student.id}
                    id={student.id}
                    fname={student.FName}
                    lname={student.LName}
                    number={student.Number}
                    bloodtype={student.BloodType}
                    email={student.Email}
                    birth={student.BirthDate}
                    adress={student.Adress}
                    image={student.Image}
                    image={student.Image}
                    class_name={student.class_name}
                    section_name={student.section_name}
                    delete={deletestudent}
                  />
                ))}

              </tbody>
            </table>
            <Pagination
        count={total}
        size="small"
        onChange={changePage}
      />
          </div>
        </div>
      </div>


    </div>
    </>
  )
}