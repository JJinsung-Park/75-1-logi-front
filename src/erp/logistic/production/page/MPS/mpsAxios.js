import axios from "axios";
import Swal from "sweetalert2";

export const     searchContractDetailInMpsAvailable = (setContractList,calendarDate) => {  // MPS - MPS 등록 가능 조회
    axios.get("http://localhost:9102/production/mps/contractdetail-available",{
        params:{
            startDate:calendarDate.startDate,
            endDate :calendarDate.endDate,
            searchCondition:'contractDate'
        }
    }).then(({data}) => {
        console.log("data1 : ",data);
        if(data.errorCode < 0 ){
            Swal.fire({
                icon: data.errorCode < 0 ? "error":"success",
                title: data.errorMsg
            });
        }

        setContractList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}
export const convertContractDetailToMps = (contract) => {
    console.log("contract : ", contract); //{key1:val1, key2:val2.....}
    axios.post("http://localhost:9102/production/mps/contractdetail",
        contract
    ).then(({data}) => {
        Swal.fire({
            icon: data.errorCode < 0 ? "error":"success",
            title: data.errorMsg
        });
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });

}


export const searchMpsInfo = (setMpsList,calendarDate) => {

    axios.get("http://localhost:9102/production/mps/list",{
            params : {
                startDate:calendarDate.startDate,
                endDate :calendarDate.endDate,
                includeMrpApply:'includeMrpApply'
            }
        }
    ).then(({data}) => {

        setMpsList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}

export const searchMpsInfoInMrp = (setContractList,calendarDate) => {  // 3-13추가 MRP에서 MPS 조회시
    console.log("calendarDate1 : ", calendarDate);
    axios.get("http://localhost:9102/production/mps/list",{  // /mps/list -> mrp/list 로 변경(3-14)
            params : {
                startDate:calendarDate.startDate,
                endDate :calendarDate.endDate,
                searchCondition:'includeMrpApply'  //includeMrpApply -> searchCondition : 'contractDate'로 수정
            }
        }
    ).then(({data}) => {

        setContractList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
        });
    });
}

// export const searchMpsInfoInMrp = (setContractList,calendarDate) => {  // 3-13추가 MRP에서 MPS 조회시
//     console.log("calendarDate1 : ", calendarDate);
//     axios.get("http://localhost:9102/production/mps/contractdetail-processplanavailable",{  // /mps/list -> mrp/list 로 변경(3-14)
//             params : {
//                 startDate:calendarDate.startDate,
//                 endDate :calendarDate.endDate,
//                 searchCondition:'contractDate'  //includeMrpApply -> searchCondition : 'contractDate'로 수정
//             }
//         }
//     ).then(({data}) => {
//
//         setContractList(data.gridRowJson);
//     }).catch(e => {
//         Swal.fire({
//             icon: "error",
//             title: e
//         });
//     });
// }
