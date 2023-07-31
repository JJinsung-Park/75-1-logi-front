import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'util/LogiUtil/MyGrid';
function CareerInfo(props) {
    const { empDetailFullList } = useSelector(state => state.hr.affair);
    if (empDetailFullList[0] !== undefined) {
        
    }
    const list = empDetailFullList[0] !== undefined ? empDetailFullList[0].careerInfoList : '';
    if (empDetailFullList[0] !== undefined) {
        
    }
    const column = {
        columnDefs: [
            { headerName: '사원코드', field: 'empCode', hide: true },
            { headerName: '일련번호', field: 'careerCode' },
            { headerName: '회사명', field: 'companyName' },
            { headerName: '직종', field: 'occupation' },
            { headerName: '담당업무', field: 'assignmentTask' },
            { headerName: '입사일', field: 'exHiredate' }, // editable : 편집가능
            { headerName: '퇴사일', field: 'exRetirementDate' }
        ]
    };
    
    return (
        <>
                        
            <MyGrid
                column={column}
                list={empDetailFullList[0] !== undefined ? empDetailFullList[0].careerInfoList : ''}
                title={'경 력 정 보 조 회'}
            >
                            
            </MyGrid>
                    
        </>
    );
}
export default CareerInfo;
