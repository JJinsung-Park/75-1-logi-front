import axios from 'api/logiApi';
import hr from 'api/hrApi';

export const downloadReport = (param) => {
    return axios.get('/sales/logisticExel', {
        params: param
    });
};

export const searchEstimate = async (param) => {
    const result = await axios.get('/logisales/estimate/list', {
        params: param
    });
    return result.data;
};

export const estimateCellClicked = async (params) => {
    const result = await axios.get('/logisales/estimatedetail/list', {
        params: {
            estimateNo: params.data.estimateNo
        }
    });
    return result.data;
};

export const searchItemCode = async (param) => {
    const result = await axios.get('/logiinfo/item/standardunitprice', {
        params: param
    });
  
    return result.data;
};

export const saveEstimateRow = async (param) => {
  
    const result = await axios.post(
        '/logisales/estimate/new',
        {
            estimateDate: param.estimateDate,
            newEstimateInfo: param
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return result.data;
};

export const searchCustomer = async () => {
    const result = await axios.get('/compinfo/customer/list', {
        params: {
            searchCondition: 'ALL',
            workplaceCode: ''
        }
    });
    // console.log(result)
    // console.log(result.data)
    return result.data;
};

export const  searchItem = async () => {
    const result = await axios.get('/compinfo/codedetail/list', {
        params: {
            divisionCodeNo: 'IT-_I'
        }
    });
    return result.data;
};

export const searchDetailList = async (params) => {
    const result = await axios.get('/logisales/contractdetail/list', {
        params: {
            contractNo: params.data.contractNo
        }
    });
    return result.data;
};

export const searchContractList = async (param) => {

    const result = await axios.get('/logisales/contract/list', {
        params: param },
      { withCredentials: true });
    console.log(result.data);
    return result.data;
};

export const estimateSearch = async (param) => {
    const result = await axios.get('/logisales/estimate/list/contractavailable', {
        params: param
    });
    return result.data;
};

export const addContract = async (param) => {
    
    const result = await axios.post('/logisales/contract/new', {
        // batchList: param.batchList,
        // 그리드에서 다중선택 가능하게해서 배열로 넘겨야할듯 백단 원래 배열로 받는 로직도 주석으로 남겨놨으니 참고
        contractType: param.contractType,
        estimateNo: param.estimateNo,
        description: param.description,
        contractRequester: param.contractRequester,
        customerCode: param.customerCode,
        contractNo: param.contractNo,
        contractDate: param.contractDate,
        personCodeInCharge: param.personCodeInCharge
    });
    return result.data;
};

export const searchContractType = async () => {
    const result = await axios.get('/compinfo/codedetail/list', {
        params: {
            divisionCodeNo: 'CT'
        }
    });
    
    return result.data;
};

export const searchDialogCustomer = async () => {
    const result = await axios.get('/compinfo/codedetail/list',{
            params: {
                divisionCodeNo: 'CL-01'
            }
        },
        //{ withCredentials: true }
    );
   
    return result.data;
};

export function contractDetailListInMpsAvailable(param) {
    return axios.get('http://localhost:8284/production/mps/contractdetail-available', {
        batchList: param.searchCondition,
        contractDate: param.startDate,
        personCodeInCharge: param.endDate
    });
}
