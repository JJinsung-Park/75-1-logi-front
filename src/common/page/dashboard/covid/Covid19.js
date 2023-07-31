import React from 'react';
import Header from './Header';
import Contents from './Contents';
import './CovidStyle.css';

function covid19() {
    return (
        <div className="app">
            <Header />
            <Contents />
        </div>
    );
}

export default covid19;
