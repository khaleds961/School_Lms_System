 import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import '../../assets/css/style.css';
import logo from '../../assets/images/logo.svg';
import {useEffect, useState} from 'react';
import {getCookie,setCookie,removeCookie} from '../../cookie';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";

const EditAccount = (props) => {
    const [state,setState]=useState({});
    let getData=async ()=>{  
        let id=getCookie('id');
        const url='http://127.0.0.1:8000/api/adminbyi/'+id;
        const response = await fetch(url);
        let result = await response.json();
        setState(result);
    }
        useEffect(() => {
        getData();
        },[]);


        const handleChange=(e)=>{
         let { name, value } = e.target;
         setState({
         ...state,
         [name]: value
         });
}


let handleEdit=async ()=>{  
     let id=getCookie('id');
     const url='http://127.0.0.1:8000/api/admin/'+id;
     let name=state.name;
     let email=state.email;
     let img=state['img-src']
     let password=state.password;
     let body = {};
  
  body = new FormData();
  body.append(`name`, name);
  body.append(`email`, email);
  body.append(`img-src`, img);
  body.append(`password`, password);
  const response = await fetch(url, { method: 'post', body });
  let result = await response.json();
  if(result.success){
    setCookie('id', result.data.id, 30);
    alert("Save Success");

  }else{
    window.alert("Unable To Save");

  }
  }
    return (
  
        <div class="container-scroller">
          <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
              <div class="row flex-grow">
                <div class="col-lg-4 mx-auto">
                  <div class="auth-form-light text-left p-5">
                    <div class="brand-logo">
                      <img src={logo}/>
                    </div>
                    <h4>Edit Account page</h4>
                    <form class="pt-3">
                     
                    <div class="form-group">
                  
                        <input type="name" value={state.name} onChange={handleChange} class="form-control form-control-lg" name='name'  id="exampleInputname" placeholder="Enter your Name"/>
                      </div>
                      <div class="form-group">
                        <input type="email" value={state.email} onChange={handleChange} class="form-control form-control-lg" name='email'  id="exampleInputemail" placeholder="Enter your email"/>
                      </div>
                      <div class="form-group">
                          
                        <input type="text" value={state['img-src']} onChange={handleChange} class="form-control form-control-lg" name='img-src'  id="exampleInputimg" placeholder="Enter Image"/>
                      </div>
                      <div class="form-group">
                        <input type="text" value={state.password} onChange={handleChange} class="form-control form-control-lg" name='password'  id="exampleInputpassword" placeholder="Enter your password"/>
                      </div>
                      <div class="mt-3">
                      <Link  to='/myaccount'>
                        <a class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" onClick={handleEdit}  >Save</a>
                     </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
       
        </div>
     
   
      
      );
}
 
export default EditAccount;