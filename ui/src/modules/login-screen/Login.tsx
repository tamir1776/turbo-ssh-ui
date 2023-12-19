import React, {useState} from 'react';
import "./main.css";
import * as yup from "yup"
import {useNavigate} from "react-router-dom";

const Signing = () => {
    const navigate = useNavigate()

    const [errors, setErrors] = useState(null)
    const [loginForm, setLoginForm] = useState(
        {
            username: '',
            password: '',
        }
    )


    // const setEmptyValue = (event) => {
    //     const name = event.target.name
    //     console.log(name)
    //     setLoginForm({...loginForm, name: ""})
    // }
    const schema = yup.object().shape({
        username: yup.string().required("User name is required."),
        password: yup.string().required("Password is required.")
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(loginForm)
        try {
            await schema.validate(loginForm);

                navigate("/management")
        } catch (err) {
            setErrors(err.message)
        }
    }
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setLoginForm(state => {
            return {...state, [name]: value}
        })
        setErrors(null)
    }

    return <div className="login">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
            <label className="label">User name</label>
            <div className="text_area">
                <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={loginForm.username}
                    onChange={onChange}
                    className="text_input"

                />
            </div>
            <label className="label">Password</label>
            <div className="text_area">

                <input
                    type="text"
                    id="password"
                    name="password"
                    defaultValue={loginForm.password}
                    onChange={onChange}
                    className="text_input"
                />

            </div>
            <input
                type="submit"
                value="Login"
                className="btn"
            />
            {errors && <p style={{marginTop: 50}}>{errors}</p>}
        </form>
    </div>

}

export default Signing;