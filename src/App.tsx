import React from 'react';
import './App.css';
import {Header} from "./components/header.component";
import {Body} from "./components/body/body.component";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Body/>
        </div>
    );
}