import React from "react";
import './flag.style.css';
import {CellPosition} from "../cell/cell.component";
import {DragPreviewImage, DragSourceMonitor, useDrag} from "react-dnd";
import {SourceType} from "dnd-core";
import {useDispatch} from "react-redux";
import {Action, ActionTypes} from "../../actions/actions";
import {Dispatch} from "redux";
import {isMobileDevice} from "../../utils/detectmobilebrowser";
// @ts-ignore
import {usePreview} from 'react-dnd-preview';

export const DnDTypes = {
    FLAG: 'flag'
}

export interface FlagProps {
    cellPosition?: CellPosition;
}

export interface FlagDragObject {
    type: SourceType,
    position?: CellPosition
}

export const FlagImage = (props: FlagProps) => {
    const {cellPosition} = props
    let dispatch = useDispatch();

    const [{isDragging}, drag, preview] = useDrag<FlagDragObject, boolean, any>({
        item: {
            type: DnDTypes.FLAG,
            position: props.cellPosition
        },
        end: (item, monitor: DragSourceMonitor) => {
            let isFLagDroppedOutOfTable = !monitor.getDropResult();
            if (cellPosition && isFLagDroppedOutOfTable) {
                removeFlagFromCell(dispatch, cellPosition);
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <>
            {
                isMobileDevice()
                    ? <MobilePreviewForTouchEvent/>
                    : <DragPreviewImage connect={preview} src="flag_24x24.png"/>
            }
            <img ref={drag} width="22" height="22" src="flag_24x24.png"
                 style={{opacity: cellPosition && isDragging ? 0.5 : 1}}
                 alt="123"/>
        </>
    )
}

function removeFlagFromCell(dispatch: Dispatch<Action>, cellPosition: CellPosition) {
    dispatch({
        type: ActionTypes.dragNDropFlag,
        payload: {
            cellToRemoveFlag: cellPosition
        }
    })
}

const MobilePreviewForTouchEvent = () => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
        return null;
    }
    if (itemType === DnDTypes.FLAG) {
        return (
            <img width="50" height="50" src="flag_big.png" alt="123" style={{...style, zIndex: 50, top: -10, left: -10}}/>
        )
    }
    return null;
};
