import axios from 'api/logiApi'; //'http://localhost:9102/logi'

export const searchMpsList = param => axios.get(
    '/production/searchMpsInfo',
    {
        params: {
            startDate: param.payload.startDate,
            endDate: param.payload.endDate
        }
    }
);


export const searchMrpList = param => {
    console.log("param1", param);
    axios.get(
        '/production/openMrp',
        {
            params: {
                mpsNoListStr: param.payload.mpsNoListStr
            }
        }
    );
}


export const mrpInsert = param => axios.put(
    '/logistics/production/registerMrp',
    {
        mrpRegisterDate: param.payload.mrpRegisterDate,
        batchList: param.payload.batchList
    },
    { headers: { 'Content-Type': 'application/json' } }
);

export const searchGetMpsList = param => axios.get(
    '/logistics/production/getMrpList',
    {
        params: {
            mrpGatheringStatusCondition: param.payload.mrpGatheringStatusCondition
        }
    }
);

export const searchGatherList = param => axios.put(
    '/logistics/production/getMrpGatheringList',
    {
        mrpNoList: param.payload.mrpNoList
    }
);

export const gatherInsert = param => axios.put(
    '/logistics/production/registerMrpGathering',
    {
        mrpGatheringRegisterDate: param.payload.mrpGatheringRegisterDate,
        batchList: param.payload.batchList,
        mrpNoAndItemCodeList: param.payload.mrpNoAndItemCodeList
    },
    { headers: { 'Content-Type': 'application/json' } }
);
