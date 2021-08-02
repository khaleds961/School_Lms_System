import '../AdminPage/AdminPage.css'

import React, { useState, useEffect } from "react";

export default function EditAdmin(props) {

	//

	// let obj1 = {
	// 	name: 'ahmad',
	// 	age: '8'
	// }

	// let obj2 = {
	// 	address: 'my address',
	// 	phoneNumber: '123456',
	// 	name: 'mirna'
	// }

	// let obj3 = {
	// 	...obj1,
	// 	...obj2
	// }

	// new

	const [state, updateState] = useState({ data: [] });

	function setState(nextState) {

		// updateState({
		// 	...state,
		// 	...nextState
		// })

		// function nextStateFunc(prevState) {
		// 	return {
		// 		...prevState,
		// 		...nextState
		// 	}
		// }

		updateState(prevState => ({
			...prevState,
			...nextState
		}))

	}

	// let prevState = {}; // our state

	// function updateState(nextState) {
	// 	if (typeof nextState === 'function') prevState = nextState(prevState)
	// 	else prevState = nextState;
	// }

	// old

	function handleChange(e) {
		let { name, value } = e.target;
		setState({ [name]: value })
	}


	const [admin, setAdmin] = useState([]);
	const [username, setUserName] = useState(admin.UserName);
	const [email, setEmail] = useState(admin.Email);
	const [password, setPassword] = useState(admin.Password);
	const [number, setNumber] = useState(admin.Number);
	const [image, setImage] = useState(admin.Image);
	const [error, setError] = useState('');


	useEffect(() => {
		// let id=props.match.params.id;
		// console.log(id);
		// 

		async function fetchData(id) {
			let url = `//localhost:8000/api/editadmin/${id}`;
			const res = await fetch(url);
			res
				.json()
				.then((res) => {
					// setAdmin(res);
					setState(res)
				})
				.catch((err) => console.log(err));
		}

		fetchData(props.match.params.id);

	}, []);

	return (
		<div id="editEmployeeModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<form>
						<div class="modal-header">
							<h4 class="modal-title">Edit Employee</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div class="form-group">


								<label>User Name</label>
								<input type="text"
									class="form-control"
									name="UserName"
									value={username}
									onChange={(e) => setUserName(e.target.value)}
									required />
							</div>


							<div class="form-group">
								<label>Email</label>
								<input type="email"
									class="form-control"
									name="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required />
							</div>


							<div class="form-group">
								<label>Password</label>
								<textarea class="form-control"
									name="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required></textarea>
							</div>

							<div class="form-group">


								<label>Number</label>
								<input type="text"
									class="form-control"
									name="Number"
									value={number}
									onChange={(e) => setNumber(e.target.value)}
									required />
							</div>

							<div class="form-group">


								<label>Image</label>
								<input type="text"
									class="form-control"
									name="Image"
									value={image}
									onChange={(e) => setImage(e.target.value)}
									required />
							</div>


							{/* <div class="form-group">
								<label>Phone</label>
								<input type="text" class="form-control" required />
							</div> */}
						</div>
						<div class="modal-footer">
							<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
							<input type="submit" class="btn btn-info" value="Save" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}