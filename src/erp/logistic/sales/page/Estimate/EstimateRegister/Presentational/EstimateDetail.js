import { Typography, AppBar, Toolbar, TextField} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import MyDialog from 'util/LogiUtil/SimpleModal';
import CustomerDialog from './CustomerDialog';
import moment from 'moment';
import Axios from 'axios';
import React, { useState } from 'react';
import { useThemeSwitcher } from 'mui-theme-switcher';
import { Button } from '@mui/material';

const EstimateDetail = ({
    handleAddEstimateDetailRow,
    columnDefsEstimateDetail,
    onGridReadyEstimateDetail,
    handleOpenDialog,
    frameworkComponents,
    components,
    rowData
}) => {
    const { dark } = useThemeSwitcher();

    return (
        <div>
            <div align="right">
                <Button onClick={handleAddEstimateDetailRow} variant="contained" color="secondary">
                    견적상세추가
                </Button>
            </div>
            <div
                className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                align="center"
                skipHeaderOnAutoSize="true" //테이블 헤더가 자동조절될때 스킵되도록
                enableColResize="true" // 열의 크기조정 허용
                enableSorting="true" // 열의 정렬기능 허용
                enableFilter="true" // 필터기능
                enableRangeSelection="true" //범위선택 가능
                rowStyle={{ 'text-align': 'center' }} //테이블 행의 스타일
                cellStyle={{ textAlign: 'center' }} // 테이블 셀의 스타일
                style={{ height: 250, width: '100%', float: 'center' }}
            >
                <AgGridReact
                    columnDefs={columnDefsEstimateDetail}
                    defaultColDef={{
                        resizable: true, // 열 크기조정
                        editable: true  // 해당 열의 셀편집가능
                    }}
                    onGridSizeChanged={event => {// 셀 크기 더블클릭하면 자동으로 데어터 다 보이게 맞춰주기?
                        event.api.sizeColumnsToFit();
                      }}
                    rowSelection="single"
                    onGridReady={onGridReadyEstimateDetail}
                    onCellClicked={handleOpenDialog}
                    frameworkComponents={frameworkComponents}
                    components={components}
                    rowData={rowData}
                    style={{
                        height: '400%',
                        width: '100%'
                    }}
                />
            </div>
        </div>
    );
};

export default EstimateDetail;
