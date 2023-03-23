import {FC, useContext} from "react";

import {HeaderContext} from "../../pages/Main";
import {IHeaderContext} from "../../interfaces/entity/ContextInterfaces";

import State from "../State";
import ConstructorIcon from "../HeaderIcons/ConstructorIcon";
import RunTimeIcon from "../HeaderIcons/RunTimeIcon";

import s from "./CalculatorHeader.module.css";


const CalculatorHeader:FC = () => {

    const {isRunning, changeState} = useContext<IHeaderContext>(HeaderContext);

    return(
        <div className={s.header}>

            <State icon={<RunTimeIcon state={isRunning}/>} changeState={changeState} name={"RunTime"} active={isRunning}/>
            <State icon={<ConstructorIcon state={!isRunning}/>} changeState={changeState} name={"Constructor"} active={!isRunning}/>
        </div>
    );
}

export default CalculatorHeader;