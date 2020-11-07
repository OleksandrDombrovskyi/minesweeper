import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsCrossedFlagSelected,
    selectIsFlagSelected, selectIsMagicWandSelected,
    selectIsQuestionSelected, selectIsRemoveQuestionSelected
} from "../../reducers/game/game.selector";
import './bottom-panel.style.css';
import {Button} from "../button/button.component";
import {SymbolButtonContent} from "../symbol-button-content/symbol-button-content.component";

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
                <div className="add_question">
                    <Button isPressed={isQuestionSelected} height={buttonHeight} width={buttonWidth}>
                        <SymbolButtonContent symbol={"?"} fontSize={40}/>
                    </Button>
                </div>
                <div className="remove_question small_button">
                    <Button isPressed={isRemoveQuestionSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <SymbolButtonContent symbol={"?"} fontSize={18}/>
                    </Button>
                </div>
            </div>
            <div className="magic_wand">
                <Button isPressed={isIsMagicWandSelected} height={buttonHeight} width={buttonWidth}>
                    <img width="44" height="44" src="magic_wand.png" alt="123"/>
                </Button>
            </div>
            <div className="flags">
                <div className="remove_flag small_button">
                    <Button isPressed={isCrossedFlagSelected} height={smallButtonHeight} width={smallButtonWidth}>
                        <img width="22" height="22" src="flag_crossed.png" alt="123"/>
                    </Button>
                </div>
                <div className="add_flag">
                    <Button isPressed={isFlagSelected} height={buttonHeight} width={buttonWidth}>
                        <img width="44" height="44" src="flag_big.png" alt="123"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}