import React, {Dispatch} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectBombAmount,
    selectFlagAmount,
    selectIsGameFailed,
    selectIsGameWon
} from "../../reducers/game/game.selector";
import "./header.style.css";
import {Action, ActionTypes} from "../../actions/actions";
import {generatedDefaultGrid} from "../../utils/gridGeneratorUtils";
import {Counter} from "../counter/counter.component";
import {Timer} from "../timer/timer.component";

export const Header = () => {
    const isGameWon = useSelector(selectIsGameWon)
    const isGameFailed = useSelector(selectIsGameFailed)
    const bombAmount = useSelector(selectBombAmount);
    const flagAmount = useSelector(selectFlagAmount);

    const dispatch = useDispatch();

    let imageName = getSmileImageName(isGameFailed, isGameWon, bombAmount, flagAmount);

    return (
        <div className="header">
            <div className="counter">
                <Counter/>
            </div>
            <div className="smile">
                <img className="smile_image" src={"smiles/" + imageName} alt="fail" onClick={startGame(dispatch)}/>
            </div>
            <div className="timer">
                <Timer/>
            </div>
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
            gameTime: 0,
            grid: {
                cells: generatedDefaultGrid()
            }
        }
    })
}

function getSmileImageName(isGameFailed: boolean, isGameWon: boolean, bombAmount: number, flagAmount: number) {
    if (isGameFailed) {
        return "failed.png";
    } else if (isGameWon) {
        return "win.png";
    } else if (bombAmount < flagAmount) {
        return "laugh.png";
    } else {
        return "start.png";
    }
}
