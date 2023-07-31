import { Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import WorkSiteSearch from './WorkSiteSearch';
import Swal from 'sweetalert2';
import {Grid} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function WorkSiteProcess(props) {
    const [list, setList] = useState([]);
    const [clickedData, setClickedData] = useState();
    const [selWorkSite, setSelWorkSite] = useState();
    const [detailList, setDetailList] = useState([]);
    const [size, setSize] = useState('50vh');

    const column = {
        columnDefs: [
            { checkboxSelection: true, width: 30 },
            { headerName: '작업지시일련번호', field: 'workOrderNo', width: 250 },
            { headerName: '소요량취합번호', field: 'mrpGatheringNo', width: 250 },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrp' },
            { headerName: '생산공정코드', field: 'productionProcessCode', hide: true },
            { headerName: '생산공정명', field: 'productionProcessName' },
            { headerName: '작업장코드', field: 'workSiteCode', hide: true },
            { headerName: '작업장명', field: 'workStieName' },
            { headerName: '원재료검사', field: 'inspectionStatus' },
            { headerName: '제품제작', field: 'productionStatus' },
            { headerName: '제품검사', field: 'completionStatus' }
        ]
    };

    const onRowSelected = params => {
        if (params.node.selected) {
  
            setClickedData(params.data);
        } else if (!params.node.selected) {
          
            setClickedData();
        }
    };
    const errorMsg = val => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: val
        });
    };
    const examination = e => {
        var targetId = e.currentTarget.id;
  
        if (clickedData === undefined || clickedData === null) {
            errorMsg('체크 박스를 체크 한뒤 눌러주세요');
            return;
        }
        if (
            clickedData.inspectionStatus == 'Y' &&
            clickedData.productionStatus == 'Y' &&
            clickedData.completionStatus == 'Y'
        ) {
            errorMsg('모든 작업이 끝났습니다.<br>작업완료 등록을 해주세요');
            return;
        } else if (
            clickedData.inspectionStatus == 'Y' &&
            clickedData.productionStatus == 'Y' &&
            targetId == 'Production'
        ) {
            errorMsg('제품 제작은 끝났습니다.<br>판매제품 검사로 넘어가세요');
            return;
        } else if (clickedData.inspectionStatus == 'Y' && targetId == 'RawMaterials') {
            errorMsg('원재료 검사는 끝났습니다.<br>제품제작으로 넘어가세요');
            return;
        }

        if (clickedData.productionStatus != 'Y' && targetId == 'SiteExamine') {
            errorMsg('제품이 제작되지 않았습니다.제품제작 을 해주세요.');
            return;
        } else if (clickedData.inspectionStatus != 'Y' && targetId == 'Production') {
            errorMsg('원재료 검사가 시작되거나 끝나지 않았습니다.');
            return;
        }
        showWorkSite(targetId);
    };
    const showWorkSite = params => {

        setSelWorkSite(clickedData.workOrderNo);
        Axios.get('http://localhost:9102/quality/worksite/situation', {
            params: {
                workSiteCourse: params,
                workOrderNo: clickedData.workOrderNo,
                itemClassIfication: clickedData.itemClassification
            }
        }).then(({data}) => {

            setDetailList(data.gridRowJson);
        }).catch(e => {

            });
        setSize('30vh');
    };

    const detailClose = () => {
        setSize('50vh');
        setSelWorkSite();
    };

    const workSiteSearch = () => {
        Axios.get('http://localhost:9102/quality/workorder/list')
            .then(({data}) => {
 
                setList(data.gridRowJson);
            }).catch(e => {
       
            });
    };
    return (
        <>
            <MainCard
                content={false}
                title="작업장"
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <ButtonGroup variant="contained" color="secondary">
                        <Button onClick={workSiteSearch}>
                            작업장 조회
                        </Button>
                        <Button onClick={examination} id="Production">
                            제품 제작
                        </Button>
                        <Button onClick={examination} id="SiteExamine">
                            판매 제품 검사
                        </Button>
                    </ButtonGroup>
                </Grid>
                }
            >
                <MyGrid
                    column={column}
                    list={list}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                >

                </MyGrid>
                {selWorkSite === undefined ? (
                    ''
                ) : (
                    <WorkSiteSearch
                        list={detailList}
                        detailClose={detailClose}
                        refresh={workSiteSearch}
                    />
                )}
            </MainCard>
        </>
    );
}

export default WorkSiteProcess;
