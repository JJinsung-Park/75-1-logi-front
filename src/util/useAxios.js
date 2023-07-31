// https://youtu.be/IxydSMI4Qjg

//************************* useAxios수정 시작 _준서 _20.08.24 *************************
import {useState, useEffect} from "react";
import defaultAxios from "axios";

export default function useAxios (options, axiosInstance = defaultAxios)  {

    if(sessionStorage.getItem("authorization"))
        axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem("authorization");
        
    const [state, setState] = useState({
        url: options.url,
        loading: options.fetchOnStart,
        errorCode: 0,
        errorMsg: "",
        params: [options.params]
        //headers: options.headers
    });

    const fetchData = () => {

        if (!state.url)
            return;
        
        axiosInstance(options).then(response => {
            setState({
                ...state,
                loading: false,
                data: response.data.restAttdList,
                headers: response.headers
            });
          
        }).catch(error => {
            setState({...state, loading: false, error: error})
        })
    };
    useEffect(fetchData, [state.loading]);

    const fetch = (url = state.url, data = state.data) => {
     
        setState({
            ...state,
            url: url,
            loading: true,
            data: data
        });

    };

    return {...state, fetch};
};
//************************* useAxios수정 종료 _준서 _20.08.24 *************************