import "../AdminPage/AdminPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from '../../components/SideNav/SideNav'
import API from '../../api'

export default function EditClass(props) {
  const [state, setState] = useState("");

  async function fetchData(id) {
    await axios.get("//localhost:8000/api/getclassbyid/" + id).then((res) => {
      let result = res.data;
      setState(result.Description);
    });
       
  }
 
  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  const handleEdit = async e => {

    e.preventDefault();
    const id = props.match.params.id;

    let reqBody = {
        Description:state
    }
    console.log()
    await API.put(`editclass/${id}`, reqBody);
    await props.history.push('/classpage');
}

  return (
    <>
    <SideNav/>
    <div id="editEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onSubmit={handleEdit}>
            <div class="modal-header">
              <h4 class="modal-title">Edit Class</h4>
             
            </div>
            <div class="modal-body">
              <div class="form-group">
                <div class="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    class="form-control"
                    name="Description"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
                onClick={() => props.history.push("/classpage")} 
              />
              <input type="submit" class="btn btn-info" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
