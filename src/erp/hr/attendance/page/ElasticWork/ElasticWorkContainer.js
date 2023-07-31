import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectElastic, insertElastic, delElastic } from '../../saga/ElasticSaga'
import ElasticGrid from "./ElasticGrid";


const ElasticWorkContainer = ({
    selectElastic,
    insertElastic,
    elasticData,
    insertelData,
    delElastic,
}) => {
    const handleElastic = (empCode, applyDay) => {

        selectElastic({
            empCode: empCode,
            applyDay: applyDay,
        });
    }

    const handleInsertElastic = (empCode, applyDay, startTime, endTime) => {

        insertElastic({
            empCode: empCode,
            applyDay: applyDay,
            startTime: startTime,
            endTime: endTime,
        });
    }

    return (
        <ElasticGrid
            handleElastic={handleElastic}
            handleInsertElastic={handleInsertElastic}
            elasticData={elasticData}
            insertelData={insertelData}
            delElastic={delElastic}
        />
    )
}


// store가 업데이트될때마다 자동으로 호출된다
const mapStateToProps = state => {
    return {
        elasticData: state.hr.attendance.elastic.elasticData,
        insertelData: state.hr.attendance.elastic.insertelData,
    };
};




export default connect(mapStateToProps, {
    selectElastic,
    insertElastic,
    delElastic,
})(ElasticWorkContainer);
