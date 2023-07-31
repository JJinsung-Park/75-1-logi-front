//**************************************** 2020-11-20 권은비 시작 ****************************************
import React, { useEffect, useState, memo } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { FormControl, Grid, InputLabel, MenuItem, Select, } from "@material-ui/core";
import DeptGrid from './DeptGrid';


const SearchByDept = memo(
    ({
        deptName,
        gridData,
        handleChange,
        searchOnClick,
        onRowClicked,
    }) => {

        const useStyles = makeStyles((theme) => ({
            formControl: {
                margin: theme.spacing(0),
                minWidth: 160,
                minHeight: 10,
            },
            selectEmpty: {
                marginTop: theme.spacing(0),
            },
        }));

        const classes = useStyles();
        const [list, setList] = useState([]);

        ////////select에 부서목록 가져오는 부분    
        useEffect(() => {
            axios
                .get("http://localhost:8282/hr/base/deptList")
                .then(response => {
                    
                    setList(response.data.list)
                })
                .catch(e => {
                   
                });
        }, []);

        const selList = list.map(
            (ele) => {
                return <MenuItem value={ele.deptCode}>{ele.deptName}</MenuItem>
            }
        )




        return (
            <>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">부서명</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={deptName}
                                onChange={handleChange}
                                label="Dept"

                            >
                                <MenuItem value="전체부서">전체부서</MenuItem>
                                {selList}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" size="large" onClick={searchOnClick} value={deptName}>검색</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <DeptGrid data={gridData} onRowClicked={onRowClicked}></DeptGrid>
                    </Grid>
                </Grid>
            </>
        )
    }
);


export default SearchByDept;

//**************************************** 2020-11-20 권은비 종료 ****************************************
