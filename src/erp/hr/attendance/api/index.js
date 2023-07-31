import axios from 'api/hrApi';
import { relativeTimeRounding } from 'moment';

export const DayAttdSaga = action =>
    axios.post(`http://localhost:8889/attdmgmt/react-daily-attnd`, {
        empCode: action.payload.empCode,
        applyDay: action.payload.applyDay,
        attdType: action.payload.attdType,
        attdTypeName: action.payload.attdTypeName,
        time: action.payload.time
    });

    export const DayAttdSSaga = action =>
    axios.get('http://localhost:8889/attdappvl/day-attnd', {
        params: {
            applyDay: action.payload.applyDay
        }
    })

export const deleteAttdSaga = action =>
    axios.post(
        '/attendance/deleteDayAttendance',
        {
            dayAttdData: action.payload.data
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

export const restAttdSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/attendance/registRestAttd',
        params: { data: action.data }
    })
        .then(function (response) {
            alert('신청완료');
        })
        .catch(function (error) {
            alert('신청실패');
        });

export const searchEmploymentSaga = action =>
    axios.get('/certificate/selectCertificateList', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate,
            empCode: action.params.empCode
        }
    });

export const searchAttdAppl = action =>
    axios.get('/attendance/attendanceApploval', {
        params: {
            deptCode: action.payload.deptCode,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
        }
    });

export const updateAttdApplSaga = action =>
    axios.post(
        '/attendance/attendanceApploval',
        {
            checkData: action.payload.data,
            deptCode: action.payload.deptCode,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

export const monthAttdSearch = action =>
    axios.get('http://localhost:8889/attdappvl/month-attnd', {
        params: {
            applyYearMonth: action.payload.cday
        }
    });

export const monthAttdUpdate = action =>
    axios.post(
        'http://localhost:8889/attdappvl/month-attnd',
        {
            monthAttdMgt: action.payload.monthAttdMgtList
        },
        { headers: { 'Content-Type': 'application/json' } }
        );

export const dayAttdSearch = action =>
    axios.get('/attendance/dayAttendanceManage', {
        params: {
            applyDay: action.payload.cday
        }
    });

export const dayAttdUpdate = action =>
    axios.post(
        '/attendance/dayAttendanceManageUpdate',
        {
            dayAttdMgt: action.payload.dayAttdMgtList
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

        // 근태외 신청
export const excusedAttdUpdate = action =>
    axios.post(
        'http://localhost:8889/attdmgmt/react-excused-attnd',
        {
            sendData: action.payload.sendData
        },
        { headers: { 'Content-Type': 'application/json' } }
        );
        // 근태외 조회
export const attdApprovalSearch = action =>
    axios.get(
        'http://localhost:8889/attdappvl/attnd-approval',{
            params: {
                deptCode: action.payload.deptCode,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }
        },);
        //근태외 확정
export const attdApprovaUpdate = action =>
        axios.put(
            'http://localhost:8889/attdappvl/react-attnd-approval',
            {
                sendData: action.payload.sendData
            },
            { headers: { 'Content-Type': 'application/json' } }
            );

            //연차신청 조회
export const breakSearch = action =>
    axios.get(
        'http://localhost:8889/attdappvl/annual-leaveMgt',{
            params: {
                applyYearMonth: action.payload.applyYearMonth,
            }
        },);
        // 연차마감
export const breakUpdate = action =>
    axios.put(
        'http://localhost:8889/attdappvl/react-annual-leaveMgt/1',
        {
            sendData: action.payload
        },
        { headers: { 'Content-Type': 'application/json' } }
        );

        //출장/교육 신청
export const insertTravel = action =>
        axios.post(
            'http://localhost:8889/attdmgmt/react-excused-attnd',
            {
                sendData: action.payload.sendData
            },
            { headers: { 'Content-Type': 'application/json' } }
            );        
        //출장/교육 신청
export const SearchTravel = action =>
        axios.get(
            'http://localhost:8889/attdmgmt/react-excused-attnd',
            {
                sendData: action.payload.sendData
            },
            { headers: { 'Content-Type': 'application/json' } }
            );        
//=====================탄력 근무제 67기 고범석========================
export const searchElasticSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/attendance/elasticRegister',
        params: {
            empCode: action.payload.empCode,
            applyDay: action.payload.applyDay
        }
    })
// .then(function (response) {
//     alert('신청완료');

// })
// .catch(function (error) {
//     alert('신청실패');
// });


export const insertElasticSaga = action =>
    axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/attendance/elasticInsert',
        params: {
            empCode: action.payload.empCode,
            applyDay: action.payload.applyDay,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime
        }
    }).then(
        function (empCode) {
            if (empCode) {
                alert('신청이 완료되었습니다~');
            }
        }
    )


