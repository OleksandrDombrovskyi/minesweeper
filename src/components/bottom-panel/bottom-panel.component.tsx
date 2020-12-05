import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsCrossedFlagSelected,
    selectIsFlagSelected,
    selectIsMagicWandSelected,
    selectIsQuestionSelected,
    selectIsRemoveQuestionSelected, selectMagicWandCounter
} from "../../reducers/game/game.selector";
import './bottom-panel.style.css';
import {Button} from "../button/button.component";
import {
    selectCrossedFlag,
    selectCrossedQuestion,
    selectFlag,
    selectMagicWand,
    selectQuestion
} from "../../actions/actions";

export const BottomPanel = () => {

    const dispatch = useDispatch();
    const isFlagSelected = useSelector(selectIsFlagSelected);
    const isCrossedFlagSelected = useSelector(selectIsCrossedFlagSelected);
    const isQuestionSelected = useSelector(selectIsQuestionSelected);
    const isRemoveQuestionSelected = useSelector(selectIsRemoveQuestionSelected);
    const isIsMagicWandSelected = useSelector(selectIsMagicWandSelected);
    const magicWandCounter = useSelector(selectMagicWandCounter);

    const buttonWidth = 60;
    const buttonHeight = 60;
    const smallButtonWidth = 30;
    const smallButtonHeight = 30;

    return (
        <div className="bottom_panel">
            <div className="questions">
                <div className="add_question" onClick={() => dispatch(selectQuestion())}>
                    <Button isPressed={isQuestionSelected} height={buttonHeight} width={buttonWidth}>
                        <img width="44" height="44" src="question.png" alt="123"/>
                    </Button>
                </div>
                <div className="remove_question small_button" onClick={() => dispatch(selectCrossedQuestion())}>
                    <Button isPressed={isRemoveQuestionSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <img width="22" height="22" src="crossed_question.png" alt="123"/>
                    </Button>
                </div>
            </div>
            <div className="magic_wand" onClick={() => dispatch(selectMagicWand())} style={disableIdCounterZero(magicWandCounter)}>
                <Button isPressed={isIsMagicWandSelected} height={buttonHeight} width={buttonWidth}>
                    <img width="44" height="44" src="magic_wand.png" alt="123"/>
                    <span className="magic_wand_counter">{magicWandCounter}</span>
                </Button>
            </div>
            <div className="flags">
                <div className="remove_flag small_button" onClick={() => dispatch(selectCrossedFlag())}>
                    <Button isPressed={isCrossedFlagSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <img width="22" height="22" src="crossed_flag.png" alt="123"/>
                    </Button>
                </div>
                <div className="add_flag" onClick={() => dispatch(selectFlag())}>
                    <Button isPressed={isFlagSelected} height={buttonHeight} width={buttonWidth}>
                        <img width="44" height="44" src="flag_big.png" alt="123"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function disableIdCounterZero(magicWandCounter: number): React.CSSProperties | undefined {
    return magicWandCounter <= 0 ? {pointerEvents: "none", opacity: 0.5} : {};
}
