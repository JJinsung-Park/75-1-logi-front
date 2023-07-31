import axios from 'api/hrApi';
//@@@@@@@@@@@@@@@@@@@@@@@@최예솔@@@@@@@@@@@@@@@@@@@@@
export const searchDayWorkerSaga = action =>

    axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/dayworker/findDayworker',
        params: {
            empCode: action.payload.empCode,
            empName: action.payload.empName
        }
    }).then(function (response) {
        alert('조회완료');
    })
    .catch(function (error) {
      //  alert('조회실패');
    });


export const insertDayWorkerSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/dayworker/dayworkerInsert',
        params: { 
            empCode: action.payload.empCode, 
            empName: action.payload.empName, 
            joinDate: action.payload.joinDate,
            dept: action.payload.dept,
            phoneNumber: action.payload.phoneNumber,
            accountNumber: action.payload.accountNumber,
            accountHolder: action.payload.accountHolder,
            salary: action.payload.salary,
            timeSalary: action.payload.timeSalary 
        }
    }).then(function (response) {
        alert('등록완료');
    })
    .catch(function (error) {
        alert('등록실패');
    });



export const deleteDayWorkerSaga = action => {

    axios.post(
        '/dayworker/dayworkerDelete',
        {
            dayWorkerDelData: action.payload.data
        },
        { headers: { 'Content-Type': 'application/json' } }
    ).then(
        function () {
            alert('삭제완료')
            window.location.reload(true);
        }
    )
}


//==================급여 계산하기==============================
export const searchDayWorkerSalarySaga = action =>

    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/dayworkersalary/findDayworkerSalary',
        params: {
            empCode: action.payload.empCode,
            empName: action.payload.empName
        }
    }).then(function (response) {
        alert('조회완료');
    })
    .catch(function (error) {
        alert('조회실패');
    });




export const insertDayWorkerSalarySaga = action =>
    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/dayworkersalary/dayworkerSalaryInsert',
        params: {      
            empCode: action.payload.empCode, 
            empName: action.payload.empName, 
            workTime: action.payload.workTime,
        }
    }).then(function (response) {
        alert('계산완료'+response);
    })
    .catch(function (error) {
        alert('계산실패');
    });


export const insertMonthWorkerSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/dayworkersalary/dayworkerMonthSalaryInsert',
        params: {     
            empCode: action.payload.empCode, 
            empName: action.payload.empName, 
            workDay: action.payload.joinDate,
        
        }
    }).then(function (response) {
        alert('계산완료');
    })
    .catch(function (error) {
        alert('계산실패');
    });