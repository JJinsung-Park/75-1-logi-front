import {Button, Grid, NativeSelect} from "@mui/material";
import Axios from 'axios';
import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MyGrid from 'util/LogiUtil/MyGrid';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function WorkOrderDialog(props) {
    const [list, setList] = useState([]);
    const [workpalce, setWorkplace] = useState([]);
    const [divisionCode, setDivisionCode] = useState([]);
    const [workPlaceCode, setWorkPlaceCode] = useState();
    const [productionProcessCode, setProductionProcessCode] = useState();


   
    const column = {
        columnDefs: [
            { headerName: '소요량취합번호', field: 'mrpGatheringNo' },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrp' },
            { headerName: '투입예정재고량', field: 'inputAmount' },
            { headerName: '재고소요/제품제작수량', field: 'requiredAmount' },
            { headerName: '재고량(재고소요이후)', field: 'stockAfterWork' },
            { headerName: '작업지시기한', field: 'orderDate' },
            { headerName: '작업완료기한', field: 'requiredDate' }
        ]
    };
    const forwardRegist = useCallback(params => {

        let bool = list.map(el => el.stockAfterWork).includes('재고부족');
        if(bool){
            props.close();
            return Swal.fire({
                icon: 'error',
                title: '재고부족',
                text: '재고를 확인하세요.'
            });
        }
        var result = window.confirm('현재 모의 전개된 결과를 작업하시겠습니까?');
        if (result) {
            Axios.get('http://localhost:8282/logi/outsourc/updateStock', {
                params: {
                    itemCode: props.data.data.itemCode,
                    mrpGatheringNo: props.data.data.mrpGatheringNo,
                    id: props.id,
                    seq: props.seq
                }
            })
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Wow...',
                        text: 'Something went success!'
                    });
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                });
                props.setList(null);
            props.close();
        }
    },[list, props]);

    function forwardOrderDialogButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <NativeSelect
                onChange={e => setWorkPlaceCode(e.target.value)}
                inputProps={{
                    name: 'searchSelect',
                    id: 'age-native-label-placeholder'
                }}
            >
                {workpalce.map((value, index) => {
                    return (
                        <option value={value.workplaceCode} key={index}>
                            {value.workplaceName}
                        </option>
                    );
                })}
            </NativeSelect>
            <NativeSelect
                onChange={e => {
                    setProductionProcessCode(e.target.value);
                }}
            >
                {divisionCode.map((value, inedx) => {
                    if (value.codeUseCheck !== 'N')
                        return (
                            <option value={value.detailCode} key={inedx}>
                                {value.detailCodeName}
                            </option>
                        );
                })}
            </NativeSelect>
            <Button variant="contained" color="secondary" onClick={forwardRegist}>
                현재 모의전개된 결과 작업지시
            </Button>
        </Grid>
    }

    useEffect(() => {


        Axios.get('http://localhost:8282/logi/outsourc/showReleaseDialog', {
            params: {
                mrpGatheringNo: props.data.data.mrpGatheringNo,
                id: props.id,
                seq: props.seq
            }
        })
            .then(response => {
                setList(response.data.result);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });

        //사업장
        Axios.get('http://localhost:8282/hr/basicInfo/searchWorkplace', {
            params: {
                companyCode: 'COM-01'
            }
        })
            .then(response => {
                setWorkplace(response.data.gridRowJson);
                setWorkPlaceCode(response.data.gridRowJson[0].workplaceCode);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });

        //생산공정코드
        Axios.get('http://localhost:8282/logi/base/codeList', {
            params: {
                divisionCode: 'PP'
            }
        })
            .then(response => {
                setDivisionCode(response.data.detailCodeList);
                setProductionProcessCode(response.data.detailCodeList[0].detailCode);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    
           
        }, []);




    return (
        <MainCard
            content={false}
            title="외주 자재 출고 모의전개"
            secondary={forwardOrderDialogButton()}
        >
        <MyGrid
            column={column}
            list={list}
            rowSelection="single">

        </MyGrid>
        </MainCard>
    );
}

export default WorkOrderDialog;