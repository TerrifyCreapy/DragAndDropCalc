import {FC, ReactNode} from "react";

import s from "./State.module.css";

interface IState {
    name: string;
    icon: ReactNode;
    active: boolean;
    changeState: (value: string) => void;
}

const State:FC<IState> = ({name, icon, active, changeState}) => {
    return(
        <div
            onClick={() => changeState(name)}
            className={`${s.state} ${active?s.active: s.nonactive}`}>
            {icon}
            <span>{name}</span>
        </div>
    );
}

export default State;