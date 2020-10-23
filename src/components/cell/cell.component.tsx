import React, {Dispatch, MouseEvent, useEffect} from "react";
import './cell.style.css';
import {connect, useDispatch} from "react-redux";
import {Action, ActionTypes} from "../../actions/actions";
import {AppState} from "../../reducers/rootReducer";
import {selectCellIsFailed, selectCellNumber, selectCellState} from "../../reducers/game/game.selector";
import {dragNDropFlagOnGrid} from "../../utils/dragNDropUtils";
import {Button} from "../button/button.component";
import {SymbolButtonContent} from "../symbol-button-content/symbol-button-content.component";

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
        <div id={props.position.x + "_" + props.position.y} className="gridCell"
             onClick={onCellClick(position, dispatch)}
             onContextMenu={onCellRightClick(position, dispatch)}>
            <Button isPressed={state === CellState.OPEN} isFailed={isFailed}>
                {
                    getButtonContent(state, number, isFailed, dispatch)
                }
            </Button>
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

function getButtonContent(state: CellState, number: number, isFailed: boolean, dispatch: Dispatch<any>) {
    switch (state) {
        case CellState.INITIAL:
            return null;
        case CellState.OPEN:
            if (number === -1) {
                return getBombContent();
            } else if (number > 0) {
                return getNumberContent(number);
            } else {
                return null;
            }
        case CellState.FLAGGED:
            return getFlagContent(dispatch);
        case CellState.QUESTIONED:
            return getQuestionContent();
    }
}

function getQuestionContent() {
    return (
        <SymbolButtonContent symbol={"?"} fontSize={18}/>
    );
}

function getFlagContent(dispatch: React.Dispatch<any>) {
    return (
        <img className="flag" width="22" height="22" src="flag.png" alt="123"
             onMouseDown={dragNDropFlagOnGrid(dispatch)}/>
    );
}

function getBombContent() {
    return (
        <img className="bomb" width="33" height="33" src="bomb.svg" alt="123"/>
    );
}

function getNumberContent(number: number) {
    return (
        <SymbolButtonContent symbol={number} fontSize={18}/>
    );
}

const mapStateToProps = (state: AppState, ownProps: CellProps): CellProps => ({
    position: ownProps.position,
    number: selectCellNumber(ownProps.position)(state),
    state: selectCellState(ownProps.position)(state),
    isFailed: selectCellIsFailed(ownProps.position)(state)
})

export default connect(mapStateToProps)(GridCell)