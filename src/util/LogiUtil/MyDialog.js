

import React, { useEffect, useState, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import {Button} from "@mui/material";


const MyDialog = (props) => {
    const open = props.open;
    let maxWidth='sm'
    if(props.maxWidth!==undefined){
        maxWidth=props.maxWidth;
    }
    const title = () => {
        if(props.title!==undefined){
            return  <DialogTitle align="center">{props.title}</DialogTitle>
        }
        return;
    }

    const close = useCallback(() =>{


        if(props.forwardTempDelete){
            props.forwardTempDelete();
        }

        props.close();

    },[props]);

    return(
        <div>
            <Dialog aria-labelledby="alert-dialog-slide-title" open={open} fullWidth={true} maxWidth={maxWidth}>
                {title()}

                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
}

export default MyDialog;