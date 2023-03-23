import {FC, useContext} from "react";
import ActionButton from "../ActionButton";

import s from "./ActionsContainer.module.css";
import {IActionsButtonsContext} from "../../interfaces/entity/ContextInterfaces";
import {ActionsContext} from "../../pages/Main";

const ActionsContainer:FC = () => {
    let actionsArr = ["/", "X", "-", "+"];

    const {makeActionHandler} = useContext<IActionsButtonsContext>(ActionsContext);

    return(
        <div className={s.actions__container}>
            {actionsArr.map(e => <ActionButton key={e} makeAnAction={makeActionHandler} value={e}/>)}
        </div>
    );
}

export default ActionsContainer;