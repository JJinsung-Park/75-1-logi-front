import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';

function DeliveryInfo(props) {
    const [list, setList] = useState();
    const column = {
        columnDefs: [
            { headerName: '납품번호', field: 'deliveryNo' },
            { headerName: '견적번호', field: 'estimateNo', hide: true },
            { headerName: '수주번호', field: 'contractNo', hide: true },
            { headerName: '수주상세일련번호', field: 'contractDetailNo', hide: true },
            { headerName: '거래처코드', field: 'customerCode', hide: true },
            { headerName: '처리자코드', field: 'personCodeInCharge' },
            { headerName: '품목코드', field: 'itemCode', hide: true },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfDelivery' },
            { headerName: '납품수량', field: 'deliveryAmount' },
            {
                headerName: '단가',
                field: 'unitPrice',
                cellRenderer: function (params) {
                    var num = params.value + '';
                    var point = num.length % 3;
                    var len = num.length;
                    var str = num.substring(0, point);
                    while (point < len) {
                        if (str != '') str += ',';
                        str += num.substring(point, point + 3);
                        point += 3;
                    }
                    return str;
                }
            },
            {
                headerName: '총액',
                field: 'sumPrice',
                cellRenderer: function (params) {
                    var num = params.value + '';
                    var point = num.length % 3;
                    var len = num.length;
                    var str = num.substring(0, point);
                    while (point < len) {
                        if (str != '') str += ',';
                        str += num.substring(point, point + 3);
                        point += 3;
                    }
                    return str;
                }
            },
            { headerName: '납품날짜', field: 'deliverydate' },
            { headerName: '배송지', field: 'deliveryPlaceName' },
            { headerName: '마감여부', field: 'finalizeStatus' }
        ]
    };
    useEffect(() => {
        // Axios.get('http://localhost:8282/logi/logistics/sales/searchDeliveryInfoList')
        Axios.get('http://localhost:9102/sales/delivery/list')
            .then((response) => {
                setList(response.data.gridRowJson);
            })
            .catch((e) => {
                
            });
    }, []);
    return <MyGrid column={column} title={'납품 현황'} list={list} size={'68vh'}></MyGrid>;
}

export default DeliveryInfo;
