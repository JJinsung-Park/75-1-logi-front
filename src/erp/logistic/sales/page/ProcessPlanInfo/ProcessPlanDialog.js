import {Button, Container, Grid, NativeSelect, TextField} from "@mui/material";
import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MyGrid from 'util/LogiUtil/MyGrid';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function ProcessPlanDialog(props) {


    return (
        <Container component="main" maxWidth="xs">
        <MainCard
            content={false}
            title="공정 계획"
        >
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <TextField
                    size="small"
                    autoComplete="estimateAmountBox"
                    name="estimateAmountBox"
                    variant="outlined"
                    required
                    id="estimateAmountBox"
                    label="견적 수량"
                    autoFocus
                    // value={estimateAmountBox}
                    // onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    size="small"
                    variant="outlined"
                    required
                    id="stockAmountUseBox"
                    label="재고 사용량"
                    name="stockAmountUseBox"
                    // value={stockAmountUseBox}
                    // onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    size="small"
                    variant="outlined"
                    required
                    id="RequirementAmountBox"
                    label="필요 생산량"
                    name="workplaceName"
                    // value={RequirementAmountBox}
                    // onChange={onChange}
                />
            </Grid>
            </Grid>
        </MainCard>
            <Button>저장</Button>
        </Container>

    );
}

export default ProcessPlanDialog;