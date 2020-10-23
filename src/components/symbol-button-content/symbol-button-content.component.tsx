import React, {FunctionComponent} from "react";
import './symbol-button-content.style.css';

export interface NumberContentProps {
    symbol: number | string;
    fontSize: number;
}

export const SymbolButtonContent: FunctionComponent<NumberContentProps> = ({symbol, fontSize}) => {

    return (
        <span className={getClass(symbol)} style={{fontSize: fontSize + "pt"}}>{symbol}</span>
    )
}

function getClass(symbol: number | string) {
    if (symbol === "?") {
        return "question";
    } else {
        return "number_" + symbol;
    }
}
