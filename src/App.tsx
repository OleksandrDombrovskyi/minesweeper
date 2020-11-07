import React from 'react';
import './App.css';
import {Header} from "./components/header/header.component";
import {Body} from "./components/body/body.component";
import {isMobileDevice} from "./utils/detectmobilebrowser";
import {BottomPanel} from "./components/bottom-panel/bottom-panel.component";
// @ts-ignore
import Drawer from 'react-motion-drawer';

export const App = () => {
    return (
        <div className="App">
            <Drawer open={false} onChange={() => console.log("Changed!")}>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Settings</li>
                </ul>
            </Drawer>
            <Header/>
            <Body/>
            {
                isMobileDevice() && <BottomPanel/>
            }
        </div>
    );
}