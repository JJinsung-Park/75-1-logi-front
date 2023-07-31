import React from 'react';
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import MainCard from 'template/ui-component/cards/MainCard';
import { Button } from '@mui/material';

const HrAppBar = (props) => {
    return (
       
        <MainCard> 
            {props.title}
       
            
         </MainCard>     
    )
}

export default HrAppBar