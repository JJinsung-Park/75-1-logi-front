// material-ui
import {Grid} from '@mui/material';

// project imports
import {gridSpacing} from '../../../../../template/store/constant';

import NonCurrentAssetRegister from "./NonCurrentAssetRegister";
import NonCurrentAssetDetail from "./NonCurrentAssetDetail";
import {useState} from "react";

// ==============================|| 고정자산관리 ||============================== //

export default function NonCurrentAsset() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <NonCurrentAssetRegister />
                <NonCurrentAssetDetail />
            </Grid>
        </Grid>
    );
}
