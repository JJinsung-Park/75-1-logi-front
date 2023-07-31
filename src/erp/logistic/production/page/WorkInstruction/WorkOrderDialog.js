import {Button, Grid, NativeSelect} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MyGrid from 'util/LogiUtil/MyGrid';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {map} from "lodash";

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
    const contractSearch = useCallback(params => {
        let bool = [].map(el => el.stockAfterWork).includes('재고부족');
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
            Axios.get('http://localhost:9102/quality/workorder/dialog', {
                params: {
                    mrpGatheringNo: props.data.mrpGatheringNo,
                    workPlaceCode: workPlaceCode,
                    productionProcessCode: productionProcessCode
                }
            })
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Wow...',
                        text: 'Something went success!'
                    });
                    setList(response.gridRowJson);
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
    },[list, productionProcessCode, props, workPlaceCode]);

    useEffect(() => {
        console.log("작업지시 useEffect 진입");
        Axios.get('http://localhost:9102/quality/workorder/dialog', {
            params: {
                mrpGatheringNo: props.data.mrpGatheringNo
            }
        })
            .then(({data}) => {
                console.log("data ====" + JSON.stringify(data));
                console.log("데이터가 Template에 오니?");
                setList(data.gridRowJson);
            }).catch(e => {
            Swal.fire('오류', e, 'error');
        });

        // //사업장
        // console.log("작업지시 useEffect 사업장 진입");
        // Axios.get('http://localhost:9101/hr/company/searchWorkplace', {
        //     params: {
        //         companyCode: 'COM-01'
        //     }
        // })
        //     .then(response => {
        //         setWorkplace(response.data.gridRowJson);
        //         setWorkPlaceCode(response.data.gridRowJson[0].workplaceCode);
        //     })
        //     .catch(e => {
        //         Swal.fire('오류', e, 'error');
        //     });
        //
        // //생산공정코드
        // Axios.get('http://localhost:9102/logi/base/codeList', {
        //     params: {
        //         divisionCode: 'PP'
        //     }
        // })
        //     .then(response => {
        //         setDivisionCode(response.data.detailCodeList);
        //         setProductionProcessCode(response.data.detailCodeList[0].detailCode);
        //     })
        //     .catch(e => {
        //         Swal.fire('오류', e, 'error');
        //     });
    }, []);

    return (
        <MainCard
            content={false}
            title="작업지시 시뮬레이션"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign:'right'}}>
                <Button variant="contained" color="secondary" onClick={contractSearch}>
                    현재 모의전개된 결과 작업지시
                </Button>
            </Grid>
            }
        >
            <MyGrid column={column} list={list} rowSelection="single">
                <NativeSelect
                    onChange={e => setWorkPlaceCode(e.target.value)}
                    inputProps={{
                        name: 'searchSelect',
                        id: 'age-native-label-placeholder'
                    }}
                >
                    {workpalce.map((value, inedx) => {
                        return (
                            <option value={value.workplaceCode} key={inedx}>
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

            </MyGrid>
        </MainCard>


    );
}

export default WorkOrderDialog;
