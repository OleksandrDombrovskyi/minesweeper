import React, {useEffect} from "react";
import './flags.style.css';
import {useDispatch} from "react-redux";
import {dragNDrop} from "../../utils/dragNDropUtils";

export const Flags = () => {

    const dispatch = useDispatch();

    useEffect(() => dragNDrop(dispatch))

    return (
        <div id="drag_n_drop_flags_container_id" className="drag_n_drop_flags_container">
            <img className="drag_n_drop_flag_1" width="22" height="22" src="flag.png" alt="123"/>
            <img className="drag_n_drop_flag_2" width="22" height="22" src="flag.png" alt="123"/>
            <img className="drag_n_drop_flag_3" width="22" height="22" src="flag.png" alt="123"/>
            <img id="draggable_flag" className="drag_n_drop_flag_4" width="22" height="22" src="flag.png" alt="123"/>
        </div>
    )
}