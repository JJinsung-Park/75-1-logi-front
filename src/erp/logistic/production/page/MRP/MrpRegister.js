import React, { useState, useCallback, memo, useEffect } from 'react';
import {
    Paper,
    TextField,
    Button,
    Grid,
    AppBar,
    InputLabel,
    Typography,
    Toolbar,
    MenuItem,
    Select,
    FormControl,
    OutlinedInput,
    NativeSelect
} from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {searchContractDetailInMpsAvailable, searchMpsInfoInMrp, searchMpsInfotoMrp} from '../MPS/mpsAxios';
import contractlistcolumn from '../MPS/contractListColumn';
import useInput from 'util/useInput';
import { today } from 'erp/hr/util/lib';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MrpDialog from './MrpDialog';
import Swal from 'sweetalert2';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import MyCalendar from "../../../../../util/LogiUtil/MyCalendar";
import {getDatePicker} from "../../../../hr/util/datePicker";
import contractListColumn from "../MPS/contractListColumn";
import MyDialog from "../../../../../util/LogiUtil/MyDialog";

const MrpRegister = props => {
    console.log(today);
    // const classes = UseStyles();
    const fromDate = useInput(today);
    const toDate = useInput(today);
    const [rowData, setRowData] = useState(null);
    const [checkData, setCheckData] = useState(null);
    const [mrpDialog, setMrpDialog] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [contractGridApi, setcontractGridApi] = useState();
    const [calendarDate, setCalendarDate] = useState({
        startDate: today,
        endDate: today
    });
    const [contractList, setContractList] = useState([]);

    const searchMps = useCallback(() => {
        searchMpsInfoInMrp(setContractList , calendarDate); // searchContractDetailInMpsAvailable -> searchMpsInfo
    },[calendarDate]);

    useEffect(()=>{
        setRowData(props.MrpList);
    },[props.MrpList])

    const mrpRegister = useCallback(() => {
        console.log(checkData);

        if (!checkData) {
            Swal.fire('알림', '모의전개할 mps를 선택하십시오.', 'info');
            return;
        }

        setMrpDialog(true);
    },[checkData]);

    const mrpClose = () => {
        setMrpDialog(false);
    };

    const onRowSelected = useCallback(e => {
        setCheckData(e.api.getSelectedRows());
        console.log(checkData);
    }, [checkData]);

    const { dark } = useThemeSwitcher();
    const onGridSizeChanged = params => {
        var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
        var columnsToShow = [];
        var columnsToHide = [];
        var totalColsWidth = 0;
        var allColumns = params.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            // console.log('totalColsWidth',totalColsWidth)
            if (column.colDef.hide === true) {
                //if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
                //}
            } else {
                columnsToShow.push(column.colId);
            }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
        params.api.sizeColumnsToFit();
        // console.log('columnsToHide',columnsToHide)
        //console.log('columnsToShow',columnsToShow)
    };

    const onGridReady = useCallback(event => {
        console.log("onGridReady");
        setGridApi(event.api);
        setRowData([]);
        event.api.sizeColumnsToFit();

    },[]);

    const onChangeDate = e => {
        let nextCalendarDate = { ...calendarDate };
        nextCalendarDate[e.target.id] = e.target.value;
        setCalendarDate(nextCalendarDate);
    };

    const orderGirdApi = params => {
        setcontractGridApi(params.api);
    };

    function setMrpgrid () {
        return(
            <Grid item xs={12}>
                <div id="grid-wrapper">
                    <MyCalendar onChangeDate={onChangeDate} />
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        // className={dark ? classes.whiteButton : classes.searchButton}
                        onClick={searchMps}
                    >
                        MPS조회
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        name={'confirm'}
                        onClick={mrpRegister}
                        // className={dark ? classes.whiteButton : classes.searchButton}
                    >
                        MRP모의전개
                    </Button>
                </div>


            </Grid>
        )
    }

    return (
        <>
            <MainCard
                content={false}
                title="MRP주생산계획"
                secondary={setMrpgrid()}
            >

                <MyGrid
                    column={contractlistcolumn}
                    list={contractList}
                    onCellClicked={undefined}
                    onRowSelected={onRowSelected}
                    onGridSizeChanged={onGridSizeChanged}
                    onGridReady={onGridReady}
                    rowSelection="single"
                    api={orderGirdApi}
                    components={{ datePicker: getDatePicker() }}
                />

                <MyDialog open={mrpDialog} close={mrpClose} maxWidth={'90%'}>
                    <div>
                        <MrpDialog
                            searchMrpList={props.searchMrpList}
                            checkData={checkData}
                            setCheckData={setCheckData}
                            MrpSimulatorList={props.MrpSimulatorList}
                            MrpRegisterList={props.MrpRegisterList}
                            mrpRegisterGridApi={gridApi}
                        />
                    </div>
                </MyDialog>

            </MainCard>

        </>
    );
};
export default MrpRegister;
