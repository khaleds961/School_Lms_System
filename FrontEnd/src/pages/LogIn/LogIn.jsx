
import React, { useState, useEffect, useContext } from "react";
import API from '../../api';
import { setCookie } from '../../cookie';
import SessionContext from '../../components/session/SessionContext';

import "./LogIn.css"

import i from '../../image/77.jpeg'

export default function LogIn() {

    const [state, updateState] = useState({
        Email: "",
        password: "",
    });

    let { actions: { updateSession } } = useContext(SessionContext);

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post('login', state)
                .then(res => {
                    const answer = res.data;
                    console.log("answer", answer);
                    if (answer) {
                        setCookie('token', answer.access_token, 30);
                        setCookie('email', state.email, 30);
                        updateSession({ user: { ...answer, token: answer.access_token } });
                    } else {
                        updateState({ Email: "", password: "" });
                    }
                });
        } catch (err) {
            console.log("ERROR", err);
        }

       
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('containerLogin');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });


    });

    const handleChange = e => {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    return (

        <div>

            <div class="containerLogin container" id="containerLogin">

                <div class="formLogin">

                    <div class="form-container sign-in-container">
                        <form onSubmit={handleSubmit} class="formLogin">
                            <h1 class="titleLogin">Login</h1>
                            <input type="email" name="Email" class="inputLogin" value={state.Email} onChange={handleChange} placeholder="Email" required />

                            <input type="password" name="password" class="inputLogin" value={state.password} onChange={handleChange} placeholder="Password" required />

                            <button type="submit" class="btnLogin">Login</button>
                        </form>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1 class="titleLogin">Collège National Orthodoxe</h1>

                                <button to="/HomePage" class="ghost btnLogin" id="signIn">About Us</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1 class="titleLogin">Welcome Back!</h1>
                                <p class="descLogin">To keep connected with us please login with your personal info</p>
                                <button class="ghost btnLogin" id="signUp">About us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="login.js"></script>


        </div>




    )
}