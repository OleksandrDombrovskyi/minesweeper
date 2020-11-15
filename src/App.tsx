import React from 'react';
import './App.css';
import {Header} from "./components/header/header.component";
import {Body} from "./components/body/body.component";
import {isMobileDevice} from "./utils/detectmobilebrowser";
import {BottomPanel} from "./components/bottom-panel/bottom-panel.component";
import {DrawerMenu} from "./components/menu-drawer/menu.component";
import {LevelDialog} from "./components/level-dialog/level-dialog.component";

export const App = () => {
    return (
        <div className="App">
            <DrawerMenu/>
            <Header/>
            <Body/>
            {
                isMobileDevice() && <BottomPanel/>
            }

            <LevelDialog/>
        </div>
    );
}