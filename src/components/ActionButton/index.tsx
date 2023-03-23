import {FC} from "react";
import s from "./ActionButton.module.css";

interface IActionButton {
    value: string;
    makeAnAction: (value: string) => void;
}

const ActionButton:FC<IActionButton> = ({value, makeAnAction}) => {

    return(
        <div
            onClick={(e) => makeAnAction(value)}
            className={`${s.btn} ${value === "0"? s.zero: ""}`}>
            {value}
        </div>
    );
}

export default ActionButton;