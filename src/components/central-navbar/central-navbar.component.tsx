import React, {Dispatch} from "react";
import './central-navbar.style.css';
import {Flags} from "../flags/flags.component";
import {Counter} from "../counter/counter.component";
import {Timer} from "../timer/timer.component";
import {useDispatch, useSelector} from "react-redux";
import {
    selectBombAmount,
    selectFlagAmount,
    selectIsGameFailed,
    selectIsGameWon
} from "../../reducers/game/game.selector";
import {Action, ActionTypes} from "../../actions/actions";
import {INITIAL_STATE} from "../../reducers/game/game.reducer";
import {generateDefaultGrid} from "../../utils/gridGeneratorUtils";
import {isMobileDevice} from "../../utils/detectmobilebrowser";
import MenuIcon from "@material-ui/icons/Menu";

export const CentralNavbar = () => {

    const dispatch = useDispatch();

    const isGameWon = useSelector(selectIsGameWon)
    const isGameFailed = useSelector(selectIsGameFailed)
    const bombAmount = useSelector(selectBombAmount);
    const flagAmount = useSelector(selectFlagAmount);

    let imageName = getSmileImageName(isGameFailed, isGameWon, bombAmount, flagAmount);

    return (
        <div className="central-navbar">
            <div className="flags">
                {
                    isMobileDevice()
                        ? <MenuIcon fontSize="large" style={{paddingTop: 10}} color="action" onClick={() => dispatch({type: ActionTypes.openMenuAction})}/>
                        : <Flags/>
                }
            </div>
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