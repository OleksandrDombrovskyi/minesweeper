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
import {generateDefaultGrid} from "../../utils/gridGeneratorUtils";
import {Counter} from "../counter/counter.component";
import {Timer} from "../timer/timer.component";
import {Flags} from "../flags/flags.component";
import {INITIAL_STATE} from "../../reducers/game/game.reducer";

export const Header = () => {
    const isGameWon = useSelector(selectIsGameWon)
    const isGameFailed = useSelector(selectIsGameFailed)
    const bombAmount = useSelector(selectBombAmount);
    const flagAmount = useSelector(selectFlagAmount);

    const dispatch = useDispatch();

    let imageName = getSmileImageName(isGameFailed, isGameWon, bombAmount, flagAmount);

    return (
        <div className="header">
            <div className="flags_and_counter_container">
                <div className="flags">
                    <Flags/>
                </div>
                <div className="counter">
                    <Counter/>
                </div>
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
            ...INITIAL_STATE,
            grid: {
                cells: generateDefaultGrid(10, 10)
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
