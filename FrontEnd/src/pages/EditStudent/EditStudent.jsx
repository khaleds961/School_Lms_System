import React, { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";

import Blood_Types from "../../components/Blood_Types";
import Classes_List from "../../components/Classes_List";
import Sections_Class from "../../components/Sections_Class";

export default function EditStudent(props) {

    const [image, setimage] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');
    const [birth, setbirth] = useState('');
    const [bloodtype, setbloodtype] = useState('');
    const [address, setaddress] = useState('');
    const [classs, setclass] = useState('');
    const [section, setsection] = useState('');
    const [error, setError] = useState('');


    const fetchData = async id => {

        await API.get(`join-st-sec`)
            .then(res => {

                const students = res.data.data;
                const student = students.find(f => f.id ==id);

                setfname(student.FName);
                setlname(student.LName);
                setemail(student.Email);
                setimage(student.Image);
                setnumber(student.Number);
                setbirth(student.BirthDate);
                setbloodtype(student.BloodType);
                setaddress(student.Adress);
                setclass(student.ClassId);
                setsection(student.SectionId);
            });
    }

    const handleSubmit = async e => {

        e.preventDefault();
        const id = props.match.params.id;

        let reqBody = {
            FName: fname,
            LName: lname,
            Email: email,
            Number: number,
            BirthDate: birth,
            BloodType: bloodtype,
            Adress: address,
            SectionId: section,
            Image:image
        }
        console.log()
        await API.put(`editstudent/${id}`, reqBody);
        await props.history.push('/studentpage');
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
            setimage(e.target.result)
        };
        reader.readAsDataURL(file);
    }




    useEffect(() => {
        fetchData(props.match.params.id);
    }, []);


    return (
        <div id="addEmployeeModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Student</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">

                                <label>First Name</label>
                                <input type="text"
                                    class="form-control"
                                    name="UserName"
                                    value={fname}
                                    onChange={(e) => setfname(e.target.value)}
                                    required />
                            </div>

                            <div class="form-group">


                                <label>Last Name</label>
                                <input type="text"
                                    class="form-control"
                                    name="UserName"
                                    value={lname}
                                    onChange={(e) => setlname(e.target.value)}
                                    required />
                            </div>



                            <div class="form-group">
                                <label>Email</label>
                                <input type="email"
                                    class="form-control"
                                    name="Email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required />
                            </div>

                            <div class="form-group">
                                <label>date of birth</label>
                                <input type="date"
                                    class="form-control"
                                    name="Email"
                                    value={birth}
                                    onChange={(e) => setbirth(e.target.value)}
                                    required />
                            </div>


                            <div class="form-group">
                                <label>Blood type</label>
                                <br />

                                <Blood_Types
                                    typeB={bloodtype}
                                    Sahar={e => setbloodtype(e.target.value)}
                                />

                            </div>

                            <div class="form-group">


                                <label>Address</label>
                                <input type="text"
                                    class="form-control"
                                    name="Number"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                    required />
                            </div>

                            <div class="form-group">

                                <label>Number</label>
                                <input type="text"
                                    class="form-control"
                                    name="Number"
                                    value={number}
                                    onChange={(e) => setnumber(e.target.value)}
                                    required />
                            </div>

                            <div class="form-group">

                                <label>class name</label>
                                <br />
                                <Classes_List
                                    id={classs}
                                    onChange={e => setclass(e.target.value)}
                                />
                            </div>


                            <div class="form-group">


                                <label>Section</label>


                                <br />
                                <Sections_Class
                                    id={section}
                                    idClass={classs}
                                    onChange={e => { setsection(e.target.value) }}
                                />
                            </div>

                            <div class="form-group">

                                <input
                                    type="file"

                                    onChange={changeImage}
                                />
                                {image}
                                            {/* <td><img className="AdminPic" src={`http://localhost/php/LMSS/backend/storage/app/public/images/${props.image}`}></img></td> */}

                            </div>



                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={() => props.history.push('/StudentPage')} />
                            <input type="submit" class="btn btn-danger" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}