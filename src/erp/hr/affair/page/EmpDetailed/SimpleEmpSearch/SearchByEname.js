//**************************************** 2020-11-25 권은비 시작 ****************************************

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button} from '@material-ui/core';
import DeptGrid from './DeptGrid';

const SearchByEname = memo(
    ({
        empName,
        gridData,
        handleChangeEname,
        searchOnClickEname,
        onRowClicked,
    })=>{

        const useStyles = makeStyles((theme) => ({
            root: {
                '& > *': {
                    margin: theme.spacing(0),
                    width: '20ch',
                },
            },
        }));
        const classes = useStyles();



        //엔터하면 온클릭으로 연계
        const onKeyDown = (event) =>{
            if(event.keyCode ==13){
                searchOnClickEname();
            }
        }


        return (
            <>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                            <TextField id="outlined-basic" label="사원명" variant="outlined" 
                            onChange={handleChangeEname}
                            onKeyDown={onKeyDown}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" size="large" onClick={searchOnClickEname} value={empName}>검색</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <DeptGrid data={gridData} onRowClicked={onRowClicked}></DeptGrid>
                    </Grid>
                </Grid>
            </>
        );
    }
);


export default SearchByEname;

//**************************************** 2020-11-25 권은비 종료 ****************************************
