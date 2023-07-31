import React, {useState, useEffect, useMemo} from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useTheme } from '@mui/material/styles';
import {
    searchWorkplaceList,
    addWorkplaceTO,
    delWorkplaceTO,
    saveWorkplace
} from 'erp/logistic/base/action/BasicInfoAction';
import MyDialog from 'util/LogiUtil/SimpleModal';
import AddWorkplace from 'erp/logistic/base/page/AddWorkplace';
import { useDispatch, useSelector } from 'react-redux';
import RootReducers from "../../../../root/RootReducer";
import MainCard from "../../../../template/ui-component/cards/MainCard";
import CardSecondaryAction from "../../../../template/ui-component/cards/CardSecondaryAction";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Grid, Checkbox
} from "@mui/material";
import SimpleModal from "../../../../util/LogiUtil/SimpleModal";
import {DataGrid, selectedGridRowsSelector} from "@mui/x-data-grid";
import Swal from "sweetalert2";

function WorkplaceInfo(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [gridRow, setGridRow] = useState();
    const [selected, setSelected] = React.useState([]);

    const close = () => {
        setAddOpenDialog(false);
    };
    const workplaceList = useSelector(state => state.RootReducers.logistic.basicinfo.workplaceList);
    const list = workplaceList.filter(list => list.status !== 'DELETE');
    const dispatch = useDispatch();

    const theme = useTheme();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    const columns = [
        // { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
        // {id: 'workplaceCode', label: '사업장 코드', minWidth: 170, hide: true},
        {id: 'workplaceName', label: '사업장', minWidth:100},
        {id: 'businessLicenseNumber', label: '사업장등록번호', minWidth: 100},
        {id: 'corporationLicenseNumber', label: '법인등록번호', minWidth: 100},
        {id: 'workplaceCeoName', label: '대표자', minWidth: 100},
        {id: 'workplaceBusinessConditions', label: '업태', minWidth: 100},
        {id: 'workplaceBusinessItems', label: '종목', minWidth: 100},
    ];

    const addClick = () => {
        setAddOpenDialog(true);

    };

    const delClick = () => {
        let newSelected = [];
        selected.map((selectedRow) => {
            if(selectedRow.status === 'INSERT')
                newSelected = newSelected.concat(selectedRow.status = 'DELETE');
            else newSelected = newSelected.concat(selectedRow.status = 'DELETE');
        })

        setSelected(newSelected)
        saveClick();
    };


    const saveClick = () => {
        dispatch(saveWorkplace(workplaceList));
        return Swal.fire({
            icon: 'success',
            title: '저장 되었습니다'
        });

    };

    const onSubmit = workplaceTo => {
        dispatch(addWorkplaceTO({ workplaceTo }));
        setAddOpenDialog(false);

    };


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);

        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        }else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
  
        setSelected(newSelected);
    }

    const isSelected = (workplaceCode) => selected.indexOf(workplaceCode) !== -1;

    useEffect(() => {
        dispatch(searchWorkplaceList());
    }, [dispatch]);

    // 여기는 리덕스를 활용해보자 !!
    return (
        <>
            {/*<MyGrid*/}
            {/*    //UI에 그리드 아님*/}
            {/*    column={column}*/}
            {/*    title={'사 업 장 조 회'}*/}
            {/*    list={list}*/}
            {/*    rowSelection="multiple"*/}
            {/*    api={api}*/}
            {/*>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        color="secondary"*/}
            {/*        style={{ marginRight: '1vh' }}*/}
            {/*        onClick={addClick}*/}
            {/*    >*/}
            {/*        사업장 추가*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        color="secondary"*/}
            {/*        style={{ marginRight: '1vh' }}*/}
            {/*        onClick={delClick}*/}
            {/*    >*/}
            {/*        삭제*/}
            {/*    </Button>*/}
            {/*    <Button variant="contained" color="secondary" onClick={saveClick}>*/}
            {/*        저장*/}
            {/*    </Button>*/}
            {/*</MyGrid>*/}
            <MainCard
                content={false}
                title="사업장 정보"
                secondary={<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={addClick}
                    >
                        사업장 추가
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={delClick}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={saveClick}
                    >
                        저장
                    </Button>
                </Grid> }
            >

                <TableContainer sx={{maxHeight: 1000}}>
                    <Table stickyHeader aria-label="사업장 정보">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        sx={{py: 3}}
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, index) => {
                                const isItemSelected = isSelected(list);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                <TableRow sx={{py: 3}}
                                          hover
                                          tabIndex={-1}
                                          onClick={(event) => handleClick(event, list)}
                                          key={list.code}
                                          selected={isItemSelected}
                                          role="checkbox"
                                          >
                                    {columns.map((column) => {
                                        const value = list[column.id];
                                        return (

                                            <TableCell
                                                id={labelId}
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            )}
                            )}
                        </TableBody>
                    </Table>


                </TableContainer>


                <SimpleModal open={addOpenDialog} close={close} title={'사업장 추가'}>
                        <div>
                            <AddWorkplace  close={close} onSubmit={onSubmit}/>
                        </div>
                </SimpleModal>

                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={workplaceList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </>
    );
}

export default WorkplaceInfo;
