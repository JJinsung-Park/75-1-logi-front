import React, { useState } from "react";
import UseStyles from "./UseStyles";
import {Paper,TextField,Button,Grid,AppBar,InputLabel,Box,Typography,Toolbar,
  MenuItem,Select,FormControl,OutlinedInput} from "@material-ui/core"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useAxios from "util/useAxios";
import useInput from "util/useInput";
import RestAttdInput from "./RestAttdInput";
import { useDispatch } from "react-redux";
import { REST_ATTD_REQUEST } from "erp/hr/attendance/reducer/RestReducer"
import moment from "moment";

//*************************외출 및 조퇴 시작 _준서 _20.08.24 *************************
const RestAttdComp = props => {
    const columnDefs = RestAttdInput;
    const classes = UseStyles();

  const fromDate = useInput("2021-01-01");
  const toDate = useInput("2021-12-31");
  let selectedInput = document.getElementsByName("attdRestTypeCode")[0];
  //오늘 날짜
  let today = moment().format("YYYY-MM-DD");

  const codeDivision = element => {
    if(typeof element == "undefined") return "";
    else {
      
      return element.value; 
    }
  }

  const getInnerText = (compVal) => {
    if(!compVal) return;
    let returnVal = "";
    switch(compVal){
      case "ADC003": returnVal = "공외출"; break;
      case "ADC005": returnVal = "사외출"; break;
      case "DAC004": returnVal = "조퇴"; break;
      case "ETS001": returnVal = "출장수당"; break;
      case "ETS002": returnVal = "유류비"; break;
      case "ETS003": returnVal = "자기개발지원금"; break;
      case "ETS004": returnVal = "식비"; break;
      default : alert("compVal 확인요망");
    }
    return returnVal;
  }
  
  const fetchAttdRestList_axiosOptions = {
    url: "http://localhost:8282/hr/attendance/findRestAttdList",
    //headers : {"Context-Type": "application/json"},
    fetchOnStart: false,
    method: "get",
    params: {
      startDate: fromDate.value,
      endDate: toDate.value,
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      code: codeDivision(selectedInput)
    }
  };
  
  const { data, fetch } = useAxios(fetchAttdRestList_axiosOptions);   // 조회를 사가로 했으면 결제승인페이지가 쉬웠을듯
    
  const fetchAttdRestList = () => {
    fetch();
    
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
  const [attdRestStartDate, setAttdRestStartDate] = useState(today);
  const [attdRestEndDate, setAttdRestEndDate] = useState(today);
 // const attdRestStartDate = useInput();
 // const attdRestEndDate = useInput();
  const attdRestTypeCode = useInput();
  const cause = useInput();
  const cost = useInput();
  const startTime = useInput();
  const endTime = useInput();

  const dispatch = useDispatch();

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
    
    const data = {
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      restTypeCode: attdRestTypeCode.value,
      restTypeName: getInnerText(codeDivision(selectedInput)),
      requestDate: new Date().toISOString().substring(0, 10),
      startDate: attdRestStartDate,
      endDate: attdRestEndDate,
      cause: cause.value,
      applovalStatus: "승인대기",   // RST_ATTD테이블 칼럼 오탈자
      rejectCause: "",
      cost: "",    // getInnerText(cost.value), RST_ATTD테이블에 COST칼럼은 있지만, 해당칼럼은 NUMBER형이다. 각 항목에 대한 비용이 정의된 테이블을 찾지못했음
      startTime: timeFormAlter(startTime.value),
      endTime: timeFormAlter(endTime.value),
      numberOfDays: ( numberOfDays == "NaN" ? 0 : numberOfDays )
    };
    dispatch({ type: REST_ATTD_REQUEST, data: data });
    
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
                <option value="ADC003">공외출</option>
                <option value="ADC005">사외출</option>
                <option value="DAC004">조퇴</option>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      <Grid item xs={4}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근태외 신청</Typography>
            </Toolbar>
          </AppBar>
          <br/>
          <form>
            <TextField
              id="attdRestStartDate"
              label="근태외 시작일"
              type="date"
              variant="outlined"
              defaultValue={attdRestStartDate}
              onChange={e => {
                setAttdRestStartDate(e.target.value);
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/><br/>
            <TextField
              id="attdRestEndDate"
              label="근태외 종료일"
              type="date"
              variant="outlined"
              defaultValue={attdRestEndDate}
              onChange={e => {
                setAttdRestEndDate(e.target.value);
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/><br/>
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
            <br/><br/>
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
            <br/><br/>
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
                <MenuItem value="ETS001">출장수당</MenuItem>
                <MenuItem value="ETS002">유류비</MenuItem>
                <MenuItem value="ETS003">자기개발지원금</MenuItem>
                <MenuItem value="ETS004">식비</MenuItem>
              </Select>
            </FormControl>
            <br/><br/>
            <TextField
              id="cause"
              label="근태외 사유"
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
              <Typography variant="h5">근태외 현황조회</Typography>
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
              onClick= {fetchAttdRestList}
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
            <AgGridReact columnDefs={columnDefs} rowData={data ? data : []} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RestAttdComp;

//*************************외출 및 조퇴 종료 _준서 _20.08.24 *************************