export const deleteElasticSaga = action => {

    axios.post(
        '/attendance/elasticDelete',
        {
            elasticDelData: action.payload.data
        },
        { headers: { 'Content-Type': 'application/json' } }
    ).then(
        function () {
            alert('삭제가 완료되었습니다~')
            window.location.reload(true);
        }
    )
}



///////////////////////// 직무교육관리, 직무교육수강직원관리 68기 김슬기 ////////////////////////////

// 직무교육 수강과목 //

export const getClassList = () =>
axios.get("/attendance/getClassList");

export const getClass = (action) =>
axios.get("/attendance/getClass", {
    params: {
        classCode: action.payload.classCode,
    },
});

  export const addClass = (action) =>
  axios({
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    url: '/attendance/addClass',
    params: {
        classCode: action.payload.classCode,
        className: action.payload.className,
        startDate : action.payload.startDate,
        endDate: action.payload.endDate,
        instructor: action.payload.instructor,
        cost: action.payload.cost,
        classTime: action.payload.classTime,
    },
}).then(
    function () {
      alert('입력되었습니다');
    }
)

export const removeClass = (action) =>
axios({
  method: 'post',
  headers: {
      'Content-Type': 'application/json'
  },
  url: '/attendance/removeClass',
  params: {
      classCode : action.payload,
  },
}).then(
  function () {
    alert('삭제되었습니다');
  }
)

export const modifyClass = (action) =>
axios({
  method: 'post',
  headers: {
      'Content-Type': 'application/json'
  },
  url: '/attendance/modifyClass',
  params: {
      classCode: action.payload.classCode,
      className: action.payload.className,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      instructor: action.payload.instructor,
      cost: action.payload.cost,
      classTime: action.payload.classTime,
  },
}).then(
  function () {
    alert('입력되었습니다');
  }
)


// 직무교육 수강직원 //

export const getAttendeeAll = (action) =>
axios.get("/attendance/getAttendeeAll");

export const getAttendeeList = (action) =>
axios.get("/attendance/getAttendeeList", {
  params: {
      classCode: action.payload.classCode,
  },
});

export const getAttendee = (action) =>
axios.get("/attendance/getAttendee", {
    params: {
      empNo: action.payload.empNo,
    },
});

  export const addAttendee = (action) =>
  axios({
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    url: '/attendance/addAttendee',
    params: {
      classCode: action.payload.classCode,
      empNo: action.payload.empNo,
      empName: action.payload.empName,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      totalHours: action.payload.totalHours,
      attendanceScore: action.payload.attendanceScore,
      testScore: action.payload.testScore,
      totalScore: action.payload.totalScore,
      actualCharge: action.payload.actualCharge,
      status: action.payload.status,
      cost: action.payload.cost,
    },
}).then(
    function () {
      alert('입력되었습니다');
    }
)

export const removeAttendee = (action) =>
axios({
  method: 'post',
  headers: {
      'Content-Type': 'application/json'
  },
  url: '/attendance/removeAttendee',
  params: {
    empNo : action.payload.empNo,
    classCode: action.payload.classCode,
  },
}).then(
  function () {
    alert('삭제되었습니다');
  }
)

export const modifyAttendee = (action) =>
axios({
  method: 'post',
  headers: {
      'Content-Type': 'application/json'
  },
  url: '/attendance/modifyAttendee',
  params: {
    classCode: action.payload.classCode,
    empNo: action.payload.empNo,
    empName: action.payload.empName,
    startDate: action.payload.startDate,
    endDate: action.payload.endDate,
    totalHours: action.payload.totalHours,
    attendanceScore: action.payload.attendanceScore,
    testScore: action.payload.testScore,
    totalScore: action.payload.totalScore,
    actualCharge: action.payload.actualCharge,
    status: action.payload.status,
    cost: action.payload.cost,
  },
}).then(
  function () {
    alert('입력되었습니다');
  }
)


/////////////////////////////////////////////////////////


