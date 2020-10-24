import React from "react";
import './flags.style.css';
import {FlagImage} from "../flag/flag.component";

export const Flags = () => {

    return (
        <div id="drag_n_drop_flags_container_id" className="drag_n_drop_flags_container">
            <div className="drag_n_drop_flag_1">
                <FlagImage/>
            </div>
            <div className="drag_n_drop_flag_2">
                <FlagImage/>
            </div>
            <div className="drag_n_drop_flag_3">
                <FlagImage/>
            </div>
            <div className="drag_n_drop_flag_4">
                <FlagImage/>
            </div>
        </div>
    )
}