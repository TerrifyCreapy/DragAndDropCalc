import {FC, DragEvent, ReactNode, Dispatch, SetStateAction} from "react";

import s from "./BlockContainer.module.css";

interface IDisplay {
    children: ReactNode,
    useFor: number,
    makeAnActiveObjHandler?: (value: number) => void,
    sortCalculator?: (idDrag: number, idDrop: number) => void,
    isDropArea?: boolean,
    isActive?: boolean;
    setDraggableObject?: Dispatch<SetStateAction<number>>;
    draggableObject?: number;
    setDragOver?: Dispatch<SetStateAction<number>>;
}

const BlockContainer:FC<IDisplay> = ({children,
                                         makeAnActiveObjHandler,
                                         sortCalculator,
                                         useFor,
                                         isDropArea,
                                         isActive,
                                         setDraggableObject,
                                         draggableObject,
                                         setDragOver}) => {

    const onDragEndHandler = (): void => {
        if(isDropArea && makeAnActiveObjHandler) {
            makeAnActiveObjHandler(useFor);
        }
    }
    const onDragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
        if(setDragOver && !isActive) setDragOver(e.type !== "dragleave"?useFor:-1);
    }
    const onDragStartHandler = (): void => {
        if(setDraggableObject) setDraggableObject(useFor);
    }
    const onDropHandler = (): void => {
        if(sortCalculator) {
            let idDrag = draggableObject !== undefined? draggableObject : -1;
            sortCalculator(idDrag, useFor);
        }
        if(setDragOver && !isActive) setDragOver(-1);
    }
    return(
        <div
            draggable={!isActive}
            onDragEnd={onDragEndHandler}
            onDragOver={(e) => onDragOverHandler(e)}
            onDragEnter={(e) => onDragOverHandler(e)}
            onDragLeave={(e) => onDragOverHandler(e)}
            onDragStart={onDragStartHandler}
            onDrop={onDropHandler}
            className={`${s.display_container} ${isActive?s.active:""}`}>
            {children}
        </div>
    );
}

export default BlockContainer;