// material-ui
import { Grid, Stack, TextField, Typography, Button,Box ,InputLabel,MenuItem,FormControl,Select     } from '@mui/material';

// project imports
import Avatar from 'template/ui-component/extended/Avatar';
import { gridSpacing } from 'template/store/constant';
import AnimateButton from 'template/ui-component/extended/AnimateButton';

// assets
import Avatar1 from 'assets/images/users/avatar-7.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { useState } from 'react';
import { number } from 'prop-types';
import moment from "moment";
// ==============================|| EXCUSED PROFILE ||============================== //

function UserProfile(props){
    //------------- 요청에 필요없는 -----------------
    
    //부서
    const [dept,setDept] = useState('');
    // 직급
    const [grade,setGrade] = useState('');
    //-----------------------------------------
    // 당일 날짜
    let today = moment().format("YYYY-MM-DD");

    // 사원이름
    const [empName,setEmpName] = useState(props.empName);
    // 사원코드
    const [empCode,setEmpCode] = useState(props.empCode);
    // 연차 구분 코드
    const [restTypeCode,setRestTypeCode] = useState('');
    // 연차 구분 이름
    const [restTypeName,setRestTypeName]= useState('');
    // 당일 날짜
    const [requestDate,setRequestDate] = useState(today);
    // 시작일
    const [startDate,setStartDate] = useState('');
    // 종료일
    const [endDate,setEndDate] = useState('');
    // 일수
    const [numberOfDays,setNumberOfDays] = useState(0);
    // 사유
    const [cause,setCause] = useState('');
    // 상태
    const [applovalStatus,setApplovalStatus] = useState('승인대기');
    // 시작 시간
    const [startTime,setStartTime] = useState('');
    // 종료 시간
    const [endTime,setendTime] = useState('');

    

    
    const insertEXAttd = () => {

        // 유효성 검사
        if (!restTypeName) {
          alert("근태구분을 선택 해주세요.");
          return;
        }
        if (!startDate) {
          alert("시작일을 선택 해주세요.");
          return;
        }
        if (!endDate) {
          alert("종료일을 선택 해주세요.");
          return;
        }
        if (!startTime) {
          alert("시작시간을 선택 해주세요.");
          return;
        }
        if (!endTime) {
          alert("종료시간을 선택 해주세요.");
          return;
        }
        if (!numberOfDays) {
          alert("일수계산을 진행 해주세요.");
          return;
        }
        if (!cause) {
          alert("사유를 작성 해주세요.");
          return;
        }
        

        props.handleInsertExcusedAttd(
            empCode,
            empName,
            restTypeCode,
            restTypeName,
            requestDate,
            startDate,
            endDate,
            numberOfDays,
            cause,
            applovalStatus,
            startTime,
            endTime,
        );

        alert( " 신청이 완료 되었습니다.");
        location.reload();
        
      };

    //-----------------------------------1차 js------------------------

    /* 일수 계산 함수  */
    function calculateNumberOfDays(){
		var startMs = Number((new Date(startDate)).getTime());
		var endMs = Number((new Date(endDate)).getTime());
		setNumberOfDays((endMs-startMs)/(1000*60*60*24)+1);
	
}

/* 시간 선택 함수 */

    return(
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar alt="User 1" src={Avatar1} sx={{ height: 80, width: 80 }} />
                </Grid>
                <Grid item sm zeroMinWidth>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                Image size Limit should be 125kb Max.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">연차구분</InputLabel>
                <Select
                value={restTypeName}
                label="연차구분"
                onChange={(event)=>{
                    setRestTypeName(event.target.value);
                    if(event.target.value=="경조사"){setRestTypeCode("ASC001");}
                    else if(event.target.value=="오후반차"){setRestTypeCode("ASC007");}
                    else if(event.target.value=="오전반차"){setRestTypeCode("ASC006");}
                    else if(event.target.value=="연차"){setRestTypeCode("ASC005");}
                    else if(event.target.value=="예비군"){setRestTypeCode("ASC004");}
                }}
                >
                <MenuItem value={"경조사"}>경조사</MenuItem>
                <MenuItem value={"오후반차"}>오후반차</MenuItem>
                <MenuItem value={"오전반차"}>오전반차</MenuItem>
                <MenuItem value={"연차"}>연차</MenuItem>
                <MenuItem value={"예비군"}>예비군</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="신청자" placeholder="락창카이" value={empName}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="부서" placeholder="인사" onChange={(event)=>{setDept(event.target.value)}}/>
        </Grid>
        
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="직급" placeholder="사원" />
        </Grid>
        
        <Grid item xs={12} sm={6} >
                < TextField
                 fullWidth label="시작일"
                name="시작일"
                type={"date"}
                onChange={(event)=>{setStartDate(event.target.value)}}  
            />
        </Grid>
        
        <Grid item xs={12} sm={6}>
                < TextField
                fullWidth label="종료일"
                name="종료일"
                type={"date"}
                onChange={(event)=>{setEndDate(event.target.value)}}   
                defaultValue="xxxx-xx-xx"
            />
        </Grid>
        
        <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel >시작시간</InputLabel>
                <Select
                
                label="시작시간"
                onChange={(event)=>{
                    setStartTime(event.target.value.replace(":",""));
                }}
                >
                <MenuItem value={"9:00"}>9:00</MenuItem>
                <MenuItem value={"10:00"}>10:00</MenuItem>
                <MenuItem value={"11:00"}>11:00</MenuItem>
                <MenuItem value={"12:00"}>12:00</MenuItem>
                <MenuItem value={"13:00"}>13:00</MenuItem>
                <MenuItem value={"14:00"}>14:00</MenuItem>
                <MenuItem value={"15:00"}>15:00</MenuItem>
                <MenuItem value={"16:00"}>16:00</MenuItem>
                <MenuItem value={"17:00"}>17:00</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel >종료시간</InputLabel>
                <Select
                
                label="종료시간"
                
                onChange={(event)=>{
                    setendTime(event.target.value.replace(":",""));
                }}
                >
                <MenuItem value={"10:00"}>10:00</MenuItem>
                <MenuItem value={"11:00"}>11:00</MenuItem>
                <MenuItem value={"12:00"}>12:00</MenuItem>
                <MenuItem value={"13:00"}>13:00</MenuItem>
                <MenuItem value={"14:00"}>14:00</MenuItem>
                <MenuItem value={"15:00"}>15:00</MenuItem>
                <MenuItem value={"16:00"}>16:00</MenuItem>
                <MenuItem value={"17:00"}>17:00</MenuItem>
                <MenuItem value={"18:00"}>18:00</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="일수" placeholder="00일" value={numberOfDays}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="증명서" placeholder="증명서" />
        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField fullWidth label="신청사유" placeholder="집에 가고시퍼요" onChange={(event)=>{setCause(event.target.value)}}/>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="center">
            <Button variant="contained" size="large" onClick={calculateNumberOfDays}>
                    일수계산
            </Button>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="center">
            <AnimateButton>
            <Button variant="contained" size="large" onClick={insertEXAttd}>
                등록
            </Button>
            </AnimateButton>
        </Grid>
    </Grid>
    )
};

export default UserProfile;
