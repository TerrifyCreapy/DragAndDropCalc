import {FC, useContext} from "react";

import BlockContainer from "../BlockContainer";
import Display from "../Display";
import ActionsContainer from "../ActionsContainer";
import NumbersPanel from "../NumbersPannel";
import Result from "../Result";

import {IDragAndDropContextContext} from "../../interfaces/entity/ContextInterfaces";
import {DragAndDropContext} from "../../pages/Main";

interface IDragContainer {
    isDropArea: boolean;
}

const DragContainer:FC<IDragContainer> = ({isDropArea}) => {

    const {activeObjects, makeAnActiveObjHandler} = useContext<IDragAndDropContextContext>(DragAndDropContext);

    return(
        <div>
            <BlockContainer isActive={activeObjects.indexOf(0) !== -1} makeAnActiveObjHandler={makeAnActiveObjHandler} useFor={0} isDropArea={isDropArea}>
                <Display value={"0"}/>
            </BlockContainer>
            <BlockContainer isActive={activeObjects.indexOf(1) !== -1} makeAnActiveObjHandler={makeAnActiveObjHandler} useFor={1} isDropArea={isDropArea}>
                <ActionsContainer/>
            </BlockContainer>
            <BlockContainer isActive={activeObjects.indexOf(2) !== -1} makeAnActiveObjHandler={makeAnActiveObjHandler} useFor={2} isDropArea={isDropArea}>
                <NumbersPanel/>
            </BlockContainer>
            <BlockContainer isActive={activeObjects.indexOf(3) !== -1} makeAnActiveObjHandler={makeAnActiveObjHandler} useFor={3} isDropArea={isDropArea}>
                <Result value={"="} makeAResult={() => {}}/>
            </BlockContainer>
        </div>
    );
}

export default DragContainer;