import axios from 'api/logiApi';

export const inspection = (param) =>
    axios.put("/stock/inspection",
        { sendData: param },
        {  headers: {  "Content-Type": "application/json" }},
    );

// 1차 뒷단으로 api 수정
export const getBomDeploy =
    async (param) => {
        const result = await axios.get(
            '/stock/bom/deploy', {
                params : {
                    deployCondition: param.deployCondition,
                    itemCode: param.itemCode,
                    itemClassificationCondition: param.divisionCode,
                }
            }
        )
        return result.data;
    }

/////////////////////////////////////
export const getBomDeployRegist =
    async (param) => {
        console.log("getBonDeployRegist",param);
        const result = await axios.get("/stock/bom/info", {
            params: {
                parentItemCode: param
            }
        })
        console.log("result.data : ", result.data);
        return result.data;
    }

// 1차 뒷단으로 api 수정
export const getDetailCode =
    async (param) => {
        const result = await axios.get(
            '/compinfo/codedetail/list', {
                params: {
                    divisionCodeNo: param
                }
            }
        )
        return result.data;
    }

export const batchBom =     //새로운 항목 추가 후 일괄저장 버튼 클릭 시 batchBom 호출하고 뒷단 감! (param에 resultList에 추가한 row 내용 담겨 있음)
    async (param) => {
        console.log("param : ",param); //배열 형태로 넘어옴!
        const result = await axios.post(
            "/stock/bom/batch",
            param
        )
        // param[0]  << {key1:val1, key2:val2....}   << @RequetsBody BOMTO 변수명   << BOMTO (key1, key2 ....)
        //
        // param << [{key1:val1, key2:val2....}]  << @RequestBody ArrayList<BOMTO>  변수명
        //
        // { key : [{key1:val1, key2:val2....},{key1:val1 ....}]  }  << @RequestBody HashMap<String, ArrayList<BOMTO>> 변수명


        return result.data;
    }


// export const batchBom =     //새로운 항목 추가 후 일괄저장 버튼 클릭 시 batchBom 호출하고 뒷단 감! (param에 resultList에 추가한 row 내용 담겨 있음)
//     async (param) => {
//         console.log("param : ",param); //배열 형태로 넘어옴!
//         const result = await axios.post(
//             "/stock/bom/batch",
//             {
//                 batchList: param
//                 }
//         )
//         return result.data;
//     }

// export const batchBom =     //새로운 항목 추가 후 일괄저장 버튼 클릭 시 batchBom 호출하고 뒷단 감! (param에 resultList에 추가한 row 내용 담겨 있음)
// async (param) => {
//         console.log("param : ",param); //배열 형태로 넘어옴!
// const result = await axios.post(
//     "/purchase/batchBomListProcess",
//     {
//         batchList: JSON.stringify(param)
//     }
// )
// return result.data;
// }

// API 변경
export const optionOrderDialog =
    async () => {
        const result = await axios.get('/logiinfo/getOptionItemList')
        return result.data;
    }

export const onClickOptionOrder =
    async (params) => {
        const result = await axios.get('/purchase/order/option', {
            params: {
                itemCode: params.itemCode,
                itemAmount: params.itemAmount
            }
        })
        return result.data;
    }

export const onClickGetOrderList =
    async (params) => {
        const result = await axios
            .get('/purchase/order/list', {
                params: {
                    startDate: params.startDate,
                    endDate: params.endDate
                }
            })
        return result.data;
    }

export const onClickOrderOpen =
    async (param) => {
        const result = await axios
            .get('/purchase/order/dialog', {
                params: {
                    mrpGatheringNoList: param.mrpGatheringNoList
                }
            })
        return result.data;
    }