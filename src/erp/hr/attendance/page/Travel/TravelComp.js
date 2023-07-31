import React from "react";
import UseStyles from "./UseStyles";
import {Button,Paper,TextField,Grid,AppBar,InputLabel,Box,Typography,Toolbar,
  MenuItem,Select,FormControl,OutlinedInput} from "@mui/material"
import { AgGridReact } from "ag-grid-react";
import useInput from "util/useInput";
import TravelInput from "./TravelInput";
import axios from "axios";

//*************************출장/교육 신청 2022-10-25 CRC *************************
const TravelComp = props => {
    const columnDefs = TravelInput;
    const classes = UseStyles();

  const fromDate = useInput("2022-01-01");
  const toDate = useInput("2022-12-31");
  let selectedInput = document.getElementsByName("attdRestTypeCode")[0];
  
  const codeDivision = element => {
    if(typeof element == "undefined") return "";
    else {
       
      return element.value; 
    }
  }
  const dayOffData = useInput();
  const getInnerText = (compVal) => {
    if(!compVal) return;
    let returnVal = "";
    switch(compVal){
      case "ASC002": returnVal = "출장"; break;
       case "ASC003": returnVal = "교육"; break;
      default : alert("compVal 확인요망");
    }
    return returnVal;
  }
  
  const serchDayOff= () => {
    axios.get("http://localhost:8889/attdmgmt/excused-attnd",{   
      params:{ 
        startDate: fromDate.value,
        endDate: toDate.value,
        empCode: sessionStorage.getItem("empCodeInfo_token"),
        code: codeDivision(selectedInput)
      }
    }).then(response => {
      dayOffData.setValue(response.data.restAttdList);
    })
    .catch(err => {
      
    });
  };
  // togle
  const [costOpen, setCostOpen] = React.useState(false);
  const [attdRestOpen, setAttdRestOpen] = React.useState(false);

  function costHandleClose() {
    setCostOpen(false);
  }

  function costHandleOpen() {
    setCostOpen(true);
  }

  function attdRestHandleClose() {
    
    setAttdRestOpen(false);
  }

  function attdRestHandleOpen() {
    setAttdRestOpen(true);
  }

  const attdRestStartDate = useInput();
  const attdRestEndDate = useInput();
  const attdRestTypeCode = useInput();
  const cause = useInput();
  const cost = useInput();
  const startTime = useInput();
  const endTime = useInput();


  const BatchDailyAttdRest = () => {
    if(!codeDivision(selectedInput)) { 
      alert("근태외 구분란을 입력하세요"); return; 
    }

    const numberOfDays = (
      (new Date(attdRestEndDate.value).getTime() -
        new Date(attdRestStartDate.value).getTime()) /
      (1000 * 60 * 60 * 24)
    ).toString();

    const timeFormAlter = (primitiveTime) => {
      if(!primitiveTime) return;
      let changedTime = primitiveTime.replace(":","");
      if(changedTime.charAt(0) == 0) changedTime = changedTime.replace(/(^0+)/, "");

      return Number(changedTime);
    }
    
    const restAttdApplyData = {
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      restTypeCode: attdRestTypeCode.value,
      restTypeName: getInnerText(codeDivision(selectedInput)),
      requestDate: new Date().toISOString().substring(0, 10),
      startDate: attdRestStartDate.value,
      endDate: attdRestEndDate.value,
      cause: cause.value,
      applovalStatus: "승인대기",   // RST_ATTD테이블 칼럼 오탈자
      rejectCause: "",
      cost: "",    // getInnerText(cost.value), RST_ATTD테이블에 COST칼럼은 있지만, 해당칼럼은 NUMBER형이다. 각 항목에 대한 비용이 정의된 테이블을 찾지못했음
      startTime: timeFormAlter(startTime.value),
      endTime: timeFormAlter(endTime.value),
      numberOfDays: ( numberOfDays == "NaN" ? 0 : numberOfDays )
    };

    props.handleInsertTravel(restAttdApplyData);
    
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.topPaper}>
            <FormControl variant="outlined" className={classes.topFormControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-attdRestTypeCode-simple"
              >
              ATTD TYPE
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="attdRestTypeCode"
                    id="outlined-attdRestTypeCode-simple"
                  />
                }
                open={attdRestOpen}
                onClose={attdRestHandleClose}
                onOpen={attdRestHandleOpen}
                onChange={attdRestTypeCode.onChange}
              >
                
                <MenuItem value="ASC002">출장</MenuItem>
                <MenuItem value="ASC003">교육</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      <Grid item xs={4}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h2">출장/교육 신청</Typography>
            </Toolbar>
          </AppBar>
          <br/>
          <form>
            <TextField
              id="attdRestStartDate"
              label="출장/교육 시작일"
              type="date"
              variant="outlined"
              defaultValue={attdRestStartDate.value}
              onChange={attdRestStartDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <TextField
              id="attdRestEndDate"
              label="출장/교육 종료일"
              type="date"
              variant="outlined"
              defaultValue={attdRestEndDate.value}
              onChange={attdRestEndDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <TextField
              id="startTime"
              label="시작시간"
              type="time"
              defaultValue={startTime.value}
              onChange={startTime.onChange}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <TextField
              id="endTime"
              label="종료시간"
              type="time"
              defaultValue={endTime.value}
              onChange={endTime.onChange}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-cost-simple"
              >
                COST
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="cost"
                    id="outlined-cost-simple"
                  />
                }
                open={costOpen}
                onClose={costHandleClose}
                onOpen={costHandleOpen}
                value={cost.value}
                onChange={cost.onChange}
              >
                <MenuItem value="ASC002">출장</MenuItem>
                <MenuItem value="ASC003">교육</MenuItem>
{/*                 <MenuItem value="ETS003">자기개발지원금</MenuItem>
                <MenuItem value="ETS004">식비</MenuItem>  */}
              </Select>
            </FormControl>
            <br/>
            <TextField
              id="cause"
              label="출장/교육 사유"
              variant="outlined"
              defaultValue={cause.value}
              onChange={cause.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <Box textAlign="right">
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={BatchDailyAttdRest}
              className={classes.button}
            >
              신청
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h2">출장/교육 현황조회</Typography>
            </Toolbar>
          </AppBar>
          <br/>
          <div>
            <TextField
              id={"fromDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={fromDate.value}
              onChange={fromDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            ~
            <TextField
              id={"toDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={toDate.value}
              onChange={toDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick= {serchDayOff}
              className={classes.button}
            >
              조회
            </Button>
          </div>
          <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%"
            }}
          >
            
            <AgGridReact columnDefs={columnDefs} rowData= {dayOffData.value}  

             />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TravelComp;

//*************************초과근무 신청 =종료= 유찬 _20.08.31 *************************