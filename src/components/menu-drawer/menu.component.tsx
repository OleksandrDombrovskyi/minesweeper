import React from "react";
import './menu.style.css';
import {ListItemIcon, ListItemText, MenuItem, Toolbar, Typography} from "@material-ui/core";
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';
import {ActionTypes} from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import Drawer from 'react-motion-drawer';
import {selectIsMenuOpened} from "../../reducers/game/game.selector";

export const DrawerMenu = () => {

    const dispatch = useDispatch();
    const isMenuOpened = useSelector(selectIsMenuOpened);

    return (
        <Drawer className="drawer-menu" open={isMenuOpened}
                onChange={(isOpened: boolean) =>
                    isOpened
                        ? dispatch({type: ActionTypes.openMenuAction})
                        : dispatch({type: ActionTypes.closeMenuAction})}
                overlayColor="rgba(0, 0, 0, 0.4)" width={250}>
            <Toolbar>
                <Typography variant="h6">
                    Menu
                </Typography>
                <CloseIcon
                    fontSize="large"
                    color="action"
                    style={{marginLeft: "auto", cursor: "pointer"}}
                    onClick={() => dispatch({type: ActionTypes.closeMenuAction})}/>
            </Toolbar>
            <MenuItem>
                <ListItemIcon>
                    <TuneIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Level" onClick={() => dispatch({type: ActionTypes.openLevelDialog})}/>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Settings"/>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <HelpIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Help"/>
            </MenuItem>
        </Drawer>
    )
}