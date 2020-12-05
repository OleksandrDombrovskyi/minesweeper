import React from "react";
import './central-navbar.style.css';
import {Flags} from "../flags/flags.component";
import {Counter} from "../counter/counter.component";
import {Timer} from "../timer/timer.component";
import {useDispatch, useSelector} from "react-redux";
import {
    selectBombAmount,
    selectFlagAmount,
    selectIsGameFailed,
    selectIsGameWon,
    selectLevelParams
} from "../../reducers/game/game.selector";
import {isMobileDevice} from "../../utils/detectmobilebrowser";
import MenuIcon from "@material-ui/icons/Menu";
import {LevelParams} from "../../reducers/game/data";
import {openMenuAction, startGame} from "../../actions/actions";

export const CentralNavbar = () => {

    const dispatch = useDispatch();

    const levelParams = useSelector(selectLevelParams);

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
                        ? <MenuIcon fontSize="large" style={{paddingTop: 10}} color="action"
                                    onClick={() => dispatch(openMenuAction())}/>
                        : <Flags/>
                }
            </div>
            <div className="counter">
                <Counter/>
            </div>
            <div className="smile">
                <img className="smile_image" src={"smiles/" + imageName} alt=":)"
                     onClick={dispatchStartGame(dispatch, levelParams)}/>
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

function dispatchStartGame(dispatch: React.Dispatch<any>, levelParams: LevelParams) {
    return () => dispatch(startGame(levelParams))
}