import axios from 'api/logiApi';

export const inspection = (param) =>
    axios.put("/purchase/inspection", 
    { sendData: param },
    {  headers: {  "Content-Type": "application/json" }},
    );

export const searchOrderableList = 
    async param => {
        const result = await axios.get("http://localhost:8282/logi/outsourc/searchOderableList",
    {params : param});

return result.data;
}

export const searchOutsourcInfoList = 
    async param => {
        const result = await axios.get("http://localhost:9102/purchase/outsourcing/list",
    {params : param});

return result.data;
}

export const searchForwardableList = 
    async param => {
        const result = await axios.get("http://localhost:8282/logi/outsourc/searchForwardableList",
    {params : param});

return result.data;
}