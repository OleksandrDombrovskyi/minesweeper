import React, {Dispatch} from "react";
import './cell.style.css';
import {useDispatch} from "react-redux";
import {Action, ActionTypes} from "../../actions/actions";

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
}

export const GridCell = (props: CellProps) => {

    const {number, state} = props;
    const dispatch = useDispatch();

    return (
        <div className="gridCell" onClick={onCellClick(props, dispatch)}>
            {
                getCellElement(state, number)
            }
        </div>
    );
}

function onCellClick(props: CellProps, dispatch: Dispatch<Action>) {
    return () => {
        dispatch({type: ActionTypes.cellClicked, payload: props.position})
    };
}

function getCellElement(state: CellState, number: number) {
    switch (state) {
        case CellState.INITIAL:
            return (
                <svg width="33" height="33">
                    <rect className="initial" width="30" height="30"/>
                </svg>
            );
        case CellState.OPEN:
            if (number === -1) {
                return getBombCellElement();
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

function getBombCellElement() {
    return (
        <div className="img-overlay-svg">
            <svg width="33" height="33">
                <rect className="open" width="30" height="30"/>
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