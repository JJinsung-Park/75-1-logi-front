import React, { useState, useCallback } from 'react';
import BaseWorkTime from './BaseWorkTime';
import { connect } from "react-redux";
import usePromise from "util/usePromise";
import {
  getBaseWorkTimeList,
  deleteBaseWorkTime,
  batchBaseWorkTime
} from '../../api';

const BaseWorkTimeContainer = ({baseWorkTimeList,getBaseWorkTimeList,
  deleteBaseWorkTime,
  batchBaseWorkTime}) => {


  const [gridApi, setGridApi] = useState(null);

  function cellClicked(e) {
    
    if (e.colDef.field === 'applyYear' && e.data.status !== 'insert')
      e.colDef.editable = false;
    else
      e.colDef.editable = true;
  }

  function onGridReady(params) {
    
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }


  /*--------------------*/
  /*-----batchItems-----*/
  /*--------------------*/
  const batchItems = useCallback(() => {
   
    const process = async (param) => {

      try {
        await batchBaseWorkTime(param);
        alert("저장 완료");
      } catch (e) {
        alert(e.message);
      }
    }
    let list = [];
    gridApi.forEachNode(node => {
      list.push(node.data);
    });
    const arr = list.map(el => el.applyYear);
    const result = arr.reduce((accu, curr) => {
      accu.set(curr, (accu.get(curr) || 0) + 1);
      return accu;
    }, new Map());
    let array = [];
    for (let [key, value] of result.entries()) {
   
      if (value > 1) array.push(key);
    }
    if (array.length) {
      alert(array.join('년도, ') + '년도 중복');
      return;
    }
    list = list.filter(data => data.status !== 'normal');
    if (list.length) {

      process(list);

      gridApi.forEachNode((node, index) => {
        if (node.data.status !== 'normal') {
          node.data.status = 'normal'
          gridApi.updateRowData({ update: [node.data] });
        }
      })
    }



  }, [gridApi]);


  /*---------------------*/
  /*-----deleteItems-----*/
  /*---------------------*/
  const deleteItems = useCallback(() => {

    const process = async (param) => {
 
      await deleteBaseWorkTime(param);
    }
    var rows = gridApi.getSelectedRows();

    gridApi.updateRowData({ remove: rows });
    let list = rows.filter(el => el.status !== 'insert');

    if (list.length) {
      process(list);
    }
  }, [gridApi]);


  /*-----------------*/
  /*-----addItem-----*/
  /*-----------------*/
  const addItem = useCallback(() => {
    
    const newRow = {
      applyYear: null,
      attendTime: null,
      chk: null,
      dinnerEndTime: null,
      dinnerStartTime: null,
      errorCode: null,
      errorMsg: null,
      lunchEndTime: null,
      lunchStartTime: null,
      nightEndTime: null,
      overEndTime: null,
      quitTime: null,
      status: "insert"
    }
    gridApi.updateRowData({ add: [newRow] });

  }, [gridApi]);

  const cellEditingStopped = useCallback(event => {
    
    let rowData = event.node.data;
    if (rowData.status !== 'insert') rowData.status = 'update';
   
  }, []);



    return (
      <div>

      <BaseWorkTime
        baseWorkTimeList={baseWorkTimeList}
        onGridReady={onGridReady}
        addItem={addItem}
        batchItems={batchItems}
        deleteItems={deleteItems}
        cellEditingStopped={cellEditingStopped}
        cellClicked={cellClicked}
        />
        </div>
    );

}

const mapStateToProps = state => {
  return {
    baseWorkTimeList: state.RootReducers.hr.base.baseworktime.baseWorkTimeList,
  };
};
export default connect(mapStateToProps, {
})(BaseWorkTimeContainer);