import React, {Dispatch, FC, memo, MouseEvent, useEffect} from "react";
import './cell.style.css';
import {connect, useDispatch} from "react-redux";
import {AppState} from "../../reducers/rootReducer";
import {selectCellIsFailed, selectCellNumber, selectCellState} from "../../reducers/game/game.selector";
import {Button} from "../button/button.component";
import {SymbolButtonContent} from "../symbol-button-content/symbol-button-content.component";
import {DnDTypes, FlagDragObject, FlagImage} from "../flag/flag.component";
import {useDrop} from "react-dnd";
import {cellClicked, cellClickFailed, cellRightClicked, dragNDropFlag} from "../../actions/actions";

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

const GridCell: FC<CellProps> = memo(({position, number, state, isFailed}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (isFailed) {
            dispatch(cellClickFailed());
        }
    }, [dispatch, isFailed]);

    const [{isOver}, drop] = useDrop<FlagDragObject, any, { isOver: boolean }>({
        accept: DnDTypes.FLAG,
        drop: (item: FlagDragObject) => handleDragNDropFlag(item, position, state, dispatch),
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div id={position.x + "_" + position.y} className="gridCell"
             onClick={onCellClick(position, dispatch)}
             onContextMenu={onCellRightClick(position, dispatch)}>
            <div ref={drop}>
                <Button isPressed={state === CellState.OPEN} isFailed={isFailed} isOver={isOver}>
                    {
                        getButtonContent(state, number, position)
                    }
                </Button>
            </div>
        </div>
    );
}, ((prevProps: CellProps, nextProps: CellProps) => {
    // rendering optimization on first click: CellProps.number is skipped because it is calculated after first click
    let isPositionEqual = prevProps.position.x === nextProps.position.x
        && prevProps.position.y === nextProps.position.y;
    return isPositionEqual
        && prevProps.state === nextProps.state
        && prevProps.isFailed === nextProps.isFailed;
}));

function onCellRightClick(position: CellPosition, dispatch: Dispatch<any>) {
    return (event: MouseEvent) => {
        // prevent opening contextual menu on right button click
        event.preventDefault();
        dispatch(cellRightClicked(position))
    }
}

function onCellClick(position: CellPosition, dispatch: Dispatch<any>) {
    return () => {
        dispatch(cellClicked(position))
    };
}

function getButtonContent(state: CellState, number: number, position: CellPosition) {
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
            return getFlagContent(position);
        case CellState.QUESTIONED:
            return getQuestionContent();
    }
}

function getQuestionContent() {
    return (
        <SymbolButtonContent symbol={"?"} fontSize={18}/>
    );
}

function getFlagContent(position: CellPosition) {
    return (
        <FlagImage cellPosition={position}/>
    );
}

function getBombContent() {
    return (
        <img className="bomb" width="33" height="33" src="bomb.svg" alt='bomb'/>
    );
}

function getNumberContent(number: number) {
    return (
        <SymbolButtonContent symbol={number} fontSize={18}/>
    );
}

function handleDragNDropFlag(draggedFlag: FlagDragObject, destinationPosition: CellPosition, state: CellState, dispatch: Dispatch<any>) {
    let flagSourcePosition = draggedFlag.position;
    if (isTheSameCell(flagSourcePosition, destinationPosition) || state === CellState.OPEN) {
        return;
    }
    removeFlagFromSourceCellAndAddToDestinationCell(dispatch, destinationPosition, flagSourcePosition);
}

function isTheSameCell(flagPosition: CellPosition | undefined, position: CellPosition) {
    return flagPosition && ((flagPosition.x === position.x) && (flagPosition.y === position.y));
}

function removeFlagFromSourceCellAndAddToDestinationCell(dispatch: (value: any) => void, position: CellPosition, flagInitPosition: CellPosition | undefined) {
    dispatch(dragNDropFlag({
        cellToAddFlag: position,
        cellToRemoveFlag: flagInitPosition
    }))
}

const mapStateToProps = (state: AppState, ownProps: CellProps): CellProps => ({
    position: ownProps.position,
    number: selectCellNumber(ownProps.position)(state),
    state: selectCellState(ownProps.position)(state),
    isFailed: selectCellIsFailed(ownProps.position)(state)
})

export default connect(mapStateToProps)(GridCell)