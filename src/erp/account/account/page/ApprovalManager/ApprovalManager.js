import React, {useEffect, useState} from "react";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../reducer/AccountReducer";

// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallMissedIcon from '@mui/icons-material/CallMissed';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import {gridSpacing} from '../../../../../template/store/constant';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";




const ApprovalManager = () => {

    //데이터 뽑아오기
    const slipData = useSelector( state  => state.RootReducers.AccReducer.AccountReducer.approvalSlipList);
    const journalData = useSelector( state  => state.RootReducers.AccReducer.AccountReducer.approvalJournalList);

    //날짜 세팅
    const theme = useTheme();
    let year = moment(new Date()).format("yyyy");
    let month = moment(new Date()).format("MM");
    //let date = moment(new Date()).format("DD");
    const today = year + "-" + month + "-" + new Date().getDate()
    const monthFirst = year + '-' + month + '-01'
    const yearFirst = year + '-01-01'
    const yearLast = year + '-12-31'

    //useState
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(monthFirst);
    const [endDate, setEndDate] = useState(today);
    const [slipStatus] = useState("미결");
    const [positionGridApi, setPositionGridApi] = useState();
    const [slipNo, setSlipNo] = useState('');


    const approvalSearchData = () => {
        dispatch({
            type: types.SEARCH_AM_SLIP_REQUEST,
            params: {
                startDate: moment(startDate).format("yyyy-MM-DD"),
                endDate: moment(endDate).format("yyyy-MM-DD"),
                slipStatus: slipStatus,
            },
        });
    };

    const thisYear = () => {
        setStartDate(yearFirst)
        setEndDate(yearLast)
    };

    //========================== 분개조회 ==========================
    useEffect(() => {
        if (slipNo === "" || slipNo === "NEW") return;
        dispatch({
            type: types.SEARCH_AM_JOURNAL_REQUEST,
            params: { slipNo: slipData.slipNo },
        });
    }, [slipNo]); // SlipGrid 컴포넌트에서 보낸 slipNo 가 바뀔 때마다, slipNo 를 파라미터로 분개 List를 가져와라. setData 해라.


    //========================== 그리드초기화 ==========================
    const initalBtn = () => {
        positionGridApi.selectAll(); // 그리드에 뿌려진 모든 데이터를 선택해라.
        const allData = positionGridApi.getSelectedRows(); // 선택된 데이터를 담아라.
        positionGridApi.updateRowData({ remove: allData }); // 그리드에서 제거해라
    };

    //========================== 전표승인 ===============================
    const approvalBtn = async () => {
        let selectedData = positionGridApi.getSelectedRows();
        let approvalData = selectedData.map(cv => {
            cv.slipStatus = "승인"; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
            cv.approvalDate = moment(new Date()).format("yyyy-MM-DD");
            cv.approvalEmpCode = sessionStorage.getItem("empCodeInfo_token");
            cv.approvalEmpName = sessionStorage.getItem("empNameInfo_token");
            return cv;
        });
        dispatch({
            type: types.UPDATE_AM_SLIP_REQUEST,
            params: { approvalData: approvalData },
        });
        alert(` ${approvalData.length} 건 의 전표가 승인이 되었습니다. `);
        positionGridApi.updateRowData({ remove: selectedData });
    };
    //========================== 전표반려 ===============================
    const companionBtn = async () => {
        let selectedData = positionGridApi.getSelectedRows();
        let companionData = selectedData.map(cv => {
            cv.slipStatus = "반려"; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
            cv.companionDate = moment(new Date()).format("yyyy-MM-DD");
            cv.companionEmpCode = sessionStorage.getItem("empCodeInfo_token");
            cv.companionEmpName = sessionStorage.getItem("empNameInfo_token");
            return cv;
        });
        dispatch({
            type: types.UPDATE_AM_SLIP_REQUEST,
            params: { approvalData: companionData },
        });
        alert(` ${companionData.length} 건 의 전표가 승인이 되었습니다. `);
        positionGridApi.updateRowData({ remove: selectedData });
    };
    //========================== 전표그리드 row를 눌렀을 때, 이벤트 ==========================
    const slipChange = () => {
        const rowData = positionGridApi.getSelectedRows(); // 선택된 row 정보
        setSlipNo(rowData[0].slipNo); // row 정보의 slipNo를 세팅해라. JournalGrid 컴포넌트로 보내기 위함.
    };

    const onGridReady = params => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
    }; // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.


    //전표 그리드 세팅
    const slipColumnDefs = [
        { headerName: "", field: "check", width: 50, checkboxSelection: true }, // checkboxSelection : 체크박스 추가함
        { headerName: "전표일련번호", field: "slipNo", width: 150 },
        { headerName: "기수일련번호", field: "accountPeriodNo", width: 100 },
        { headerName: "전표유형", field: "slipType", width: 100 },
        { headerName: "작성날짜", field: "reportingDate", width: 100 },
        { headerName: "작성자명", field: "reportingEmpName", width: 100 },
        {
            headerName: "작성자코드",
            field: "reportingEmpCode",
            width: 100,
            hide: true,
        },
        {
            headerName: "품의내역",
            field: "expenseReport",
            width: 180,
            editable: true,
        }, // editable : 편집가능
        { headerName: "승인날짜", field: "approvalDate", width: 100 },
        { headerName: "승인자", field: "approvalEmpCode", width: 100 },
        { headerName: "승인상태", field: "slipStatus", width: 80 },
        { headerName: "부서코드", field: "deptCode", hide: true },
        { headerName: "status", field: "status", hide: true },
    ];

    //분개 그리드 세팅
    const journalColumnDefs = [
        { headerName: "", field: "check", width: 50, checkboxSelection: true },
        { headerName: "분개일련번호", field: "journalNo", width: 230 },
        { headerName: "계정코드", field: "accountCode", width: 100 },
        { headerName: "계정명", field: "accountName", width: 130 },
        { headerName: "대차구분", field: "balanceDivision", width: 100 },
        { headerName: "적요", field: "summaryComment", width: 230 },
        { headerName: "거래처코드", field: "customerCode", width: 110 },
        { headerName: "거래처명", field: "customerName", width: 110 },
        {
            headerName: "금액",
            field: "price",
            width: 110,
        },
        // valueFormatter : 그리드의 표시형식.
        { headerName: "전표번호", field: "slipNo", width: 110, hide: true },
        { headerName: "차변", field: "leftDebtorPrice", width: 110, hide: true },
        { headerName: "대변", field: "rightCreditsPrice", width: 110, hide: true },
        { headerName: "적요번호", field: "summaryNumber", width: 110, hide: true },
    ];

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <div Align="center">
                        <Typography variant="h3">[ 검색조건 ]</Typography>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                    }}
                                    inputFormat={"yyyy-MM-dd"}
                                    mask={"____-__-__"}
                                    renderInput={(params) => <TextField {...params} variant="standard"
                                                                        sx={{mb: 1, mx: 1, width: 120}} size={"small"}/>}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => {
                                        setEndDate(newValue);
                                    }}
                                    inputFormat={"yyyy-MM-dd"}
                                    mask={"____-__-__"}
                                    renderInput={(params) =>
                                        <TextField {...params} variant="standard" sx={{mb: 1, mx: 1, width: 120}}
                                                   size={"small"}/>}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" color="secondary" startIcon={<CalendarMonthIcon/>}
                                    sx={{mt: "5px", mx: 1, mb: "10px"}} onClick={thisYear}
                            >
                                올해
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<SearchIcon/>} onClick={approvalSearchData}
                                    sx={{mt: "5px", mx: 1, mb: "10px"}} >
                                조회
                            </Button>
                        </div>
                    </div>
                    <MainCard
                        content={false}
                        title="전표"
                        sx={{
                            '&MuiCard-root': {color: theme.palette.text.primary}
                        }}
                        secondary={
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={approvalBtn} startIcon={<ApprovalIcon/>}>전표승인</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={companionBtn} startIcon={<CallMissedIcon/>}>반려</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={initalBtn} startIcon={<RefreshIcon/>}>초기화</Button>
                                </Grid>
                            </Grid>
                        }
                    >
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 300,
                                width: '100%',
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                    '& .MuiDataGrid-cell': {
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnsContainer': {
                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    }
                                }
                            }}
                        >
                            <DataGrid
                                hideFooter
                                rows={slipData}
                                columns={slipColumnDefs}
                                onCellClicked={slipChange}
                                rowSelection="multiple" // 그리드 여러개 선택가능
                                onGridReady={onGridReady}
                            />
                        </Box>
                    </MainCard>
                    <MainCard
                        content={false}
                        title="분개"
                    >
                        {/* table data grid */}
                        <Box
                            sx={{
                                height: 300,
                                width: '100%',
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                    '& .MuiDataGrid-cell': {
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnsContainer': {
                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                                    }
                                }
                            }}
                        >
                            <DataGrid hideFooter rows={journalData} columns={journalColumnDefs}/>
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
}

export default ApprovalManager;
