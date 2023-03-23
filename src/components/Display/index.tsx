import {FC} from "react";
import s from "./Display.module.css";

interface IDisplay {
    value: string
}

const Display:FC<IDisplay> = ({value = "0"}) => {
    return(
        <div className={s.display}>
            {value}
        </div>
    );
}

export default Display;