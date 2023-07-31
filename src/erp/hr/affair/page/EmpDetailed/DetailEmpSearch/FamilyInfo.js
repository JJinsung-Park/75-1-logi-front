import React from 'react';
import { useSelector } from 'react-redux';
import MyGrid from 'util/LogiUtil/MyGrid';
function FamilyInfo(props) {
    const { empDetailFullList } = useSelector(state => state.hr.affair);
    if (empDetailFullList[0] !== undefined) {
        
    }
    const column = {
        columnDefs: [
            { headerName: '사원코드', field: 'empCode' },
            { headerName: '일련번호', field: 'familyCode' },
            { headerName: '가족명', field: 'familyName' },
            { headerName: '관계', field: 'relation' },
            { headerName: '생년월일', field: 'birthdate' },
            { headerName: '동거여부', field: 'liveTogether' } // editable : 편집가능
        ]
    };
    
    return (
        <>
                        
            <MyGrid
                column={column}
                list={empDetailFullList[0] !== undefined ? empDetailFullList[0].familyInfoList : ''}
                title={'가 족 정 보 조 회'}
            >
                            
            </MyGrid>
                    
        </>
    );
}
export default FamilyInfo;
