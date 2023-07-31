import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(empName, empCode, dayAttdName, applyDays,attendTime) {
  return { empName, empCode, dayAttdName, applyDays,attendTime};
}




export default function AttdTable(props) {

    const empdata= props.DayAttdTO;

    const rows = [];
    for(let emp of empdata){
      let AttdTime ="";
      if(emp.attendTime!=null){

        AttdTime = emp.attendTime.substring(0,2)+":"+emp.attendTime.substring(2,4);
      }


      rows.push(createData(emp.empName , emp.empCode , emp.dayAttdName ,emp.applyDays , AttdTime));
    }

    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>EMP NAME</TableCell>
            <TableCell>EMP CODE</TableCell>
            <TableCell>dayAttdName&nbsp;(근태)</TableCell>
            <TableCell>applyDay&nbsp;(날짜)</TableCell>
            <TableCell>AttdTime&nbsp;(시작시간)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.empName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.empName}
              </TableCell>
              <TableCell>{row.empCode}</TableCell>
              <TableCell>{row.dayAttdName}</TableCell>
              <TableCell>{row.applyDays}</TableCell>
              <TableCell>{row.attendTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}