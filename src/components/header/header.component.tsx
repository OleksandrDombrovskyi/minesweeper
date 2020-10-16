import React, {Dispatch} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsGameFailed, selectIsGameWon} from "../../reducers/game/game.selector";
import "./header.style.css";
import {Action, ActionTypes} from "../../actions/actions";
import {generatedDefaultGrid} from "../../utils/gridGeneratorUtils";

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
    return () => dispatch({
        type: ActionTypes.startGame,
        payload: {
            isGameWon: false,
            isGameFailed: false,
            isGridGenerated: false,
            grid: {
                cells: generatedDefaultGrid()
            }
        }})
}
