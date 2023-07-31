import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'util/LogiUtil/MyGrid';
function EducationInfo(props) {
    const { empDetailFullList } = useSelector(state => state.hr.affair);
    if (empDetailFullList[0] !== undefined) {
        
    }

    const column = {
        columnDefs: [
            { headerName: '사원코드', field: 'empCode' },
            { headerName: '일련번호', field: 'educationCode' },
            { headerName: '학교명', field: 'schoolName' },
            { headerName: '전공', field: 'major' },
            { headerName: '입학일', field: 'entranceDate' },
            { headerName: '졸업일', field: 'graduateDate' }, // editable : 편집가능
            { headerName: '학점', field: 'grade' }
        ]
    };
   
    return (
        <>
                        
            <MyGrid
                column={column}
                list={
                    empDetailFullList[0] !== undefined ? empDetailFullList[0].educationInfoList : ''
                }
                title={'학 력 정 보 조 회'}
            >
                            
            </MyGrid>
                    
        </>
    );
}
export default EducationInfo;
