import React from "react";
import {ActionTypes} from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectIsCrossedFlagSelected, selectIsFlagSelected} from "../../reducers/game/game.selector";
import './bottom-panel.style.css';

export const BottomPanel = () => {

    const dispatch = useDispatch();
    let isFlagSelected = useSelector(selectIsFlagSelected);
    let isCrossedFlagSelected = useSelector(selectIsCrossedFlagSelected);

    return (
        <div className="bottom_panel">
            <div className="remove_flag"
                 onClick={() => dispatch({type: ActionTypes.selectCrossedFlag})}
                 style={isCrossedFlagSelected ? {opacity: 1} : {opacity: 0.3}}>
                <img className="drag_crossed_mobile" src="flag_big.png" alt="123"/>
            </div>
            <div className="add_flag"
                 onClick={() => dispatch({type: ActionTypes.selectFlag})}
                 style={isFlagSelected ? {opacity: 1} : {opacity: 0.3}}>
                <img className="drag_mobile" src="flag_big.png" alt="123"/>
            </div>
        </div>
    );
}