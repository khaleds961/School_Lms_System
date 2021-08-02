import '../AdminPage/AdminPage.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import SideNav from '../../components/SideNav/SideNav'

export default function AddAdmin(props) {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');


    let history = useHistory();

    // const [postid, setPostId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            // const fileInput = document.querySelector('#fileupload') ;
            const formData = new FormData();
            formData.append("Description", description);


            let url = `//localhost:8000/api/addclass`
            await fetch(url, {
                method: "post",
                // headers: {
                // 	'Accept': 'application/json',
                // 	'Content-Type': 'multipart/form-data',
                //   },
                body: formData,
            });
        } catch (err) {
            setError(error)
        }
        history.push('/ClassPage')
    }

    return (
        <>
        <SideNav/>
        <div id="addEmployeeModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div class="modal-header">
                            <h4 class="modal-title">Add Class</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">


                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        class="form-control"
                                        name="decription"
                                        // value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required />
                                </div>

                                </div>

                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"
                                 onClick={() => props.history.push("/classpage")} />

                                <input type="submit" class="btn btn-danger" value="Add" />
                            </div>
					</form>
				</div>
                
                </div>
            </div>
            </>

            );
}