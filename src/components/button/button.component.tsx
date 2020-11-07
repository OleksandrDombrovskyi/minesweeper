import React, {FunctionComponent, PropsWithChildren} from "react";
import './button.style.css';

export interface ButtonProps {
    isPressed: boolean;
    isFailed?: boolean;
    isOver?: boolean;
    width?: number;
    height?: number;
    stroke?: number;
}

export const Button: FunctionComponent<ButtonProps> = (props: PropsWithChildren<ButtonProps>) => {
    const {
        width = 30,
        height = 30,
        stroke = 3,
        children
    } = props;

    return (
        <div className="button_container" style={{width, height}}>
            <svg width={width + stroke} height={width + stroke}>
                <rect className={getClassName(props)} width={width} height={height}/>
            </svg>
            <div className="content" style={{width, height}}>
                {children}
            </div>
        </div>
    )
};

function getClassName({isPressed, isFailed, isOver}: ButtonProps) {
    let isPressedClassName = isPressed ? "open" : "initial";
    let isFailedClassName = isFailed ? "failedCell" : "";
    let isOverClassName = !isPressed && isOver ? "over" : "";

    return isPressedClassName + " " + isFailedClassName + " " + isOverClassName;
}
