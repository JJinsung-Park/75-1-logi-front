//2020-12-03 64기 정준혁
import React, { useState, useCallback, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import stockListColumn from './stockListColumn';
import MyCalendar from 'erp/hr/util/MyCalendar';
import { setSearchStockListAxios } from './stockAxios';
import ShowOrderDialog from './ShowOrderDialog';
import MainCard from 'template/ui-component/cards/MainCard';
// // material-ui
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Modal,
    Typography
} from '@mui/material';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import axios from 'axios';
import showOrderDialog from './ShowOrderDialog';
import StockChart from "./stockChart";
import MyDialog from "../../../../../util/LogiUtil/MyDialog";

const StockInfoContainer = () => {

    const [searchStockList, setSearchStockList] = useState([]);
    const [stockModal, setStockModal] = useState(false);
    const [value, setValue] = React.useState(dayjs());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(9);
    const [showOrderDialog, setShowOrderDialog] = useState(false);

    const columns = [
        { id: "warehouseCode", label: "창고코드", minWidth: 100 },
        { id: "itemCode", label: "품목코드", minWidth: 100 },
        { id: "itemName", label: "품목명", minWidth: 100 },
        { id: "unitOfStock", label: "단위", minWidth: 100 },
        { id: "safetyAllowanceAmount", label: "안전재고량", minWidth: 100 },
        { id: "stockAmount", label: "재고량", minWidth: 100 },
        { id: "orderAmount", label: "입고예정재고량", minWidth: 100 },
        { id: "inputAmount", label: "투입예정재고량", minWidth: 100 },
        { id: "deliveryAmount", label: "납품예정재고량", minWidth: 100 },
    ];

    useEffect(() => {
        axios
            .get('http://localhost:9102/stock/sto/list')
            .then(response => {
                setSearchStockList(response.data.gridRowJson);
               
            })
            .catch(e => {
           
            });
        return () => {
            setSearchStockList([]);
        };
    }, []);

    const showClose = () => {
        setShowOrderDialog(false);
    };
    const onClickOptionOrderOpen = useCallback(() => {
        setShowOrderDialog(true);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    return (
        <>
            <MainCard
                content={false}
                title="재고 관리"
                secondary={
                    <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid spacing={2}>
                                <DatePicker
                                    views={['day']}
                                    label="입고 날짜"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                                <Button 
                                variant="contained" 
                                type="button" 
                                onClick={onClickOptionOrderOpen}
                                style={{ marginLeft: '1vh' }}
                                color="secondary"
                                >
                                    입고
                                </Button>
                            </Grid>
                        </LocalizationProvider>
                    </>
                }
            >
                <TableContainer sx={{ maxHeight: 2000 }}>
                    <Table stickyHeader aria-label="재고">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {searchStockList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((searchStockList) => (
                                <TableRow sx={{py: 3}} hover role="checkbox" tabIndex={-1} key={searchStockList.code}>
                                    {columns.map((column) => {
                                        const value = searchStockList[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                            >
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[9, 20]}
                    component="div"
                    count={searchStockList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Typography variant="body2">
                    <StockChart />
                </Typography>
            </MainCard>
            <MyDialog open={showOrderDialog} close={showClose} maxWidth={'150%'}>
                <div>
                    <ShowOrderDialog close={showClose} />
                </div>
            </MyDialog>
        </>
    );
};
export default StockInfoContainer;