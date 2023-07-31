import React, { useState, useCallback, useEffect } from 'react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useInput from "util/useInput";
import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import SearchItemCodeDialog from '../SearchItemCodeDialog';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import SimpleModal from 'util/LogiUtil/SimpleModal';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormLabel } from '@mui/material';

const DeployHead = ({ trCondition, trItemCode, trDivisionCode, searchBom }) => {

    const [openItemCodeDialog, setOpenItemCodeDialog] = useState(false);
    const [divisionCode, setDivisionCode] = useState(null);
    const [condition, setCondition] = useState(null);
    const [data, setData] = useState(null);

    const getItemCode = useInput("");

    const theme = useTheme();

    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            paddingLeft: 10
        },
        root: {
            '& > * ': {
                margin: theme.spacing(2),
            }
        },
        tField: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 35,
            paddingBottom: 15
        },
        fieldset: {
            paddingLeft: 15
        }
    }));

    const classes = useStyles();

    const onDivisionChange = (e) => {
        setDivisionCode(e.currentTarget.value);
        trDivisionCode(e.currentTarget.value);
    };

    const onConditionChange = (e) => {
        setCondition(e.currentTarget.value);
        trCondition(e.currentTarget.value);
    };

    const handleClickOpen = () => {
        if (divisionCode === null) {
            alert("품목분류를 먼저 선택해주세요.");
            return;
        } else if(condition === null){
            alert("검색조건을 선택해주세요.");
            return;
        }  else {
            console.log(divisionCode+" && "+condition)
            getDetailCodeFetch(divisionCode);
            setOpenItemCodeDialog(true);
        }
    };

    const handleClose = (value) => {
        setOpenItemCodeDialog(false);
        if (value.data === undefined) {
            return;
        }
        getItemCode.setValue(value.data[0].detailCode);
        trItemCode(value.data[0].detailCode);
    };

    const [detailCode, getDetailCodeFetch] = useAsync((param) => api.getDetailCode(param), [], true);
    const getDetailCode = useCallback(() => {
        const params = {
            divisionCode: divisionCode
        }
        getDetailCodeFetch(params);
    }, [divisionCode, getDetailCodeFetch]);

    useEffect(() => {
        if (detailCode.data)
            setData(detailCode.data.codeList);
    }, [detailCode.data])

    return (
        <div className={classes.root}>
            <tr>
                <td>
                    <fieldset className={classes.fieldset}>
                        <legend>품목분류</legend>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-label="itemCode"
                                onChange={onDivisionChange}
                            >
                                <FormControlLabel value="IT-CI" control={<Radio />} label="완제품" />
                                <FormControlLabel value="IT-SI" control={<Radio />} label="반제품" />
                                <FormControlLabel value="IT-MA" control={<Radio />} label="원재료" />
                            </RadioGroup>
                        </FormControl>
                    </fieldset>
                </td>
                <td>
                    <fieldset className={classes.fieldset}>
                        <legend>BOM 검색조건</legend>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-label="condition"
                                onChange={onConditionChange}
                            >
                                <FormControlLabel value="forward" control={<Radio />} label="정전개" />
                                <FormControlLabel value="reverse" control={<Radio />} label="역전개" />
                            </RadioGroup>
                        </FormControl>
                    </fieldset>
                </td>
                <td>
                    <TextField
                        className={classes.tField}
                        id="itemCode"
                        InputProps={{
                            endAdornment: (
                                <Button
                                    variant="contained"
                                    onClick={() => handleClickOpen()}
                                    value="itemCode"
                                    color="secondary"
                                >
                                    검색
                                </Button>
                            )
                        }}
                        margin="normal"
                        placeholder="          품목코드검색"
                        disabled={true}
                        value={getItemCode.value}
                    />
                    <Button
                        style={{ top: 58 }}
                        variant="contained"
                        onClick={() => searchBom()}
                        color="secondary"
                    >
                        BOM 조회
                    </Button>
                </td>
            </tr>
            <SearchItemCodeDialog data={data} open={openItemCodeDialog} close={handleClose} />
        </div>
    );
};

export default DeployHead;