import {Dispatch} from "react";
import {ActionTypes} from "../actions/actions";

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

                // move our absolutely positioned flag under the pointer
                const moveFlagAt = (x: number, y: number) => {
                    if (clonedFlag) {
                        clonedFlag.style.left = x - clonedFlag.offsetWidth / 2 + 'px';
                        clonedFlag.style.top = y - clonedFlag.offsetHeight / 2 + 'px';
                    }
                }
                moveFlagAt(event.pageX, event.pageY);

                const onMouseMove = (event: MouseEvent) => {
                    moveFlagAt(event.pageX, event.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                clonedFlag.onmouseup = (event: MouseEvent) => {
                    document.removeEventListener('mousemove', onMouseMove);
                    if (clonedFlag) {
                        document.body.removeChild(clonedFlag);
                    }

                    console.log("Start")
                    const getClosest = (elementFromPoint: Element | null, selector: string): Element | null => {
                        while (elementFromPoint != null) {
                            if (elementFromPoint.matches(selector)) {
                                console.log(elementFromPoint)
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

                    let closestCellDiv = getClosest(document.elementFromPoint(event.pageX, event.pageY), ".gridCell");
                    if (closestCellDiv) {
                        const cellId = closestCellDiv.id;
                        const x = cellId.substr(0, cellId.indexOf('_'));
                        const y = cellId.substr(cellId.indexOf('_') + 1);
                        if (x && y) {
                            dispatch({type: ActionTypes.dragNDroppedFlag, payload: {x: x, y: y}})
                        }
                    }
                }
            }
        }
    }
}
