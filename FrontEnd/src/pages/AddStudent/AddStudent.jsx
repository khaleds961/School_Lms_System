import "../AdminPage/AdminPage.css";
import React, { useState } from "react";

import API from "../../api";
import Classes_List from "../../components/Classes_List";
import Sections_Class from "../../components/Sections_Class";
import SideNav from '../../components/SideNav/SideNav'

export default function AddAdmin(props) {
  const [image, setimage] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [birth, setbirth] = useState("");
  const [bloodtype, setbloodtype] = useState("");
  const [address, setaddress] = useState("");
  const [classs, setclass] = useState("");
  const [section, setsection] = useState("");
  const [error, setError] = useState("");
  // let history = useHistory();


  const changeImage = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    createImage(files[0]);
  }

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setimage(e.target.result)
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let reqBody = {
      Image: image,
      FName: fname,
      LName: lname,
      Email: email,
      Number: number,
      BirthDate: birth,
      BloodType: bloodtype,
      Adress: address,
      SectionId: section,
    };

    try {
      await API.post(`addstudent`, reqBody);
    } catch (error) {
      console.log("BIG Error : ", error);
    }
    props.history.push("/StudentPage");
  };

  return (
    <>
      <SideNav />
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">Add Student</h4>
                
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="UserName"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="UserName"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
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
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Date Of Birth</label>
                  <input
                    type="date"
                    class="form-control"
                    name="Email"
                    value={birth}
                    onChange={(e) => setbirth(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Blood type</label>
                  <br />

                  <select onChange={(e) => setbloodtype(e.target.value)}>
                    <option value={null}>Blood type</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    class="form-control"
                    name="Number"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Number</label>
                  <input
                    type="number"
                    class="form-control"
                    name="Number"
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>class name</label>
                  <br />
                  <Classes_List
                    onChange={(e) => {
                      setclass(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group">
                  <label>Section</label>

                  <br />
                  <Sections_Class
                    idClass={classs}
                    onChange={(e) => {
                      setsection(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group">

                  <input
                    type="file"
                    onChange={changeImage}
                  />

                </div>


                <div class="form-group"></div>
              </div>
              <div class="modal-footer">
                <input
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  value="Cancel"
                  onClick={() => props.history.push("/StudentPage")}
                />
                <input type="submit" class="btn btn-danger" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
