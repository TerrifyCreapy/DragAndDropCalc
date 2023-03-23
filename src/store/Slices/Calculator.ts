import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface ICalculatorState {
    currentNumber: string;
    result: number;
    actions: string[];
    numbers: any[];
    currentDisplay: number;
    ran: boolean;
    activeObjects: number[];
}

const initialState: ICalculatorState = {
    currentNumber: "0",
    result: 0,
    actions: [],
    numbers: [],
    currentDisplay: 0, //0 if currentNumber and 1 if result;
    ran: false,
    activeObjects: [],
}

//Logic. We have two arrays with nums and actions; The first time we are looking for "X" | "/" and making this action. The index of this action == index of the first number
// to make this action and using map and filter we make an action and removing this item from array. We are doing it while length of array with nums does not equal to 1.
function decision(arr: any[], signIndex: number) {
    return arr.map(function(e, i){
        if(i === signIndex) return parseFloat(e) / parseFloat(arr[i + 1]);
        else if(i !== signIndex && i !== signIndex + 1) return e;
    }).filter((e) => e !== undefined);
}

function multiply(arr: any[], signIndex: number) {
    return arr.map(function(e, i){
        if(i === signIndex) return parseFloat(e) * parseFloat(arr[i + 1]);
        else if(i !== signIndex && i !== signIndex + 1) return e;
    }).filter((e) => e !== undefined);
}

function minus(arr: any[], signIndex: number) {
    return arr.map(function(e, i){
        if(i === signIndex) return parseFloat(e) - parseFloat(arr[i + 1]);
        else if(i !== signIndex && i !== signIndex + 1) return e;
    }).filter((e) => e !== undefined);
}

function plus(arr: any[], signIndex: number) {
    return arr.map(function(e, i){
        if(i === signIndex) return parseFloat(e) + parseFloat(arr[i + 1]);
        else if(i !== signIndex && i !== signIndex + 1) return e;
    }).filter((e) => e !== undefined);
}



const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        makeActiveObjects: (state, action: PayloadAction<number>) => {
          state.activeObjects.push(action.payload); //appearing new object to the right side
        },
        changeRun: (state, action: PayloadAction<boolean>) => {
            state.ran = action.payload;
            state.currentDisplay = 0;
            state.result = 0;
            state.currentNumber = "0";
            if(action.payload === false) state.activeObjects = [];
        },
        makeCurrentNumber: (state, action: PayloadAction<string>) => {
            if(!state.ran) return; //if in constructor mode
            if(state.currentDisplay === 1) state.currentDisplay = 0; //if was result -> current num
            if(state.currentNumber.length && ["/", "X", "-", "+"].indexOf(state.currentNumber[0]) !== -1) { //if we have a previous num and now displaying action
                state.currentNumber = action.payload;
                return;
            }
            if(state.currentNumber === "0" && action.payload !== ",") {
                state.currentNumber = action.payload;
            }
            else {
                if(action.payload === "," && state.currentNumber.indexOf(",") === -1 ) {
                    state.currentNumber += action.payload;
                }
                else if(action.payload !== ",") {
                    state.currentNumber += action.payload;
                }
            }
        },
        makeNewAction: (state, action: PayloadAction<string>) => {
            state.numbers.push(parseFloat(state.currentNumber.replace(",", "."))); //parseFloat doesn't work with , -> we replace ,->. and parse
            if(state.actions.length === state.numbers.length) state.actions[state.actions.length-1] = action.payload;
            else state.actions.push(action.payload);
            state.currentNumber = action.payload;
        },
        makeACalculation: (state) => {
            if(state.numbers.length === 0) {
                state.result = parseFloat(state.currentNumber.replace(",", "."));
                state.currentDisplay = 1;
                return;
            }

            if(state.currentNumber !== "0") {
                state.numbers.push(parseFloat(state.currentNumber.replace(",", ".")));
                state.currentNumber = "0";
            }
            state.currentDisplay = 1;
            if(state.actions.length === state.numbers.length) state.actions = state.actions.slice(0, -1);

            while(state.numbers.length !== 1 && state.actions.length !== 0) {
                let signDev = state.actions.indexOf("/");
                let signMultiply = state.actions.indexOf("X");
                let signSub = state.actions.indexOf("-");
                let signPlus = state.actions.indexOf("+");

                if(signDev !== -1 && signMultiply !== -1) { //If we have "X" and "/" we need to check what action has less index
                    if(signDev < signMultiply) {
                        state.numbers = decision(state.numbers, signDev);

                        state.actions = state.actions.filter((e, index) => index !== signDev);
                        continue;
                    }
                    else {
                        state.numbers = multiply(state.numbers, signMultiply)

                        state.actions = state.actions.filter((e, index) => index !== signMultiply);
                        continue;
                    }
                }
                else if(signDev !== -1) {
                    state.numbers = state.numbers = decision(state.numbers, signDev);

                    state.actions = state.actions.filter((e, index) => index !== signDev);
                    continue;
                }
                else if(signMultiply !== -1) {
                    state.numbers = multiply(state.numbers, signMultiply);

                    state.actions = state.actions.filter((e, index) => index !== signMultiply);
                    continue;
                }

                if(signSub !== -1 && signMultiply !== -1) {//If we have "-" and "+" we need to check what action has less index
                    if(signSub < signPlus) {
                        state.numbers = minus(state.numbers, signSub);
                        state.actions = state.actions.filter((e, index) => index !== signSub);
                        continue;
                    }
                    else {
                        state.numbers = plus(state.numbers, signPlus);
                        state.actions = state.actions.filter((e, index) => index !== signPlus);
                        continue;
                    }
                }
                else if(signSub !== -1) {
                    state.numbers = minus(state.numbers, signSub);
                    state.actions = state.actions.filter((e, index) => index !== signSub);
                    continue;
                }
                else if(signPlus !== -1) {
                    state.numbers = plus(state.numbers, signPlus);
                    state.actions = state.actions.filter((e, index) => index !== signPlus);
                    continue;
                }
            }
            state.result = state.numbers[0];
            state.numbers = [];

        },
        sortCalculator: (state, action: PayloadAction<{idDrag: number, idDrop: number}>) => {
            if(action.payload.idDrag === -1) return;
            let indexDrag = state.activeObjects.indexOf(action.payload.idDrag);
            let indexDrop = state.activeObjects.indexOf(action.payload.idDrop);
            [state.activeObjects[indexDrag], state.activeObjects[indexDrop]] = [state.activeObjects[indexDrop], state.activeObjects[indexDrag]];
        }

    }
});

export const calculatorReducer = calculatorSlice.reducer;

export const {makeCurrentNumber, makeNewAction, changeRun, makeActiveObjects, makeACalculation, sortCalculator} = calculatorSlice.actions;