import React from 'react';

function Header() {
    return (
        <div>
            <header className="header">
                <h1>COVID-19</h1>
                <select>
                    <option>국내</option>
                    <option>세계</option>
                </select>
            </header>
        </div>
    );
}

export default Header;
