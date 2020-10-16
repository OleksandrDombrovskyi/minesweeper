import React, {Dispatch, MouseEvent, useEffect} from "react";
import './cell.style.css';
import {connect, useDispatch} from "react-redux";
import {Action, ActionTypes} from "../../actions/actions";
import {AppState} from "../../reducers/rootReducer";
import {selectCellIsFailed, selectCellNumber, selectCellState} from "../../reducers/game/game.selector";

export enum CellState {
    INITIAL,
    FLAGGED,
    QUESTIONED,
    OPEN,
}

export interface CellPosition {
    x: number;
    y: number;
}

export class CellProps {
    position: CellPosition;
    number: number;
    state: CellState;
    isFailed: boolean;

    constructor(position: CellPosition, number: number) {
        this.position = position;
        this.number = number;
        this.state = CellState.INITIAL;
        this.isFailed = false;
    }
}

const GridCell = (props: CellProps) => {

    const {position, number, state, isFailed} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFailed) {
            dispatch({type: ActionTypes.cellClickFailed});
        }
    });

    return (
        <div className="gridCell" onClick={onCellClick(position, dispatch)}
             onContextMenu={onCellRightClick(position, dispatch)}>
            {
                getCellElement(state, number, isFailed)
            }
        </div>
    );
}

function onCellRightClick(position: CellPosition, dispatch: Dispatch<any>) {
    return (event: MouseEvent) => {
        // prevent opening contextual menu on right button click
        event.preventDefault();
        dispatch({type: ActionTypes.cellRightClicked, payload: position})
    }
}

function onCellClick(position: CellPosition, dispatch: Dispatch<Action>) {
    return () => {
        dispatch({type: ActionTypes.cellClicked, payload: position})
    };
}

function getCellElement(state: CellState, number: number, isFailed: boolean) {
    switch (state) {
        case CellState.INITIAL:
            return getInitialCellElement();
        case CellState.OPEN:
            if (number === -1) {
                return getBombCellElement(isFailed);
            } else if (number > 0) {
                return getNumberCellElement(number);
            } else {
                return getEmptyCellElement();
            }
        case CellState.FLAGGED:
            return getFlaggedCellElement();
        case CellState.QUESTIONED:
            return getQuestionedCellElement();
    }
}

function getInitialCellElement() {
    return (
        <svg width="33" height="33">
            <rect className="initial" width="30" height="30"/>
        </svg>
    );
}

function getQuestionedCellElement() {
    return (
        <div>
            <svg width="33" height="33">
                <rect className="initial" width="30" height="30"/>
            </svg>
            <span className="question">?</span>
        </div>

    );
}

function getFlaggedCellElement() {
    return (
        <div className="img-overlay-svg">
            <svg className="cell-sign" width="33" height="33">
                <rect className="initial" width="30" height="30"/>
            </svg>
            <img className="cell-sign flag" width="22" height="22" src="flag.png" alt="123"/>
        </div>
    );
}

function getBombCellElement(isFailed: boolean) {
    return (
        <div className="img-overlay-svg">
            <svg width="33" height="33">
                <rect className={"open" + (isFailed ? " failedCell" : "")} width="30" height="30"/>
            </svg>
            <img width="33" height="33" src="bomb.svg" alt="123"/>
        </div>
    );
}

function getNumberCellElement(number: number) {
    return (
        <div>
            <svg width="33" height="33">
                <rect className="open" width="30" height="30"/>
            </svg>
            <span className={"number_" + number}>{number}</span>
        </div>
    );
}

function getEmptyCellElement() {
    return (
        <svg width="33" height="33">
            <rect className="open" width="30" height="30"/>
        </svg>
    );
}

const mapStateToProps = (state: AppState, ownProps: CellProps): CellProps => ({
    position: ownProps.position,
    number: selectCellNumber(ownProps.position)(state),
    state: selectCellState(ownProps.position)(state),
    isFailed: selectCellIsFailed(ownProps.position)(state)
})

export default connect(mapStateToProps)(GridCell)