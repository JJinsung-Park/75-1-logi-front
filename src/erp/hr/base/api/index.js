import axios from 'api/hrApi';

export const getBaseWorkTimeList = () =>
  axios.get("http://localhost:8889/foudinfomgmt/basetime");

// export const deleteBaseWorkTime = (action) =>
//   axios.delete("http://localhost:8889/foudinfomgmt/react-basetime",
//     { sendData: action.payload},
//     { headers: { "Content-Type": "application/json" } },
//   );

export const batchBaseWorkTime = (action) =>
  axios.put("http://localhost:8889/foudinfomgmt/react-basetime",
    { sendData: action.payload },
    { headers: { "Content-Type": "application/json" } },
  );

  export const deleteBaseWorkTime = (action) =>
  axios.post("http://localhost:8889/foudinfomgmt/react-deleteBasetime",
    { sendData: action.payload },
    { headers: { "Content-Type": "application/json" } },
  );

export const holidaySearch = () =>
  axios.get(
    "http://localhost:8889/foudinfomgmt/holiday",
  );

export const holidayUpdate = (action) =>
  axios.post(
    "/base/holidayList.do",
    { sendData: action.payload },
    { headers: { "Content-Type": "application/json" } },
  )

export const deptListManage = () =>
    axios.get(
      "http://localhost:8889/foudinfomgmt/deptlist"
      );

export const deptListUpdate = (action) => {

  axios.post(
    "/base/deptList.do",
    { sendData: action.payload },
    { headers: { "Content-Type": "application/json" } },
  )
}

export const deptMember = (action) => {

  return axios.get("/affair/memberList", {
    params: {
      value: action.params.deptCode,
    },
  },
  )
}