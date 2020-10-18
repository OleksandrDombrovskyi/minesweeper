import React from "react";
import './flag-mobile.style.css';
import {useDispatch, useSelector} from "react-redux";
import {ActionTypes} from "../../actions/actions";
import {selectIsCrossedFlagSelected, selectIsFlagSelected} from "../../reducers/game/game.selector";

export const FlagsMobile = () => {

    const dispatch = useDispatch();
    let isFlagSelected = useSelector(selectIsFlagSelected);
    let isCrossedFlagSelected = useSelector(selectIsCrossedFlagSelected);

    return (
        <div>
            {
                isFlagSelected
                    ?
                    <div className="flag_div" onClick={() => dispatch({type: ActionTypes.selectFlag})}>
                        <svg className="cell-sign" width="33" height="43">
                            <rect className="open" width="30" height="40"/>
                        </svg>
                        <img className="drag_mobile" width="22" height="22" src="flag.png" alt="123"/>
                    </div>
                    :
                    <div className="flag_div" onClick={() => dispatch({type: ActionTypes.selectFlag})}>
                        <svg className="cell-sign" width="33" height="43">
                            <rect className="initial" width="30" height="40"/>
                        </svg>
                        <img className="drag_mobile" width="22" height="22" src="flag.png" alt="123"/>
                    </div>
            }

            {
                isCrossedFlagSelected
                    ?
                    <div className="flag_crossed_div" onClick={() => dispatch({type: ActionTypes.selectCrossedFlag})}>
                        <svg className="cell-sign" width="33" height="43">
                            <rect className="open" width="30" height="40"/>
                        </svg>
                        <img className="drag_crossed_mobile" width="22" height="22" src="flag_crossed.png" alt="123"/>
                    </div>
                    :
                    <div className="flag_crossed_div" onClick={() => dispatch({type: ActionTypes.selectCrossedFlag})}>
                        <svg className="cell-sign" width="33" height="43">
                            <rect className="initial" width="30" height="40"/>
                        </svg>
                        <img className="drag_crossed_mobile" width="22" height="22" src="flag_crossed.png" alt="123"/>
                    </div>
            }

        </div>
    );
}