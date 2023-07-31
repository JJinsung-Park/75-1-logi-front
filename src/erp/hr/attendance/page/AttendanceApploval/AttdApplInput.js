//************************* 결제승인관리 시작 _재영 *************************
const AttdApplInput = [
    {
      headerName: "사원명",
      field: "empName",
      width : 90,
      sortable: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {
      headerName: "구분",
      field: "restTypeName",
      width : 120
    },
    {
      headerName: "신청일자",
      field: "requestDate",
      width : 130
    },
    {
      headerName: "시작일",
      field: "startDate",
      width : 130
    },
    {
      headerName: "종료일",
      field: "endDate",
      width : 130
    },
    {
      headerName: "사유",
      field: "cause",
      width : 100
    },
    {
      headerName: "시작시간",
      field: "startTime",
      width : 130
    },
    {
      headerName: "종료시간",
      field: "endTime",
      width : 130
    },
    {
      headerName: "일수",
      field: "numberOfDays",
      width : 80
    },
    {
      headerName: "승인상태",
      field: "applovalStatus",
      width : 120
    }
  ];

export default AttdApplInput;
//************************* 결제승인관리 시작 _재영 *************************