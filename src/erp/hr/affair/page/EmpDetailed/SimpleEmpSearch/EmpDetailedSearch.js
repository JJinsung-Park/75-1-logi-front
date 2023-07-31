//**************************************** 2020-11-25 권은비 시작 ****************************************
import React,{useEffect,useState} from 'react';
import axios from "axios";
import UseStyles from "erp/hr/util/UseStyles";
import {
    Paper,
    AppBar,
    Tab,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import { TabList, TabPanel } from "@material-ui/lab";

import SearchByDept from './SearchByDept';
import SearchByEname from './SearchByEname';
import { useDispatch } from 'react-redux';
import {selectEmpDeailFullList} from 'erp/hr/affair/reducer/EmpDetailFullReducer';


function EmpDetailedSearch(props) {

    ////////탭관련 변수
    const classes = UseStyles();
    const [value, setValue] = React.useState("1");

    const handleTabChange = (event, newValue) => {
    setValue(newValue);
    };


    //////////////////////SearchByDept,SearchByEname의 공통 변수/////////////////////
    const dispatch = useDispatch();


    const [deptName, setDeptName] = useState('전체부서');
    const [empName, setEmpName] = useState('전체부서');
    const [gridData,setGridData]=useState([]);
    const [selEmpCode,setSelEmpCode] = useState('');
    const [infoList,setInfoList] = useState([]);

    const handleChange = (event) => {
        setDeptName(event.target.value);

    };

    const handleChangeEname = (event) => {
        setEmpName(event.target.value);
       
    };

    ///////조건따라 목록조회(부서명,사원명)

        const searchOnClick = async e => {
            try {
                await axios.get(`http://localhost:4000/erp/hr/codeList/${deptName}`).then(response => {
                    const jsonData = response.data.empCodeList;
                    
                    setGridData(jsonData);
                    
                });
            } catch (e) {
                
            }
        };

        const searchOnClickEname = async e => {
            try {
                await axios.get(`http://localhost:4000/erp/hr/codeList/${empName}`).then(response => {
                    const jsonData = response.data.empCodeList;
                    
                    setGridData(jsonData);
                   
                });
            } catch (e) {
                
            }
        };

    //상세정보 조회할떄 empCode넘겨주기위해 dispatch
    const onRowClicked=e=>{
        setSelEmpCode(e.data.empCode);
       
    }

    useEffect(
        ()=>{
        axios.get("http://localhost:8282/hr/affair/searchEmpBasicInfo",{
            params: { empCode:selEmpCode}
        })
        .then(response => {

            setInfoList(response.data.gridRowJson); 
            
        })   
        .catch(e => {
           
    });
        }
    ,[selEmpCode]);

    useEffect(() => {
        if(infoList[0]!==undefined){
        dispatch(selectEmpDeailFullList({select:infoList}));
        }
   }, [infoList]);


    ///////////////////////////////////////////////////////////////////////

    return (
        <div>
            
                <Paper className={classes.leftPaper}>
                    <TabContext value={value}>
                        <AppBar position="static">
                            <TabList
                                onChange={handleTabChange}
                                scrollButtons="auto"
                            //aria-label="simple tabs example"
                            //centered
                            >
                                <Tab label="부서명 검색" value="1" />
                                <Tab label="사원명 검색" value="2" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <SearchByDept
                            deptName={deptName}
                            gridData={gridData}
                            handleChange={handleChange}
                            searchOnClick={searchOnClick}
                            onRowClicked={onRowClicked}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <SearchByEname 
                            gridData={gridData}
                            handleChangeEname={handleChangeEname}
                            searchOnClickEname={searchOnClickEname}
                            onRowClicked={onRowClicked}/>
                        </TabPanel>
                    </TabContext>
                </Paper>
            
        </div>
    );
}

export default EmpDetailedSearch;


//**************************************** 2020-11-25 권은비 종료 ****************************************