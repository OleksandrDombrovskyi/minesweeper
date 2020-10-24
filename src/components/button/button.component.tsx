import React, {FunctionComponent, PropsWithChildren} from "react";
import './button.style.css';

export interface ButtonProps {
    isPressed: boolean;
    isFailed?: boolean;
    isOver?: boolean
}

export const Button: FunctionComponent<ButtonProps> = (props: PropsWithChildren<ButtonProps>) => {

    return (
        <div className="img-overlay-svg">
            <svg width="33" height="33">
                <rect className={getClassName(props)} width="30" height="30"/>
            </svg>
            {props.children}
        </div>
        )
};

function getClassName({isPressed, isFailed, isOver}: ButtonProps) {
    let isPressedClassName = isPressed ? "open" : "initial";
    let isFailedClassName = isFailed ? "failedCell" : "";
    let isOverClassName = !isPressed && isOver ? "over" : "";

    return isPressedClassName + " " + isFailedClassName + " " + isOverClassName;
}
