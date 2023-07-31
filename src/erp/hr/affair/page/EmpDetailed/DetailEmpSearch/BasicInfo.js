import React,{useEffect,useState} from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Button,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import {EMP_UPDATE_REQUEST
} from "../../../saga/EmpInfoSaga";


function BasicInfo(props) {

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
            width: '30ch',
        },
        button: {
            margin: 20,
            backgroundColor:blue,
        },
    }));

    // const currencies = [
    //     {
    //         value: 'female',
    //         label: 'female',
    //     },
    //     {
    //         value: 'male',
    //         label: 'male',
    //     },
    // ];
    const classes = useStyles();
    const dispatch = useDispatch();
    const {empDetailFullList} = useSelector(state => state.hr.affair);
    const [image,setImage] = useState('');
    const [zipCode,setZipCode] = useState('');
    const [basicAddress,setBasicAddress] = useState('');
    const [email,setEmail] = useState('');
    const [empName,setEmpName] = useState('');//EMPLOYEE_BASIC
    const [gender,setGender] = useState('');//EMPLOYEE_BASIC
    const [birthDate,setBirthDate] = useState('');//EMPLOYEE_BASIC
    const [levelOfEducation,setLevelOfEducation] = useState('');
    const [empCode,setEmpCode] = useState('');
    const [positionName,setPositionName] = useState('');
    const [deptName,setDeptName] = useState('');
    let data = [];
    useEffect(()=>{
        if(empDetailFullList[0] !== undefined){
            setImage(empDetailFullList[0].image);
            setZipCode(empDetailFullList[0].zipCode);
            setBasicAddress(empDetailFullList[0].basicAddress);
            setEmail(empDetailFullList[0].email);
            setEmpName(empDetailFullList[0].empName);
            setGender(empDetailFullList[0].gender);
            setBirthDate(empDetailFullList[0].birthDate);
            setLevelOfEducation(empDetailFullList[0].levelOfEducation);
            setEmpCode(empDetailFullList[0].empCode);
            setPositionName(empDetailFullList[0].positionName);
            setDeptName(empDetailFullList[0].deptName);
        }
    },[empDetailFullList])//empDetailFullList의 값이 변경될때만 해당 useEffect 함수 실행 즉 사원로우를 클릭했을때 한번만 실행됨


    const update = () => {
        // axios.post("http://localhost:8282/hr/affair/empUpdate.do",{
        //     params:{empArray:empDetailFullList}
        // },{ headers: {
        //     'Content-Type': 'application/json' },
        //     }
        // ).then(response=> {
        //    
        // })   
        // .catch(e => {
       
        // });
        data={
            empCode: empCode,
            zipCode: zipCode,
            basicAddress: basicAddress,
            email: email,
            empName: empName,
            gender: gender,
            birthDate: birthDate,
            levelOfEducation: levelOfEducation
        }
        dispatch({ type: EMP_UPDATE_REQUEST, 
            data: data
        });
        alert("수정완료");
    }

    return (
        <div className={classes.root1}>
            <Grid container spacing={1}>
                <Grid xs={12} sm={7}>
                        <Grid container spacing={3}>
                            <Grid sm={12}>
                                <img 
                                //src={empDetailFullList[0] !== undefined ? empDetailFullList[0].image:''} //src하면 public으로 이동
                                src={image}//이미지 변경은 구현 안함
                                width='250'
                                height='250'/>
                            </Grid>
                            <Grid sm={6}>
                                <TextField
                                    label="우편번호"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].zipCode:''}
                                    //className={classes.textField}
                                    value={zipCode}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e => { 
                                        setZipCode(e.target.value)
                                    })}
                                />
                            </Grid>
                            <Grid sm={11}>
                                <TextField
                                    label="주소"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].basicAddress:''}
                                    //className={classes.textField}
                                    value={basicAddress}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e => { setBasicAddress(e.target.value)})}
                                />
                            </Grid>
                            <Grid sm={11}>
                                <TextField
                                    label="이메일"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].email:''}
                                    //className={classes.textField}
                                    value={email}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e => { setEmail(e.target.value)})}
                                />
                            </Grid>
                            <Grid sm={11}>
                                <Button
                                    className={classes.button}
                                    variant="contained" color="primary" size="large" onClick = {update}
                                >수정</Button>
                            </Grid>
                        </Grid>
                </Grid>


                <Grid xs={12} sm={5}>
                        <Grid container spacing={1}>
                            <Grid xs={12}>
                            <TextField
                                    label="사원명"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].empName:''}
                                    value={empName}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e => { setEmpName(e.target.value)})}
                                />
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="성별"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].gender:''}
                                    value={gender}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e => { setGender(e.target.value)})}
                                    //select
                                >
                                    {/* {currencies.map((val) => (
                                    <option key={val.value} value={val.value}>
                                        {val.label}
                                    </option>
                                ))} */}
                                    </TextField>
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="생년월일"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].birthDate:''}
                                    value={birthDate}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e => { setBirthDate(e.target.value)})}
                                />
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="최종학력"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].levelOfEducation:''}
                                    value={levelOfEducation}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e => { setLevelOfEducation(e.target.value)})}
                                />
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="사원코드"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].empCode:''}
                                    value={empCode}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    //onChange={(e => { setEmpCode(e.target.value)})} 변경하면 안됨
                                    editable="false"
                                />
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="직급명"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].positionName:''}
                                    value={positionName}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    //onChange={(e => { setPositionName(e.target.value)})} 상세정보에서 관리할 것이 아니라 인사발령에서 관리 해야함
                                />
                            </Grid>
                            <Grid xs={12}>
                            <TextField
                                    label="부서명"
                                    id="outlined-margin-normal"
                                    //value={empDetailFullList[0] !== undefined ? empDetailFullList[0].deptName:''}
                                    value={deptName}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    //onChange={(e => { setDeptName(e.target.value)})} 상세정보에서 관리할 것이 아니라 인사발령에서 관리 해야함
                                />
                            </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default BasicInfo;


