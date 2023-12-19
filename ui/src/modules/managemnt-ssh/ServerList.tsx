import Card from "./Card.tsx";
import styles from "./Card.module.scss"

const ServerList = ({serversList,setErrors}) => {
    return <div className={styles["list"]}>
        {serversList.length > 0 ? serversList.map(server => <Card key={server.id} setErrors={setErrors} {...server}/>):<></>}
    </div>

}
export default ServerList