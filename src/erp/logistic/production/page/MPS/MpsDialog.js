import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import mpsListColumn from './mpsListColumn';
import { searchMpsInfo } from './mpsAxios';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
const MpsDialog = ({ calendarDate }) => {
    const [mpsList, setMpsList] = useState([]);
    useEffect(() => {
        searchMpsInfo(setMpsList, calendarDate);
    }, []);
    console.log("setMpsList2 = " + JSON.stringify(mpsList) );
    console.log("calendarDate = " + calendarDate.startDate);
    console.log("calendarDate = " + calendarDate.endDate);
    return (
        <>
            <MainCard title="주생산계획(MPS)">
                <MyGrid
                    column={mpsListColumn}
                    list={mpsList} />
            </MainCard>
        </>
    );
};

export default MpsDialog;
