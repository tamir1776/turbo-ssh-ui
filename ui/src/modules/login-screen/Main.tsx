// import styles from "./main.css"
// import * as yup from "yup"
// import {useState} from "react";
//
// const Management = () => {
//
//
//     const schema = yup.object().shape({
//         userName: yup.string().required("User name is required."),
//         password: yup.string().required("Password is required.")
//     });
//     const [loginForm, setLoginForm] = useState({})
//     const submit = async () => {
//         try {
//             const validate = await schema.validate(loginForm);
//             console.log(validate)
//         } catch (err) {
//             console.log(err)
//             // err.name; // => 'ValidationError'
//             // err.errors; // => ['Deve ser maior que 18']
//         }
//     }
//     const onChange = (e) => {
//         const name = e.target.name
//         const value = e.target.value
//
//         console.log(e.target.value)
//         console.log(e.target.name)
//         setLoginForm(state => {
//             return {...state, [name]: value}
//         })
//     }
//     return <div className={styles["base"]}>
//         <div className={styles["card"]}>
//             <h1>Login</h1>
//
//             <div className={styles["form"]}>
//                 <span>
//                 <label>First Name</label>
//                 </span>
//                 <span>
//                 <input name="userName" onChange={onChange}/>
//                 <label>First Name</label>
//                 </span>
//                 <input name="password" type={"password"}/>
//                 <button onClick={submit}>Submit</button>
//             </div>
//         </div>
//     </div>
// }
//
// export default Management