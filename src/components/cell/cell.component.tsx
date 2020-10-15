import React, {Dispatch, useEffect} from "react";
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

export interface CellProps {
    position: CellPosition;
    number: number;
    state: CellState;
    isFailed: boolean;
}

const GridCell = (props: CellProps) => {

    const {position, number, state, isFailed} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFailed) {
            dispatch({type: ActionTypes.cellClickFailed});
        }
    });

    console.log("Render cell");

    return (
        <div className="gridCell" onClick={onCellClick(position, dispatch)}>
            {
                getCellElement(state, number, isFailed)
            }
        </div>
    );
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
        <svg width="33" height="33">
            <rect className="initial" width="30" height="30"/>
            <text x="8" y="23">?</text>
        </svg>
    );
}

function getFlaggedCellElement() {
    return (
        <div className="img-overlay-svg">
            <svg className="cell-sign" width="33" height="33">
                <rect className="initial" width="30" height="30"/>
            </svg>
            <img className="cell-sign" width="33" height="33" src="flag.svg" alt="123"/>
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
        <svg width="33" height="33">
            <rect className="open" width="30" height="30"/>
            <text x="8" y="23">{number}</text>
        </svg>
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