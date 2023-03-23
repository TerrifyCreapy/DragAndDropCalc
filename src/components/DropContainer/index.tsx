import {FC, DragEvent, useState, ReactNode, useContext, Fragment} from "react";

import Display from "../Display";
import BlockContainer from "../BlockContainer";
import ActionsContainer from "../ActionsContainer";
import NumbersPanel from "../NumbersPannel";
import Result from "../Result";
import ToDrop from "../ToDrop";
import DropLine from "../DropLine";

import {IActionsButtonsContext, IDragAndDropContextContext} from "../../interfaces/entity/ContextInterfaces";
import {ActionsContext, DragAndDropContext} from "../../pages/Main";
import s from "./DropContainer.module.css";

interface IDropContainer {
    setIsDropArea: any;
}

const DropContainer:FC<IDropContainer> = ({setIsDropArea}) => {

    const {currentNumber, sortCalculator, activeObjects} = useContext<IDragAndDropContextContext>(DragAndDropContext);
    const {makeAResult} = useContext<IActionsButtonsContext>(ActionsContext);

    const [draggableObject, setDraggableObject] = useState<number>(-1);
    const [dragOverObj, setDragOverObj] = useState<number>(-1);

    const items: ReactNode[] = [
        <BlockContainer
            key={0}
            useFor={0}
            draggableObject={draggableObject}
            setDraggableObject={setDraggableObject}
            setDragOver={setDragOverObj}
            sortCalculator={sortCalculator}
        >
            <Display value={currentNumber}/>
        </BlockContainer>,

        <BlockContainer
            key={1}
            useFor={1}
            draggableObject={draggableObject}
            setDraggableObject={setDraggableObject}
            setDragOver={setDragOverObj}
            sortCalculator={sortCalculator}
        >
            <ActionsContainer/>
        </BlockContainer>,

        <BlockContainer
            key={2}
            useFor={2}
            draggableObject={draggableObject}
            setDraggableObject={setDraggableObject}
            setDragOver={setDragOverObj}
            sortCalculator={sortCalculator}
        >
            <NumbersPanel/>
        </BlockContainer>,

        <BlockContainer
            key={3}
            useFor={3}
            draggableObject={draggableObject}
            setDraggableObject={setDraggableObject}
            setDragOver={setDragOverObj}
            sortCalculator={sortCalculator}
        >
            <Result value={"="} makeAResult={makeAResult}/>
        </BlockContainer>
    ]


    function onDragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        setIsDropArea(false);
        e.currentTarget.style.background = ``;
    }

    function onDragEnterHandler(e: DragEvent<HTMLDivElement>) {
        setIsDropArea(true);
        if(!activeObjects.length) e.currentTarget.style.background = `#F0F9FF`;
    }

    function onDropHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = `white`
    }

    function onDragOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        return;
    }

    return(
        <div
            onDragEnter={e => onDragEnterHandler(e)}
            onDragLeave={e => onDragLeaveHandler(e)}
            onDragOver={e => onDragOverHandler(e)}
            onDrop={e => onDropHandler(e)}
            className={`${s.calculator__side}  ${activeObjects.length !== 0?"":s.drop__container}`}>

            {activeObjects.length!== 0? activeObjects.map((e: number, index: number) => {
                if(e === dragOverObj && draggableObject !== e) {
                    if(activeObjects.indexOf(e) > activeObjects.indexOf(draggableObject))
                        return <Fragment key={e}>{items[e]} <DropLine/></Fragment>
                    else
                        return <Fragment key={e}><DropLine/> {items[e]}</Fragment>
                }
                return items[e];
            }): <ToDrop/>}


        </div>
    );
}

export default DropContainer;