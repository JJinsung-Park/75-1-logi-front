import React, { useState, useCallback, memo, useEffect } from 'react';
import { Paper, TextField, Button, Grid, AppBar, InputLabel, Typography, Toolbar, MenuItem, Select, FormControl, OutlinedInput, NativeSelect } from '@mui/material';
import axios from 'axios';
import UseStyles from './UseStyles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useInput from 'util/useInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import GatherColumn from './GatherColumn';
import { today } from 'erp/hr/util/lib';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MyDialog from 'util/LogiUtil/SimpleModal';
import GatherDialog from './GatherDialog';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

const MrpGather = props => {
    const columnDefs = GatherColumn;
    const [gatherDialog, setGatherDialog] = useState(false);
    const [mrpNoList, setMrpNoList] = useState([]);
    const [mrpNoAndItemCodelist, setmrpNoAndItemCodeList] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    // const classes = UseStyles();

    // useEffect(() => {
    //     const mrpGatheringStatusCondition = '';
    //
    //     props.searchGetMrpList({ mrpGatheringStatusCondition: mrpGatheringStatusCondition });
    //
    // }, []);

    const MrpGatherRegister = () => {
        const mrpNoData = [];
        const mrpNoAndItemCode = {};

        const size = props.MrpGetList.length;

        for (let mrpNumber = 0; mrpNumber < size; mrpNumber++) {
            console.log(props.MrpGetList[mrpNumber]);

            mrpNoData.push(props.MrpGetList[mrpNumber].mrpNo);
            console.log(
                props.MrpGetList[mrpNumber].mrpNo + '' + props.MrpGetList[mrpNumber].itemCode
            );
            mrpNoAndItemCode[props.MrpGetList[mrpNumber].mrpNo] =
                props.MrpGetList[mrpNumber].itemCode;
        }

        setMrpNoList(mrpNoData);
        setmrpNoAndItemCodeList(mrpNoAndItemCode);

        setGatherDialog(true);
    };
    const mrpClose = () => {
        setGatherDialog(false);
    };

    const { dark } = useThemeSwitcher();
    const onGridSizeChanged = params => {
        //var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
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
    return (
        <>
            <MainCard
                content={false}
                title="소요량취합"
            >

            </MainCard>
            <Grid item xs={12}>
                {/*<AppBar position="relative">*/}
                {/*    <Toolbar>*/}
                {/*        <Typography variant="h5">소요량취합</Typography>*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}
                {/*<br />*/}
                <div id="grid-wrapper">
                    {/*<FormControl variant="outlined" className={classes.searchTextField}></FormControl>*/}

                    <Button
                        variant='contained'
                        color='secondary'
                        name='confirm'
                        onClick={MrpGatherRegister}
                        // className={dark ? classes.whiteButton : classes.searchButton}
                    >
                        소요량 취합 결과 조회
                    </Button>
                </div>

                <br />
                <div
                    className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                    style={{
                        height: '400px',
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={props.MrpGetList}
                        onGridSizeChanged={onGridSizeChanged}
                        suppressRowClickSelection={'true'}
                        onGridReady={event => {
                            setGridApi(event.api);
                            event.api.sizeColumnsToFit();
                        }}
                        rowSelection="multiple" //여러개선택가능
                    />

                    <MyDialog open={gatherDialog} close={mrpClose} maxWidth={'90%'}>
                        <div>
                            <GatherDialog
                                mrpNoData={mrpNoList}
                                searchGatherList={props.searchGatherList}
                                GatherList={props.GatherList}
                                GatherInsert={props.GatherInsert}
                                mrpNoAndItemCodelist={mrpNoAndItemCodelist}
                                gridApi={gridApi}
                            />
                        </div>
                    </MyDialog>
                </div>
            </Grid>
        </>
    );
};
export default MrpGather;
