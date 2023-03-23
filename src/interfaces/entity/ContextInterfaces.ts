export interface IActionsButtonsContext {
    makeActionHandler: (value: string) => void;
    makeCurrentNumberHandler: (value: string) => void;
    makeAResult: () => void;
}

export interface IDragAndDropContextContext {
    activeObjects: number[];
    makeAnActiveObjHandler: (value: number) => void;
    sortCalculator: (idDrag: number, idDrop: number) => void;
    currentNumber: string;
}

export interface IHeaderContext {
    isRunning: boolean;
    changeState: (value: string) => void
}