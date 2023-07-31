//************************* 2020-11-26 전기분재무상태표 시작 최지은&노원찬 *************************
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, makeStyles, Modal, TextField} from "@mui/material";
import { SELECT_PREVIOUS_STATUS_REQUEST } from "../../reducer/StatementReducer";
import {useTheme} from "@mui/material/styles";
import * as types from "../../reducer/StatementReducer";
import {DataGrid} from "@mui/x-data-grid";

const PreviousFinalcialStatementMenu = () => {

    const list = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.periodNoList);

    const theme = useTheme();
    const dispatch = useDispatch();
    const [open , setOpen] = useState(false);
    const callResult = 'SEARCH';

    const periodListData = () => {
        setOpen(true);
        dispatch({
            type: types.SEARCH_PERIOD_NO_REQUEST
        });
    };

    //조회버튼
    const SearchClick = (e) => {
        setOpen(false);
        dispatch({
            type: SELECT_PREVIOUS_STATUS_REQUEST,
            params: {
                accountPeriodNo: e.id, //2
                callResult: callResult //SEARCH
            },
        });
    };

    const financialColumns = [
        {
            headerName: '회계 기수',
            field: 'accountPeriodNo',
            width: 250
        },
        {
            headerName: '회계 시작일',
            field: 'periodStartDate',
            width: 250
        },
        { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
    ];

    return (
        <>
            <div align="center">
                <div>
                    <Button
                        variant="contained" color="secondary"
                        onClick={periodListData}
                        startIcon={<SearchIcon />}>
                        회계 기수 조회
                    </Button>
                    <Modal open={open}>
                        <div align="center">
                            <div
                                align="center"
                                className="ag-theme-balham"
                                style={{
                                    width:"50%",
                                    height:500,
                                    background : "white"
                                }}
                            >
                                <DataGrid
                                    rows={list}
                                    columns={financialColumns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    getRowId={(row) => row.accountPeriodNo}
                                    onRowClick={SearchClick}
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};


export default PreviousFinalcialStatementMenu;
