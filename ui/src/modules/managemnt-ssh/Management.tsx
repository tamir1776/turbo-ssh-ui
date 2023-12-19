import styles from "./main.module.scss"
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import * as yup from "yup"
import Loader from "../../Loader.tsx";
import axios from "axios";
import {apiClient} from "../../utilis/client.ts";
import classNames from "classnames";
import Card from "./Card.tsx";
import ServerList from "./ServerList.tsx";

const fakeData = {
    id: 1,
    name: "Test",
    expirationTime: 32156456451, // start as undefined
    validation: {
        snapshot: {
            status: "success", message: undefined
        },
        checks: {
            status: "success", message: undefined
        },
        // test2: {status: "success", message: undefined},
        // test3: {status: "failed", message: "Failed because vardi is bugger"}
    }
}
const fakeData2 = {
    id: 1,
    name: "Test333",
    expirationTime: 32156456451, // start as undefined
    validation: {
        snapshot: {
            status: "success", message: undefined
        },
        checks: {
            status: "success", message: undefined
        },
        // test2: {status: "success", message: undefined},
        // test3: {status: "failed", message: "Failed because vardi is bugger"}
    }
}
const Management = () => {

    const isAuthenticated = false
    const navigate = useNavigate()
    if (isAuthenticated) {
        navigate("/login")
    }

    const [isLoading, setLoader] = useState(false)
    const [minimizeForm, setMinimizeForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [serversList, setServersList] = useState([])
    const [serverForm, setServerForm] = useState(
        {
            ip: '',
            username: '',
            password: '',
        }
    )
    const schema = yup.object().shape({
        // ip: yup.string()
        //     .required("DNS Primary IP Address is required")
        //     .matches(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/, {
        //         message: "Please enter a valid IP address."
        //     }),
        // username: yup.string().required("User name is required."),
        // password: yup.string().required("Password is required.")
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = ["session", ""]

        try {
            await schema.validate(serverForm);
            setLoader(true)
            if (!minimizeForm) setMinimizeForm(true)
            await new Promise(resolve => {

                setTimeout(() => {
                    setServersList(state => [...state, fakeData,fakeData2])
                    resolve({})
                }, 2000)

            });


            const {server: data} = await apiClient("server/primary-login")
            Promise.all(url.map(() => apiClient(`server`))).then(() => {
                setServersList(state => [...state, {data}])
            }).catch(err => {
                console.log(err.message)
                if (err.message) setErrors(state => [...new Set([...state, err.message])])


            })


        } catch (err) {
            if (err.message) setErrors(state => [...new Set([...state, err.message])])
        } finally {
            setLoader(false)
        }
    }
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setServerForm(state => {
            return {...state, [name]: value}
        })
        setErrors([])
    }
    return <div className={styles["base"]}>

        {minimizeForm ?
            <button onClick={()=>isLoading ? undefined:setMinimizeForm(false) } className={styles["btn"]}>{isLoading ? <Loader/> : <p>Add</p>}</button>
            :

            <div className={classNames(styles["management"], {[styles["minimize"]]: minimizeForm})}>
                <h4>Enter machine properties</h4>
                <form onSubmit={handleSubmit}>
                    <label className={styles["label"]}>IP</label>
                    <div className={styles["text_area"]}>
                        <input
                            type="text"
                            name="ip"
                            defaultValue={serverForm.ip}
                            onChange={onChange}
                            className={styles["text_input"]}

                        />
                    </div>
                    <label className={styles["label"]}>User name</label>
                    <div className={styles["text_area"]}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={serverForm.username}
                            onChange={onChange}
                            className={styles["text_input"]}

                        />
                    </div>
                    <label className={styles["label"]}>Password</label>
                    <div className={styles["text_area"]}>

                        <input
                            type="text"
                            id="password"
                            name="password"
                            defaultValue={serverForm.password}
                            onChange={onChange}
                            className={styles["text_input"]}
                        />

                    </div>
                    <input
                        type="submit"
                        value={"Create credentials"}
                        className={styles["btn"]}
                    />

                    {errors.length > 0 ? errors.map((err, index) => <p key={index}>{err}</p>) : <></>}

                </form>

            </div>
        }
        <ServerList serversList={serversList} setErrors={setErrors}/>

    </div>
}
export default Management