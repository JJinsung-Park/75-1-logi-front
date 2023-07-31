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
// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

function printClock() { // 시간선택 텍스트박스 누르면 뜨는거
    
    var clock = $("#clock"); // 출력할 장소 선택 => id가 clock인 div태그
    var currentDate = new Date(); // 현재시간을 괄호처럼 표시 (Wed Jul 14 2021 19:42:02 GMT+0900 (대한민국 표준시))
    var calendar = currentDate.getFullYear() + "-"
            + (currentDate.getMonth() + 1) + "-" + currentDate.getDate(); //현재년월일을 괄호처럼 표시(2021-7-14)
    amPm = 'aM'; // 초기값은 AM
    currentHours = addZeros(currentDate.getHours(), 2); //현시간
    currentMinute = addZeros(currentDate.getMinutes(), 2); //현분
    var currentSeconds = addZeros(currentDate.getSeconds(), 2); //현초

    if (currentHours >= 12) { // 현시간이 12보다 클 때는 PM으로 변경
        amPm = 'pM';
        currentHours = addZeros(currentDate.getHours(), 2);
        currentMinute = addZeros(currentDate.getMinutes(), 2);
        var currentSeconds = addZeros(currentDate.getSeconds(), 2);
    }

    currentSeconds = '<span style="font-size:30px">' + currentSeconds
            + '</span>';

    clock.html(currentHours + ":" + currentMinute + ":" + currentSeconds
            + " <span style='font-size:30px;'>" + amPm + "</span>"); //시간를 출력해 줌
    setTimeout(printClock, 1000);
}

function UserProfile(props){
    // 사원코드
    const [empCode,setempCode] = useState(props.empCode);

    //근태이름 state
    const [dayAttdName, setdayAttdName] = useState('');

    const handleChange = (event) => {
      setdayAttdName(event.target.value);


        if(event.target.value=='출근') setattdType('ADC001');
        else if(event.target.value=='퇴근') setattdType('ADC002');
        else if(event.target.value=='외출') setattdType('ADC003');
        else if(event.target.value=='귀사') setattdType('ADC004');
    };

    const empCodeChange = (event)=>{
        setempCode(event.target.value);
   
    }
    //근태코드 state
    const [attdType,setattdType] = useState('');


    const insertDayAttd = () => {
        
        if (!dayAttdName) {
          alert("근태구분을 선택 해주세요.");
          return;
        }
        props.handleInsertDayAttd(
            empCode,
            props.today,
            attdType,
            dayAttdName,
            props.time.replace(":", ""),
        );


        alert( " 기록이 완료 되었습니다.");
        location.reload();
        
    
        
      };


    const submitData=()=>{
        props.profileData(dayAttdName);

    }
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
            <TextField fullWidth label="Name" placeholder="사원이름" />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="EmpCode" placeholder="사원번호" defaultValue={props.empCode} onChange={empCodeChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Day" placeholder="날짜" defaultValue={props.today} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField id="clock" fullWidth label="Time" defaultValue={props.time} />
        </Grid>
        <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Attd</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dayAttdName}
                label="근태구분"
                onChange={handleChange}
                >
                <MenuItem value={"출근"}>출근</MenuItem>
                <MenuItem value={"퇴근"}>퇴근</MenuItem>
                <MenuItem value={"귀사"}>귀사</MenuItem>
                <MenuItem value={"외출"}>외출</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Site Information" placeholder="www.company.com" />
        </Grid>
        <Grid item xs={12} sm={12}>
        <AnimateButton>
            <Button variant="contained" size="large" onClick={insertDayAttd}>
                등록
            </Button>
        </AnimateButton>
        </Grid>
    </Grid>
    )
};

export default UserProfile;
