import "../AdminPage/AdminPage.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Classes_List from "../../components/Classes_List";
import SideNav from '../../components/SideNav/SideNav'

export default function AddAdmin(props) {
  const [description, SetDescription] = useState("");
  const [classs, SetClasss] = useState("");

  const [error, SetError] = useState("");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const fileInput = document.querySelector('#fileupload') ;
      const formData = new FormData();
      formData.append("Description", description);
      formData.append("classId", classs);

      let url = `//localhost:8000/api/addsection`;
      await fetch(url, {
        method: "post",
        body: formData,
      });
    } catch (err) {
      SetError(error);
    }
    history.push("/sectionpage");
  };

  return (
    <>
    <SideNav/>
    <div id="addEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onSubmit={handleSubmit}>
            <div class="modal-header">
              <h4 class="modal-title">Add Section</h4>
            
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Description</label>
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  value={description}
                  onChange={(e) => SetDescription(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                

                <Classes_List 
                onChange={e=>SetClasss(e.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
                onClick={() => props.history.push("/sectionpage")} 
              />

              <input type="submit" class="btn btn-success" value="Add" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
