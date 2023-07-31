import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useThemeSwitcher} from "mui-theme-switcher";

function MyGrid(props) {
    const list = props.list;
    let size = "calc(100vh - 220px)";
    let align = 'right'
    if (props.align !== undefined) {
        align = props.align
    }
    let marginTop = "";
    if (props.children !== undefined) {
        size = "calc(100vh - 260px)";
    }
    if (props.size !== undefined) {
        size = props.size;
    }
    const useStyles = makeStyles(theme => ({
        root  : {
            flexGrow: 1,
        },
        title : {
            flexGrow  : 1,
            marginLeft: "5vw",
            marginTop : "calc(6vh - 4vh)",
            height    : "8vh",
            fontSize  : "5vh",
        },
        btn   : {
            flexGrow    : 1,
            marginBottom: "1vh",
            marginTop   : "1vh",
        },
        appBar: {
            flexGrow: 1,
            width   : "100%",
            height  : "10vh",
        },
    }));

    const column = props.column;

    const onCellClicked = id => {
        if (props.onCellClicked !== undefined) props.onCellClicked(id);
    };
    const onRowClicked = id => {
        if (props.onRowClicked !== undefined) props.onRowClicked(id);
    };
    const onRowSelected = id => {
        if (props.onRowSelected !== undefined) props.onRowSelected(id);
    };
    const onGridReady = params => {
        params.api.sizeColumnsToFit();
        if (props.api !== undefined) props.api(params);
    };
    const onCellValueChanged = params => {
        if (props.onCellValueChanged !== undefined)
            props.onCellValueChanged(params);
    };

    const {dark} = useThemeSwitcher();

    const onGridSizeChanged = params => {
        let gridWidth = document.getElementById("grid-wrapper").offsetWidth;
        let columnsToShow = [];
        let columnsToHide = [];
        let totalColsWidth = 0;
        let allColumns = params.columnApi.getAllColumns();
        for (let i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();

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

    };

    const classes = useStyles();

    return (
        <div id="grid-wrapper" className={classes.root}>
            {
                props.title !== undefined ?  // props.title이 넘어오면 AppBar를 출력 함 -> 템플릿 모양 수정을 다 끝내면 AppBar 삭제
                    <AppBar position="static" className={classes.appBar}>
                        <Typography className={classes.title}>{props.title}</Typography>
                    </AppBar>
                    :
                    ""
            }
            <div align={align} className={classes.btn}>
                {props.children}
            </div>
            <div
                className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
                enableColResize="true" //칼럼 리사이즈 허용 여부
                enableSorting="true" //렬 옵션 허용 여부
                enableFilter="true" //필터 옵션 허용 여부
                style={{
                    height    : size,
                    width     : "100%",
                    paddingTop: "25px",
                    float     : "center",
                }}
            >
                <AgGridReact
                    columnDefs={column.columnDefs} //정의된 컬럼
                    rowData={list} //Reduce에서 받아온 데이터
                    rowSelection={props.rowSelection} //하나만 선택하거나 복수개를 선택할 수 있음
                    getRowStyle={function (param) {
                        return {"text-align": "center"};
                    }} //body 가운데 정렬
                    onCellClicked={onCellClicked} //셀 한번클릭
                    onGridReady={onGridReady} //onload 이벤트와 유사한 것
                    paginationAutoPageSize={true}
                    pagination={true}
                    onRowClicked={onRowClicked}
                    onRowSelected={onRowSelected}
                    components={props.components} //특정 컬럼에 컴포넌트 넣기 가능
                    onGridSizeChanged={onGridSizeChanged}
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
        </div>
    );
}

export default MyGrid;
