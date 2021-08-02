import "../AdminPage/AdminPage.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import SideNav from "../../components/SideNav/SideNav";
import { Link } from "react-router-dom";
import API from "../../api";

export default function AddAdmin() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const changeImage = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    createImage(files[0]);
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const fileInput = document.querySelector('#fileupload') ;
    let reqBody = {
      UserName: username,
      Email: email,
      password: password,
      Number: number,
      Image: image,
    };
    try {
      await API.post(`addadmin`, reqBody);
    } catch (error) {
      console.log("BIG Error : ", error);
    }

    history.push("/adminpage");
  };

  return (
    <>
      <SideNav />
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">Add Admin</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="UserName"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <input
				  	type="password"
                    class="form-control"
                    name="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </div>

                <div class="form-group">
                  <label>Number</label>
                  <input
                    type="number"
                    class="form-control"
                    name="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <input
                    id="fileupload"
                    type="file"
                    onChange={changeImage}
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <Link to="/adminpage">
                  <input
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                </Link>

                <input type="submit" class="btn btn-danger" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
