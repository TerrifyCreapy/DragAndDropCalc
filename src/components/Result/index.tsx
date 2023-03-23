import {FC} from "react";

import s from "./Result.module.css";

interface IResult {
    value: string;
    makeAResult: () => void
}

const Result:FC<IResult> = ({value, makeAResult}) => {
    return(
        <div
            onClick={() => makeAResult()}
            className={s.result}>
            {value}
        </div>
    );
}

export default Result;