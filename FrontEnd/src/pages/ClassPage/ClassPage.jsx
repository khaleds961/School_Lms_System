import { Link } from "react-router-dom";
import '../AdminPage/AdminPage.css'
import ClassCard from '..//../components/ClassCard/ClassCard'

import React, { useState, useEffect } from "react";
import SideNav from '../../components/SideNav/SideNav'
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import API from'../../api';
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ClassPage() {
  //const [error, setError] = useState({});

  const [classs, setClass] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const fetchData = async () => {

    await API.get(`getclass?page=${page}`)
      .then(res => {
        const result = res.data.data;
        setClass(result);
        setTotal(Math.ceil(res.data.total / 5));
      
        
      })
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  };



  const deleteclass = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      try {
        let res = await API.delete(`deleteclass/${id}`);
        const result = res.data.message;
        if(res.data.success){
        await swal("Deleted", result , "success");
      }else{
        await swal("", result , "error");
      } 
      window.location.reload();
    }catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
    <SideNav/>
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    Manage <b>classes</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link
                    to="/addclass"
                    class="btn "
                    data-toggle="modal"
                  >
                    <i class='bx bxs-plus-circle bx-burst' ></i>
                    <span>Add New class</span>
                  </Link>
                  
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    
                  </th>
                  <th>Classe</th>
                  <th>Sections</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classs.map((cl) => (
                  <ClassCard
                    key={cl.id}
                    id={cl.id}
                  description={cl.Description}
                  class_Description={cl.class_Description}
                    delete={deleteclass}
                  />
                ))}
              </tbody>

            </table>
            <Pagination
        count={total}
        size="small"
        // color="primary"
        onChange={changePage}
      />
          </div>
        </div>
      </div>
    </>
  );
}
