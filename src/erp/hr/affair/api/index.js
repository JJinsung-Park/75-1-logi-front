import axios from 'api/hrApi';

export const empDetailedSaga = action =>
    axios.get('/affair/empDetail', {
        params: {
            company: action.payload.company,
            workPlace: action.payload.workPlace,
            position: action.payload.position,
            empName: action.payload.empName
        }
    });

export const empUpdateSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8282/',
            'Content-Type': 'application/json'
        },
        url: '/affair/empUpdate',
        params: { data: action.data }
    });
// axios.post(
//     "/affair/empUpdate.do",
//     {
//       params: {
//         empArray: action.payload.empArray,
//       },
//     },
//     { headers: { "Content-Type": "application/json" }
//     }
//   );

// const update = () => {참고용
//   axios.post("http://localhost:8282/hr/affair/empUpdate.do",{
//       params:{bean:emp}
//   },{ headers: { 'Access-Control-Allow-Origin':'http://localhost:8282/',
//       'Content-Type': 'application/json' },
//       withCredentials: true
//       }
//   ).then(response => {
//      
//   })
//   .catch(e => {
//       
//   });
// }

export const searchEmploymentManage = action =>
    axios.get('/certificate/findCertificateListByDept', {
        params: {
            deptName: action.payload.deptName,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
        }
    });

export const updateEmploymentManage = action =>
    axios.post(
        '/certificate/modifyCertificateList',
        {
            checkData: action.payload.data,
            deptName: action.payload.deptName,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

export const positionListSaga = () => axios.get('/company/searchPosition');

export const registerEmp = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/registEmployee',
        params: { data: action.data }
    });

export const divisionSaga = action =>
    axios.get('/company/searchDepartment', {
        params: {
            searchCondition: 'WORKPLACE',
            workplaceCode: action.workplaceCode,
            companyCode: 'COM-01'
        }
    });

export const assignEmp = action =>
    axios.get('/affair/assignList', {
        params: {
            startDate: action.payload.fromDate,
            endDate: action.payload.toDate
        }
    });
