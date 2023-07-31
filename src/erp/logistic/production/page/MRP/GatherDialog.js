import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import GatheringColumn from './GatheringColumn';
import UseStyles from './UseStyles';
import { TextField, Button } from '@material-ui/core';
import useInput from 'util/useInput';
import Swal from 'sweetalert2';
import { today } from 'erp/hr/util/lib';

const GatherDialog = props => {
    const fromDate = useInput(today);
    const classes = UseStyles();
    const [gridApi, setGridApi] = useState([]);

    useEffect(() => {
        console.log(props.mrpNoData);

        props.searchGatherList({ mrpNoList: props.mrpNoData });
    }, []);

    const onClickGatherInsert = () => {
        props.GatherInsert({
            mrpGatheringRegisterDate: fromDate.value,
            batchList: props.GatherList,
            mrpNoAndItemCodeList: props.mrpNoAndItemCodelist
        });

        gridApi.selectAll();
        var selectedData = gridApi.getSelectedRows();

        console.log(selectedData);

        gridApi.updateRowData({ remove: selectedData });

        props.gridApi.setRowData(null);
    };
    const Grind = prams => {
        setGridApi(prams.api);
    };
    return (
        <>
            <MyGrid
                column={GatheringColumn}
                title={'MRP GATHERING SIMULATION'}
                list={props.GatherList}
                api={Grind}
            >
                <TextField
                    id={'fromDate'}
                    label={'소요량 취합등록일자'}
                    type={'date'}
                    defaultValue={fromDate.value}
                    onChange={fromDate.onChange}
                    className={classes.textField}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '1vh', marginTop: '2vh' }}
                    onClick={onClickGatherInsert}
                >
                    취합 결과 등록
                </Button>
            </MyGrid>
        </>
    );
};

export default GatherDialog;
