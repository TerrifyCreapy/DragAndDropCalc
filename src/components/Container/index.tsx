import {FC, useContext, useState} from "react";


import CalculatorHeader from "../CalculatorHeader";
import DragContainer from "../DragContainer";
import DropContainer from "../DropContainer";

import {HeaderContext} from "../../pages/Main";
import {IHeaderContext} from "../../interfaces/entity/ContextInterfaces";
import s from "./Container.module.css";

interface IContainer {
    classN?: string;
}

const Container:FC<IContainer> = ({classN }) => {
    const {isRunning} = useContext<IHeaderContext>(HeaderContext);
    const [isDropArea, setIsDropArea] = useState<boolean>(false);

    return(
        <div className={`${s.container} ${classN !== undefined? classN: ""}`}>
            <CalculatorHeader/>
            {!isRunning && <DragContainer isDropArea={isDropArea}/>}
            <DropContainer setIsDropArea={setIsDropArea}/>
        </div>
    );
}

export default Container;