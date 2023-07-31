import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';

function WorkInfo(props) {

    const useStyles = makeStyles((theme) => ({
        root1: {
            flexGrow: 1,
            textAlign: 'center',
            padding: theme.spacing(2),
            margin: 25
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            //width: '25ch',
            padding: theme.spacing(2),
        },
        button: {
            margin: 20,
            backgroundColor: blue,
        },
    }));

    const classes = useStyles();


    const {empDetailFullList} = useSelector(state => state.hr.affair)
    if(empDetailFullList[0]!==undefined){
    }
    



    return (
        <div className={classes.root1}>
            <Grid container spacing={1}>



                <Grid xs={12} sm={6}>
                    <Grid container spacing={1}>


                        <Grid sm={11}>
                            <TextField
                                label="사원명"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].empName:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="사원코드"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].empCode:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="직급명"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].position:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="부서명"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].deptName:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="호봉"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].hobong:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>


                    </Grid>
                </Grid>


                <Grid xs={12} sm={6}>
                    <Grid container spacing={1}>


                        <Grid sm={11}>
                            <TextField
                                label="직종"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].occupation:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="고용형태"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].employmentType:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="입사일"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].hiredate:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="퇴사일"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].retireDate:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid sm={11}>
                            <TextField
                                label="재직여부"
                                value={empDetailFullList[0]!==undefined ? empDetailFullList[0].workInfoList[0].userOrNot:''}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        


                    </Grid>



                </Grid>
            </Grid>
        </div>
    );
}

export default WorkInfo;

