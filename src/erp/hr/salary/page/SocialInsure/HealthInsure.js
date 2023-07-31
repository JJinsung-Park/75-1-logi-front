import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const HealthInsure = ({ dataTest }) => {
 
    const StyledTableCell = withStyles(theme => ({
        head: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white
        },
        body: {
            fontSize: 14
        }
    }))(TableCell);

    

    const StyledTableRow = withStyles(theme => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover
            }
        }
    }))(TableRow);

    // function createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    // }

    //const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0)];

    const useStyles = makeStyles({
        table: {
            minWidth: 700
        }
    });

    const classes = useStyles();
    return (
        <div>
            {/* {dataTest.map((insure, index) => {
                return <textarea key={index} value={insure.jobstabilRates}></textarea>;
            })} */}
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">건강보험 부담율</StyledTableCell>
                                <StyledTableCell align="center">장기보험 부담율</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {dataTest.map((row, num) => (
                                <StyledTableRow key={row[num]}>
                                    <StyledTableCell align="center">
                                        {row[num].healthinsureRates} %
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
    
                                        {row[num].longtermcareRate} %
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}   
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default HealthInsure;
