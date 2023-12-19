import styles from "./Card.module.scss"

import {apiClient} from "../../utilis/client.ts";
import {useEffect} from "react";
import Loader from "../../Loader.tsx";


const ServerSVG = () => {
    return <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H15C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6H9Z"
            fill="currentColor"
        />
        <path
            d="M9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9Z"
            fill="currentColor"
        />
        <path
            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
            fill="currentColor"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44771 4 7 4Z"
            fill="currentColor"
        />
    </svg>
}
const SuccessIcon = () => {
    return <svg height="100%" width="100%">
        <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill="green"/>
    </svg>
}
const Card = ({id, name, expirationTime, validation, setErrors}) => {
    const allGood = validation.snapshot.status === "success" && validation.checks.status === "success"
    const expirationTimeLeft = expirationTime
    let snapMirror = null
    let preChecks = null
    let isLodaingSnapMirror = false
    let isLoadingPreChecks = false

    useEffect(() => {
        try {
            isLodaingSnapMirror = true
            isLoadingPreChecks = true

            apiClient("server/primary-login").then(({data}) => {
                snapMirror = data //check what is the current patg
            }).catch(e => {
                setErrors(e.message)
            })
            apiClient("server/primary-login").then(({data}) => {
                preChecks = data //check what is the current patg
            }).catch(e => {
                setErrors(e.message)
            })
        } finally {
            isLodaingSnapMirror = false
            isLoadingPreChecks = false
        }
    }, []);
    const extendTime = () => {

    }
    const viewConnectionInfo = () => {

    }
    const closeSession = () => {

    }

    return <div className={styles["card"]}>


        <div className={styles["heading"]}>
            <div className={styles["left-heading"]}>
                <div className={styles["icon"]}>
                    <ServerSVG/>
                </div>
                <h1 className={styles["title"]}>{name}</h1>
            </div>
            <div className={styles["right-heading"]}>

                {allGood && <div style={{display: "flex"}}>
                    <h3>Expatriation time:</h3>
                    <h3 style={{fontWeight: 800, marginLeft: 8}}>{expirationTimeLeft}</h3>
                </div>}
                <div className={styles["icon"]}>
                    <SuccessIcon/>
                </div>
            </div>
        </div>
        {/*<p className={styles["cookieDescription"]}>This website uses cookies to ensure you get the best experience on*/}
        {/*    our site.</p>*/}
        <div className={styles["card-details"]}>
            <div className={styles["container"]}>
                <p>Snap mirror</p>
                <div className={styles["loader"]}>
                    <Loader/>
                </div>

            </div>
            <div className={styles["container"]}>
                <p>Pre checks</p>
                <div className={styles["loader"]}>
                    <Loader/>
                </div>
            </div>
            <div className={styles["container"]}>
                <button onClick={extendTime}>Extend time</button>
                <button onClick={viewConnectionInfo}>View connection info</button>
                <button onClick={closeSession}>Close session</button>
            </div>
        </div>
    </div>
}

export default Card