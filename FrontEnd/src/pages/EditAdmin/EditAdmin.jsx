import { useEffect, useState } from "react";
import SideNav from '../../components/SideNav/SideNav'
import {Link} from 'react-router-dom'
import API from "../../api";



const EditAccount = (props) => {
  const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [number, setNumber] = useState('');
	const [image, setImage] = useState('');


  let getData =async (id)=>{  
    //let id=getCookie('id');
    const url="//localhost:8000/api/getadminbyid/" + id;
    const response = await fetch(url);
    let result = await response.json();
    setUserName(result.UserName);
    setEmail(result.Email);
    setPassword(result.Password);
    setNumber(result.Number);
    setImage(result.Image);

}
    useEffect(() => {
     getData(props.match.params.id);
    },[]);
 
 

  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setStat((prevStat)=>({
  //     ...prevStat,
  //       [name]: value,
  //   }));
  //   console.log(name);
  //   console.log(stat);
  // };

 
  const handleSubmit = async e => {

    e.preventDefault();
    const id = props.match.params.id;

    let reqBody = {
        UserName: username,
        Email: email,
        Number: number,
        password: password,
        Image:image
    }
    console.log()
    await API.put(`editadmin/${id}`, reqBody);
    await props.history.push('/adminpage');
}

const changeImage = (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length)
      return;
  createImage(files[0]);
}

const createImage = (file) => {
  let reader = new FileReader();
  reader.onload = (e) => {
      setImage(e.target.result)
  };
  reader.readAsDataURL(file);
}

  // let handleEdit = async () => {

  //   setStat((prevStat)=>({
  //     ...prevStat,
  //       'Image':image,
  //   }));

  //   let id = props.match.params.id;
  //   const url = "http://127.0.0.1:8000/api/editadmin/"+id;
  //   let username = stat.UserName;
  //   let email = stat.Email;
  //   let number = stat.Number;
  //   let img = stat.Image;
  //   let password = stat.Password;
  //   let body = {};

  //   body = new FormData();
  //   body.append(`UserName`, username);
  //   body.append(`Email`, email);
  //   body.append(`Number`, number);
  //   body.append(`Image`, img);
  //   body.append(`Password`, password);
  //   const response = await fetch(url, { method: "post", body });
  //   let result = await response.json();
  //   console.log(result)
  //   if (result.success) {
  //     alert("Save Success");
  //   } else {
  //     window.alert("Unable To Save");
  //   }
  // };
  return (
    <>
    <SideNav/>
    <div id="editEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onSubmit={handleSubmit}>
            <div class="modal-header">
              <h4 class="modal-title">Edit Admin</h4>
              
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
                <textarea
                  class="form-control"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <label>Number</label>
                <input
                  type="text"
                  class="form-control"
                  name="Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>

              

              <div class="form-group"
              >
                <label>Image</label>
                <input
                  id="fileupload"
                  type="file"
                  class="form-control"
                  
                  onChange={changeImage}
                  
                />
                {image}
              </div>

              
            </div>
            <div class="modal-footer">
            <Link to="/adminpage"><input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" /></Link>

              <input
                type="submit"
                class="btn btn-danger"
                value="Save"
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



