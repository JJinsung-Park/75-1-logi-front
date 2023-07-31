import Axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HrAppBar from 'erp/hr/util/HrAppBar';
import MyGrid from 'erp/hr/util/MyGrid';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    Select,
    AppBar,
    Tab,
    Tabs,
    Paper,
    FormControl
} from '@mui/material';
import HealthInsure from './HealthInsure';
import NationPenision from './NationPenision';
import EmpInsure from './EmpInsure';
import IndustInsure from './IndustInsure';
import  insureList  from '../../reducer/InsureReducer';

function SocialInsure() {
    const [rowData, setRowData] = useState([]);
    const [searchYear, setsearchYear] = useState('');
    const [dataTest, settest] = useState([]);
    const [value, setValue] = useState(0);
    const insureChange = (event, newValue) => {
        setValue(newValue);
    };
  
    //const dataTest = useSelector(state => state.RootReducers.hr.salary.insure.insureList);

  
    const dispatch = useDispatch();
    const handleChange = e => {
        setsearchYear(e.target.value);
    };

    useEffect(() => {}, []);

    const onCellEditingStopped = useCallback(e => {
        e.data.status = 'update';

        Axios.post(
            'http://localhost:9101/salarystdinfomgmt/social',
            {
                sendData: [e.data]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).catch(e => {
            alert(e);
        });
    }, []);

    const search = () => {
  
        Axios.get('http://localhost:9101/salarystdinfomgmt/social', { params: { searchYear } })
            .then(response => {

                settest([response.data.baseInsureList]);

             //   dispatch({
                 //   type: 'insureList',
                 //   payload: response.data.baseInsureList
               // });
                //dispatch(insureList(response.data));
              
            })
            .catch(e => {
                alert(e);
            });
    };

    return (
        <div>
            <HrAppBar title="사회보장관리" />
            <br />
            <FormControl style={{ minWidth: '250px' }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchYear}
                    onChange={handleChange}
                >
                    <MenuItem value={2021}>2021년</MenuItem>
                    <MenuItem value={2020}>2020년</MenuItem>
                </Select>
            </FormControl>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary" onClick={search} className="button">
                조회하기
               
            </Button>
            
            <AppBar position="static">
                <Tabs value={value} onChange={insureChange} aria-label="simple tabs example">
                    <Tab label="건강보험" />
                    <Tab label="국민연금" />
                    <Tab label="고용보험" />
                    <Tab label="산재보험" />
                </Tabs>
            </AppBar>
            {value === 0 && <HealthInsure dataTest={dataTest} />}
            {value === 1 && <NationPenision dataTest={dataTest} />}
            {value === 2 && <EmpInsure dataTest={dataTest} />}
            {value === 3 && <IndustInsure dataTest={dataTest} />}
        </div>
   
    );

}

export default SocialInsure;
