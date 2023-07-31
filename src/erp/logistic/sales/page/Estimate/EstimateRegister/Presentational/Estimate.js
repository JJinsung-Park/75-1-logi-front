import { Typography, AppBar, Toolbar, TextField} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import MyDialog from 'util/LogiUtil/SimpleModal';
import CustomerDialog from './CustomerDialog';
import moment from 'moment';
import Axios from 'axios';
import React, { useState } from 'react';
import { Today } from '@material-ui/icons';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MainCard from "template/ui-component/cards/MainCard";
import { Button, Grid } from '@mui/material';

const Estimate = ({
    onChangeDate,
    addEstimateRow,
    saveEstimateRow,
    columnDefsEstimate,
    onGridReady,
    handleOpenDialog,
    components,
    rowData
}) => {
    const today = moment().format('YYYY-MM-DD');
    const { dark } = useThemeSwitcher();

    return (
        
            <MainCard
                content={false}
                title="견적등록"
                secondary={<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <div align="right">
                        <TextField
                            id="targetDate"
                            label="견적일자"
                            onChange={onChangeDate}
                            type={'date'}
                            defaultValue={today}
                        />
                        <Button onClick={addEstimateRow} variant="contained" color="secondary">
                            견적추가
                        </Button>
                        <Button onClick={saveEstimateRow} variant="contained" color="secondary">
                            일괄저장
                        </Button>
                    </div>
            </Grid>
                }>

            
            
            <div
                className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                align="center"
                skipHeaderOnAutoSize="true" //헤더 자동 크기조정
                enableColResize="true" //열크기 조정기능
                enableSorting="true" //열 정렬기능
                enableFilter="true" //열 필터링
                enableRangeSelection="true" // 셀 범위선택 기능
                rowStyle={{ 'text-align': 'center' }}
                cellStyle={{ textAlign: 'center' }}
                style={{ height: 250, width: '100%', float: 'center' }}
            >
                <AgGridReact
                    columnDefs={columnDefsEstimate}
                    defaultColDef={{ //그리드 기본 열 정의
                        resizable: true, // 열의 크기 조절 가능
                        editable: true // 셀 편집 가능하게
                    }}
                    onGridSizeChanged={event => {
                        event.api.sizeColumnsToFit(); //그리드 크기가 변경되면 함수 호출하여 모든 열이 자동으로 크기에 맞게 수정
                      }}
                    rowSelection="single" //행 선택시 단일행 선택
                    onGridReady={onGridReady} // 그리드가 준비되면 실행되는 함수
                    onCellClicked={handleOpenDialog} // 셀 클릭시 실행되는 함수
                    components={components} // 그리드에서 사용될 컴포넌트 설정
                    rowData={rowData} // 그리드 데이터 설정
                    style={{
                        height: '400%',
                        width: '100%'
                    }}
                />
            </div>
                </MainCard>
       
    );
};

export default Estimate;
