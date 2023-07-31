import React, {useEffect, useState} from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import {TextField} from '@material-ui/core';
import axios from 'axios';
import MyDialog from 'util/LogiUtil/SimpleModal';
import MainCard from "../../../../template/ui-component/cards/MainCard";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import CardSecondaryAction from "../../../../template/ui-component/cards/CardSecondaryAction";
import {DataGrid, GridEventListener} from "@mui/x-data-grid";
import SimpleModal from "util/LogiUtil/SimpleModal";

function CompanyInfo(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataList, setDataList] = useState([]);
    const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
    const [list, setList] = useState({});
    const [gridRow, setGridRow] = useState();

    const columns = [
        {id: 'companyCode', label: '회사코드', minWidth: 170, hide: true},
        {id: 'companyName', label: '회사명', minWidth: 100},
        {id: 'companyDivision', label: '회사구분', minWidth: 100},
        {id: 'businessLicenseNumber', label: '사업자등록번호', minWidth: 100},
        {id: 'corporationLicenseNumber', label: '법인등록번호', minWidth: 100},
        {id: 'companyCeoName', label: '대표자명', minWidth: 100},
    ];


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    const onCellClicked = (column) => {

        setOpenCompanyDialog(true);
        const sel = dataList.map(ele => {
            return ele;
        });
        setList(sel[0]);


    };

    const close = () => {
        setOpenCompanyDialog(false);
    };
    const api = params => {
        setGridRow(params.api);
    };

    const workplaceInfoValue = [
        {label:"업태", value:list.companyBusinessConditions},
        {label:"종목", value:list.companyBusinessItems},
        {label:"우편번호", value:list.companyZipCode},
        {label:"주소", value:list.companyBasicAddress + '      ' + list.companyDetailAddress},
        {label:"전화번호", value:list.companyTelNumber},
        {label:"홈페이지", value:list.homepage},
        {label:"설립년월", value:list.companyEstablishmentDate},
    ]


    useEffect(() => {
        axios
            .get('http://localhost:9102/compinfo/company/list'
            // .get('http://localhost:8282/compinfo/company/list',
            )
            .then(response => {
         
                setDataList(response.data.gridRowJson);
  
            })
            .catch(e => {
          
            });
            return () => {
            setDataList({});
        };
    }, []);
    return (

        // <>
        //     <MyGrid //UI에 그리드 아님
        //         column={column}
        //         title='회사 정보'
        //         list={dataList}
        //         onCellClicked={onCellClicked}
        //         rowSelection="single"
        //         api={api}
        //     ></MyGrid>
        //     <MyDialog open={openCompanyDialog} close={close} title={'회 사 정 보'}>
        //         <div>
        //             <TextField label="업태" value={list.companyBusinessConditions} />{' '}
        //             <TextField label="종목" value={list.companyBusinessItems} />
        //             <br />
        //             <TextField label="우편번호" value={list.companyZipCode} />
        //             <TextField
        //                 label="주소"
        //                 fullWidth
        //                 value={list.companyBasicAddress + '      ' + list.companyDetailAddress}
        //             />
        //             <br />
        //             <TextField label="전화번호" value={list.companyTelNumber} />{' '}
        //             <TextField label="홈페이지" value={list.homepage} />
        //             <TextField label="설립년월" value={list.companyEstablishmentDate} />
        //         </div>
        //     </MyDialog>
        // </>
        <>
            <MainCard
                content={false}
                title="회사 정보"
                secondary={<CardSecondaryAction link="https://next.material-ui.com/components/tables/"/>}
            >

                {/* table */}
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="회사 정보">
                        <TableHead>
                            <TableRow

                            >
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
                            {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dataList) => (
                                <TableRow sx={{py: 3}} hover role="checkbox" tabIndex={-1} key={dataList.code}>
                                    {columns.map((column) => {
                                        const value = dataList[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                onClick={e => onCellClicked(column)}
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


                <SimpleModal open={openCompanyDialog} close={close} title={'회사정보'} workplaceInfoValue={workplaceInfoValue}>
                    <div>
                    </div>
                </SimpleModal>


                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={dataList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>

        </>
    );
}

export default CompanyInfo;
