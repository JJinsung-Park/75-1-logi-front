import React, { useState, useCallback } from 'react'
import MyGrid from '../MyGrid'
import HrAppBar from 'erp/hr/util/HrAppBar'
import axios from "axios";
const Node = () => {

    const [memberList, setMemberList] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [gridEvent, setGridEvent] = useState();


    const addOnClick = () => {
        gridEvent.updateRowData({ add: [{ id: '', pw: '', addr: '', tel: '' }] });
    }

    const onGridReady = event => {
        event.api.sizeColumnsToFit();
        setGridEvent(event.api);
    }
    //삭제
    const onRemove = () => {
        var selectedData = gridEvent.getSelectedRows();
        axios.delete(
            `http://localhost:4000/module/function1/${selectedData[0].id}`
        ).then(response => {
            alert(response.data.errorMsg);
            gridEvent.updateRowData({ remove: selectedData });
        }).catch(e => {
            alert(e);
        });

    };

    const columnDefinition = [
        { headerName: "ID", field: "id", editable: true },
        { headerName: "PW", field: "pw", editable: true },
        { headerName: "ADDR", field: "addr", editable: true },
        { headerName: "TEL", field: "tel", editable: true }
    ];

    
    //전체조회
    const searchmemberList = useCallback(() => {
        axios.get(
            "http://localhost:4000/module/function1"
        ).then(response => {
            
            setMemberList(response.data.empInfo);
        }).catch(e => {
            alert(e);
        });
    }, []);


    //한명조회
    const searchMember = useCallback(() => {
        axios.get(
            `http://localhost:4000/module/function1/${memberId}`,
        ).then(response => {
           
            setMemberList(response.data.empInfo);
        }).catch(e => {
            alert(e);
        });
    }, [memberId]);

    //한명 저장
    const insertMember = () => {
        let selectedData = gridEvent.getSelectedRows();
        axios.post(
            `http://localhost:4000/module/function1`,
            selectedData[0]
        ).then(response => {
            alert(response.data.errorMsg)
        }).catch(e => {
            alert(e);
        });
    }
    //프로시저로 한명 저장
    const insertProcedureMember = () => {
        let selectedData = gridEvent.getSelectedRows();
        axios.post(
            `http://localhost:4000/module/function1/${selectedData[0].id}`,
            selectedData[0]
        ).then(response => {
            setMemberList(response.data.empInfo);
        }).catch(e => {
            alert(e);
        });
    }
    //업데이트
    const updateMember = () => {
        let selectedData = gridEvent.getSelectedRows();
        axios.put(
            `http://localhost:4000/module/function1/${selectedData[0].id}`,
            { memberJson: JSON.stringify(selectedData[0]) }
        ).then(response => {
            alert(response.data.errorMsg)
        }).catch(e => {
            alert(e);
        });
    }

    return (
        <div>
            <HrAppBar title="노드 서버 테스트" />
            <button onClick={searchmemberList}> 전체 조회</button>
            <hr />
            <input value={memberId} onChange={(e) => { setMemberId(e.target.value) }} />
            <button onClick={searchMember}> 한명 조회</button>
            <hr />
            <button onClick={addOnClick}>추가</button>
            <button onClick={onRemove}>삭제</button>
            <hr />
            <button onClick={insertMember} >한명 저장</button>
            <button onClick={insertProcedureMember} >프로시저로 한명 저장</button>
            <hr />
            <button onClick={updateMember}> 업데이트 </button>
            <MyGrid rowData={memberList} onGridReady={onGridReady} columnDefinition={columnDefinition} />
            
        </div>
    )
}

export default Node;