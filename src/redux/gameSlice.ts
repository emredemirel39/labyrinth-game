import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { beginingBox, getBeginingBox, getDirection, getNextBox } from "../game";

export interface IGameState {
    currentBox: string | null,
    beginingBox: string | null,
    userChoice: string | null,
    direction: string | null,
    allDirections: null | string [],
    isTurnContinues: boolean,
    turnNumber: number,
    score: number
};

const initialState: IGameState = {
    currentBox: null,
    beginingBox: null,
    userChoice: null,
    direction: null,
    allDirections: null,
    isTurnContinues: false,
    turnNumber: 0,
    score: 0
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBeginingBox: (state) => {
            //state.currentBox = null;
            const beginingBox = getBeginingBox();
            state.isTurnContinues = true;
            state.currentBox = beginingBox;
            state.beginingBox = beginingBox;
        },
        setDirection: (state) => {
            //state.direction = null // for escape (states are equal) error
            const direction = getDirection(state.currentBox!);
            state.direction = direction;
        },
        setAllDirections: (state) => {
            if (state.allDirections === null) {
                state.allDirections = []
            };
            state.allDirections?.push(state.direction!);
        },
        setCurrentBox: (state) => {
            const newBox = getNextBox(state.currentBox!, state.direction!)
            state.currentBox = newBox;
        },
        increaseTurnNumber: (state) => {
            state.turnNumber ++
        },
        setUsersChoice: (state, action: PayloadAction<string>) => {
            state.beginingBox = null;
            state.userChoice = action.payload;
        },
        setEndTurn: (state) => {
            state.isTurnContinues = false;
        },
        setScore: (state) => {
            state.score = state.score + 1;
        },
        setResetGame: (state) => {
            state.beginingBox = null;
            state.currentBox = null;
            state.direction = null;
            state.userChoice = null;
            state.allDirections = null;
            state.turnNumber = 0;
        }
    }
});

export const {
    setBeginingBox,
    setAllDirections,
    setDirection,
    setCurrentBox,
    increaseTurnNumber,
    setUsersChoice,
    setEndTurn,
    setScore,
    setResetGame
} = gameSlice.actions;

export default gameSlice.reducer;