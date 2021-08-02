import { Link } from "react-router-dom";
import "../../pages/AdminPage/AdminPage.css";
import SectionCard from "../../components/SectionCard/sectionCard";
import React, { useState, useEffect } from "react";
import SideNav from '../../components/SideNav/SideNav'
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import API from'../../api'
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function SectionPage() {
  const [section, setSection] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const fetchData = async () => {

    await API.get(`ok?page=${page}`)
      .then(res => {
        console.log(res)
        const result = res.data.data;
        setSection(result);
        setTotal(Math.ceil(res.data.total / 5));
      })
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  };

  const deleteSection = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });
    
    if (willDelete) {
      try {
        let res = await API.delete(`deletesection/${id}`);
        const result = res.data.message;
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
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    Manage <b>Section</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link
                    to="/addsection"
                    class="btn"
                    data-toggle="modal"
                  >
                    <i class='bx bxs-plus-circle bx-burst' ></i>
                    <span>Add New Section</span>
                  </Link>
                 
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    
                  </th>
                  <th>Section</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.map((se) => (
                  <SectionCard
                    key={se.id}
                    id={se.id}
                    class_Description={se.class_Description}
                    description={se.Description}
                    delete={deleteSection}
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

