import {Dispatch, MouseEvent as ReactMouseEvent} from "react";
import {ActionTypes} from "../actions/actions";
import {CellPosition} from "../components/cell/cell.component";
import {isMobileDevice} from "./detectmobilebrowser";

export function dragNDropFlagOnGrid(dispatch: Dispatch<any>) {
    return (event: ReactMouseEvent<HTMLElement>) => {
        if (isMobileDevice() || event.button !== 0) {
            return;
        }

        let targetFlag = event.currentTarget;
        let parentElement = targetFlag.parentElement;
        targetFlag.ondragstart = () => false;

        // before move the element out of the parent
        let gridCellToRemoveFlag = getClosest(targetFlag, ".gridCell");

        document.body.appendChild(targetFlag);

        const prevPosition = targetFlag.style.position;
        const prevZIndex = targetFlag.style.zIndex;
        const prevTop = targetFlag.style.top;
        const prevLeft = targetFlag.style.left;

        targetFlag.style.position = 'absolute';
        targetFlag.style.zIndex = '1000';

        moveFlagAt(event.pageX, event.pageY, targetFlag);

        const onMouseMove = (event: MouseEvent) => {
            moveFlagAt(event.pageX, event.pageY, targetFlag);
        }

        document.addEventListener('mousemove', onMouseMove);

        targetFlag.onmouseup = (event: MouseEvent) => {
            document.removeEventListener('mousemove', onMouseMove);
            if (targetFlag) {
                document.body.removeChild(targetFlag);
            }

            let gridCellToAddFlag = getClosest(document.elementFromPoint(event.pageX, event.pageY), ".gridCell");
            let cellToRemoveFlagPosition = getCellPosition(gridCellToRemoveFlag);
            let cellToAddFlagPosition = getCellPosition(gridCellToAddFlag);
            if (cellToAddFlagPosition || cellToRemoveFlagPosition) {
                if (cellToAddFlagPosition?.x === cellToRemoveFlagPosition?.x
                    && cellToAddFlagPosition?.y === cellToRemoveFlagPosition?.y) {
                    if (parentElement) {
                        parentElement.appendChild(targetFlag);
                        targetFlag.style.position = prevPosition || 'relative';
                        targetFlag.style.zIndex = prevZIndex || 'initial';
                        targetFlag.style.top = prevTop || '-32px';
                        targetFlag.style.left = prevLeft || '-2px';
                    }
                    return;
                }

                dispatch({
                    type: ActionTypes.dragNDroppedFlag,
                    payload: {
                        cellToAddFlag: cellToAddFlagPosition,
                        cellToRemoveFlag: cellToRemoveFlagPosition
                    }
                })
            }
        }
    };
}

export function dragNDrop(dispatch: Dispatch<any>) {
    let draggableFlag = document.getElementById("draggable_flag");
    if (draggableFlag) {
        draggableFlag.ondragstart = () => false;
        draggableFlag.onmousedown = (event: MouseEvent) => {
            if (draggableFlag) {
                const clonedFlag = draggableFlag.cloneNode(true) as HTMLElement;
                clonedFlag.id = "clonedFlag";
                document.body.appendChild(clonedFlag);
                clonedFlag.ondragstart = () => false;

                clonedFlag.style.position = 'absolute';
                clonedFlag.style.zIndex = '1000';

                moveFlagAt(event.pageX, event.pageY, clonedFlag);

                const onMouseMove = (event: MouseEvent) => {
                    moveFlagAt(event.pageX, event.pageY, clonedFlag);
                }

                document.addEventListener('mousemove', onMouseMove);

                clonedFlag.onmouseup = (event: MouseEvent) => {
                    document.removeEventListener('mousemove', onMouseMove);
                    if (clonedFlag) {
                        document.body.removeChild(clonedFlag);
                    }

                    let closestCellDiv = getClosest(document.elementFromPoint(event.pageX, event.pageY), ".gridCell");
                    let cellPosition = getCellPosition(closestCellDiv);
                    if (cellPosition) {
                        dispatch({type: ActionTypes.dragNDroppedFlag, payload: {cellToAddFlag: cellPosition}})
                    }
                }
            }
        }
    }
}

function getCellPosition(element: Element | null): CellPosition | null {
    if (element) {
        let gridCellId = element.id;
        const x = gridCellId.substr(0, gridCellId.indexOf('_'));
        const y = gridCellId.substr(gridCellId.indexOf('_') + 1);
        if (x && y) {
            return {x: +x, y: +y};
        } else {
            return null;
        }
    }
    return null;
}

// move our absolutely positioned flag under the pointer
function moveFlagAt(x: number, y: number, element: HTMLElement) {
    if (element) {
        element.style.left = x - element.offsetWidth / 2 + 'px';
        element.style.top = y - element.offsetHeight / 2 + 'px';
    }
}

const getClosest = (elementFromPoint: Element | null, selector: string): Element | null => {
    while (elementFromPoint != null) {
        if (elementFromPoint.matches(selector)) {
            return elementFromPoint;
        }
        if (elementFromPoint.parentElement != null) {
            elementFromPoint = elementFromPoint.parentElement;
        } else {
            return null;
        }
    }
    return null;
};