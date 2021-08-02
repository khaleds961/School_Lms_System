import { useEffect, useState } from "react";
import SectionList from "../../components/SectionList";
import SideNav from '../../components/SideNav/SideNav'

const EditAccount = (props) => {
  const [stat, setStat] = useState({});
  const [classs, SetClasss] = useState("");

  let getData = async (id) => {
    const url = "//localhost:8000/api/sectionbyid/" + id;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let result = await response.json();
    setStat(result[0]);
  };
  useEffect(() => {
    getData(props.match.params.id);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setStat((prevStat) => ({
      ...prevStat,
      [name]: value,
    }));
  };

  let handleEdit = async () => {
    let id = props.match.params.id;
    const url = "http://localhost:8000/api/editsection/" + id;
    let description = stat.Description;
    let classId = classs;
    // console.log('hi',classId)

    let body = {};
    body = new FormData();
    body.append(`Description`, description);
    body.append(`ClassId`, classId);

    const response = await fetch(url, { method: "post", body });
  };
  return (
    <>
    <SideNav/>
    <div id="editEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h4 class="modal-title">Edit Section</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Description</label>
                <input
                  type="text"
                  class="form-control"
                  name="Description"
                  value={stat.Description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input
                type="submit"
                class="btn btn-info"
                value="Save"
                onClick={handleEdit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditAccount;
