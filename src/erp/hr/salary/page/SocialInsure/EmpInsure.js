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

    const useStyles = makeStyles({
        table: {
            minWidth: 700
        }
    });

    const classes = useStyles();
    return (
        <div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">고용 보험율</StyledTableCell>
                                <StyledTableCell align="center">
                                    실업급여 사업자 부담율
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    고용안정사업 사업자 부담율
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    직업능력개발사업 사업자 부담율
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTest.map((row, index) => (
                                <StyledTableRow key={row[index]}>
                                    <StyledTableCell align="center">
                                        {row[index].empinsureRates} %
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row[index].wrkinsureRates} %
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row[index].vocacompetencyRates} %
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row[index].jobstabilRates} %
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
