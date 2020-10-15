import React, {Dispatch} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsGameFailed, selectIsGameWon} from "../../reducers/game/game.selector";
import "./header.style.css";
import {Action, ActionTypes} from "../../actions/actions";
import {CellState} from "../cell/cell.component";

export const Header = () => {
    const isGameWon = useSelector(selectIsGameWon)
    const isGameFailed = useSelector(selectIsGameFailed)

    const dispatch = useDispatch();

    return (
        <div>
            {
                isGameFailed
                ? <img className="smile" src="smiles/failed.png" alt="fail" onClick={startGame(dispatch)}/>
                    : isGameWon
                    ? <img className="smile" src="smiles/win.png" alt="win" onClick={startGame(dispatch)}/>
                    : <img className="smile" src="smiles/start.png" alt="start" onClick={startGame(dispatch)}/>
            }
        </div>
    )
}

function startGame(dispatch: Dispatch<Action>) {
    //TODO: replace with grid generator (hardcoded to make cells to rerender)
    return () => dispatch({
        type: ActionTypes.startGame,
        payload: {
            isGameWon: false,
            isGameFailed: false,
            grid: {
                cells: [
                    [{position: {x: 0, y: 0}, number: 2, state: CellState.INITIAL, isFailed: false}, {position: {x: 1, y: 0}, number: -1, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 0}, number: 1, state: CellState.INITIAL, isFailed: false}],
                    [{position: {x: 0, y: 1}, number: -1, state: CellState.FLAGGED, isFailed: false}, {position: {x: 1, y: 1}, number: 2, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 1}, number: 1, state: CellState.INITIAL, isFailed: false}],
                    [{position: {x: 0, y: 2}, number: 1, state: CellState.INITIAL, isFailed: false}, {position: {x: 1, y: 2}, number: 1, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 2}, number: 0, state: CellState.INITIAL, isFailed: false}]
                ]
            }
        }})
}
