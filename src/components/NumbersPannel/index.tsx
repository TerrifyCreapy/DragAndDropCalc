import {FC, useContext} from "react";
import ActionButton from "../ActionButton";

import s from "./NumbersPanel.module.css";
import {IActionsButtonsContext} from "../../interfaces/entity/ContextInterfaces";
import {ActionsContext} from "../../pages/Main";

const NumbersPanel:FC = () => {
    const numbersArr = ["7", "8", "9", "4", "5", "6", "1", "2" , "3", "0", ","];

    const {makeCurrentNumberHandler} = useContext<IActionsButtonsContext>(ActionsContext);

    return(
        <div className={s.numbers__panel}>
            {numbersArr.map(e => <ActionButton makeAnAction={makeCurrentNumberHandler} key={e} value={e}/>)}
        </div>
    );
}

export default NumbersPanel;