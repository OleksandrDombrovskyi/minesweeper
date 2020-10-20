import React from 'react';
import './App.css';
import {Header} from "./components/header/header.component";
import {Body} from "./components/body/body.component";
import {isMobileDevice} from "./utils/detectmobilebrowser";
import {BottomPanel} from "./components/bottom-panel/bottom-panel.component";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Body/>
            {
                isMobileDevice() && <BottomPanel/>
            }
        </div>
    );
}