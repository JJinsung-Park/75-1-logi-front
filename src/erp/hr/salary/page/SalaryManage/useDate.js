import React from "react";

const useDate = () => {
  function leadingZeros(n, digits) {
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  }

  // 오늘 날짜를 불러오는 javascript 객체임. 결국 만들어진 today는
  // SlipGrid, JournalGrid 의 props로 넘겨져서 사용된다.
  let now = new Date();
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let nowDate = leadingZeros(now.getDate(), 2);
  let today = year + "-" + month + "-" + nowDate;

  return today;
};
export default useDate;
