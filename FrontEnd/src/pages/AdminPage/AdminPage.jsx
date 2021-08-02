import { Link } from "react-router-dom";
import "./AdminPage.css";
import AdminCard from "../../components/AdminCard/AdminCard";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import SideNav from '../../components/SideNav/SideNav'
import API from '../../api'
import swal from 'sweetalert'


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function AdminPage() {

  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  async function fetchData() {
    const response = await fetch(`http://localhost:8000/api/getadmin?page=${page}`);
    const data = await response.json();
    setTotal(Math.ceil(data.total / 5));
    setAdmin(data.data);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  };

  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, [page]);


  const deleteAdmin = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });
    
    if (willDelete) {
      try {
        let res = await API.delete(`deleteadmin/${id}`);
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
                    Manage <b>Admins</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link
                    to="/addadmin"
                    class="btn "
                    data-toggle="modal"
                  >
                    <i class='bx bxs-plus-circle bx-burst' ></i>
                    {/* <i class="material-icons">&#xE147;</i>{" "} */}
                    <span>Add New Admin</span>
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
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admin.map((ad) => (
                  <AdminCard
                    key={ad.id}
                    id={ad.id}
                    username={ad.UserName}
                    email={ad.Email}
                    image={ad.Image}
                    number={ad.Number}
                    delete={deleteAdmin}
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