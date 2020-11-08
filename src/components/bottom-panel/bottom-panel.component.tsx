import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsCrossedFlagSelected,
    selectIsFlagSelected,
    selectIsMagicWandSelected,
    selectIsQuestionSelected,
    selectIsRemoveQuestionSelected
} from "../../reducers/game/game.selector";
import './bottom-panel.style.css';
import {Button} from "../button/button.component";
import {ActionTypes} from "../../actions/actions";

export const BottomPanel = () => {

    const dispatch = useDispatch(); //TODO: add logic for add/remove flag and add/remove question mark
    let isFlagSelected = useSelector(selectIsFlagSelected);
    let isCrossedFlagSelected = useSelector(selectIsCrossedFlagSelected);
    let isQuestionSelected = useSelector(selectIsQuestionSelected);
    let isRemoveQuestionSelected = useSelector(selectIsRemoveQuestionSelected);
    let isIsMagicWandSelected = useSelector(selectIsMagicWandSelected);

    const buttonWidth = 60;
    const buttonHeight = 60;
    const smallButtonWidth = 30;
    const smallButtonHeight = 30;

    return (
        <div className="bottom_panel">
            <div className="questions">
                <div className="add_question" onClick={() => dispatch({type: ActionTypes.selectQuestion})}>
                    <Button isPressed={isQuestionSelected} height={buttonHeight} width={buttonWidth}>
                        <img width="44" height="44" src="question.png" alt="123"/>
                    </Button>
                </div>
                <div className="remove_question small_button" onClick={() => dispatch({type: ActionTypes.selectCrossedQuestion})}>
                    <Button isPressed={isRemoveQuestionSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <img width="22" height="22" src="crossed_question.png" alt="123"/>
                    </Button>
                </div>
            </div>
            <div className="magic_wand" onClick={() => dispatch({type: ActionTypes.selectMagicWand})}>
                <Button isPressed={isIsMagicWandSelected} height={buttonHeight} width={buttonWidth}>
                    <img width="44" height="44" src="magic_wand.png" alt="123"/>
                </Button>
            </div>
            <div className="flags">
                <div className="remove_flag small_button" onClick={() => dispatch({type: ActionTypes.selectCrossedFlag})}>
                    <Button isPressed={isCrossedFlagSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <img width="22" height="22" src="crossed_flag.png" alt="123"/>
                    </Button>
                </div>
                <div className="add_flag" onClick={() => dispatch({type: ActionTypes.selectFlag})}>
                    <Button isPressed={isFlagSelected} height={buttonHeight} width={buttonWidth}>
                        <img width="44" height="44" src="flag_big.png" alt="123"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}