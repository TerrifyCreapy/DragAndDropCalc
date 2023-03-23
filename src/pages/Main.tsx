import {createContext, FC} from "react";

import Container from "../components/Container";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {
    changeRun,
    makeACalculation,
    makeActiveObjects,
    makeCurrentNumber,
    makeNewAction,
    sortCalculator
} from "../store/Slices/Calculator";
import {IActionsButtonsContext, IDragAndDropContextContext, IHeaderContext} from "../interfaces/entity/ContextInterfaces";



export const HeaderContext = createContext<IHeaderContext>({} as IHeaderContext);
export const DragAndDropContext = createContext<IDragAndDropContextContext>({} as IDragAndDropContextContext);
export const ActionsContext = createContext<IActionsButtonsContext>({} as IActionsButtonsContext);



const whatToDisplay = (currentNumber: string, result: number, currentDisplay: number):string =>
    currentDisplay?("" + result)
        .replace(/\./, ","): currentNumber;



const MainPage:FC = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(state => state.calculator);



    const changeRunning = (value: string):void => { dispatch(changeRun(value==="RunTime"? true: false)); }

    const makeAnActiveObjHandler = (value: number): void => { dispatch(makeActiveObjects(value)) }

    const makeActionHandler = (action: string): void => { dispatch(makeNewAction(action)); }

    const makeCurrentNumberHandler = (value: string): void => { dispatch(makeCurrentNumber(value)); }

    const sortCalculatorHandler = (idDrag: number, idDrop: number): void => { dispatch(sortCalculator({idDrag, idDrop})) }

    const makeAResult = (): void => { dispatch(makeACalculation()) }


    const HeaderValue: IHeaderContext = {
        isRunning: selector.ran,
        changeState: changeRunning
    }

    const DragAndDropValue: IDragAndDropContextContext = {
        activeObjects: selector.activeObjects,
        sortCalculator: sortCalculatorHandler,
        currentNumber: whatToDisplay(selector.currentNumber, selector.result, selector.currentDisplay),
        makeAnActiveObjHandler
    }

    const ActionsValue: IActionsButtonsContext = {
        makeActionHandler,
        makeCurrentNumberHandler,
        makeAResult
    }

    return(
        <HeaderContext.Provider value={HeaderValue}>
            <DragAndDropContext.Provider value={DragAndDropValue}>
                <ActionsContext.Provider value={ActionsValue}>
                    <Container/>
                </ActionsContext.Provider>
            </DragAndDropContext.Provider>

        </HeaderContext.Provider>
    );
}

export default MainPage;