import React, {useState} from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "template/store/constant";
import MainCard from "template/ui-component/cards/MainCard";

import CodeGrid from "./CodeGrid";
import DetailCodeGrid from "./DetailCodeGird";

function CodeInfo(){

    const [edit, setEdit] = useState(false); //셀클릭을 하면 CodeGrid에서 setEdit을 true로 바꿈
    const [divisionCodeNo, setDivisionCodeNo] = useState([]);

    const onClick = (divisionCodeNo) => { setDivisionCodeNo(divisionCodeNo); } //CodeGrid에서 넘겨 받는 divisionCodeNo

    return(  //레이아웃 나눴음
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={6}>
                <MainCard title="코드관리">
                    <CodeGrid setEdit={setEdit} onClick={onClick}/>
                </MainCard>
            </Grid>

            <Grid item xs={12} lg={6}>
                <MainCard title="상세코드관리">
                    <DetailCodeGrid divisionCodeNo={divisionCodeNo} edit={edit} onClick={onClick}/>
                </MainCard> 
            </Grid>
                     
        </Grid>
    );
}

export default CodeInfo;










// import React, {useState} from 'react';
// import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import MainCard from 'template/ui-component/cards/MainCard';
// import CardSecondaryAction from 'template/ui-component/cards/CardSecondaryAction';
// import CodeGrid from './CodeGrid';
// import DetailCodeGrid from './DetailCodeGird';


// function CodeInfo() {

//     return(

//         <>
//             <div>
//                 <Grid>
//                     <Grid item xs={12}>
//                         <MainCard content={false}>
//                             <CodeGrid />
//                         </MainCard>
//                     </Grid>
//                 </Grid>
//             </div>
//             <div>
//                 <Grid>
//                     <Grid item xs={12}>
//                         <MainCard 
//                             title="상세코드관리"
//                             content={false}
//                         >
//                             <DetailCodeGrid />
//                         </MainCard>
//                     </Grid>
//                 </Grid>
//             </div>
//         </>
//     );
// }

// export default CodeInfo;



// import React,{useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import { useDispatch,useSelector } from 'react-redux';
// import CodeGrid from './CodeGrid';
// import DetailCodeGird from './DetailCodeGird';

// const useStyles = makeStyles((theme) => ({
//     divTag: {
//       display: 'flex',
//       float:'left',  
//       width:'49.5%',
//       height:'calc(100vh - 220px)',
//       alignItems: 'center',
//       marginTop:'vh'
//     }
//   }));

// function CodeInfo() {

//     const [edit, setEdit] = useState(false);

//     const classes=useStyles();

//     const [divisionCodeNo,setDivisionCodeNo] =useState([]);

//     const onClick=(divisionCodeNo)=>{
//         setDivisionCodeNo(divisionCodeNo);
//     }
//     return (
//         <>
//             <div className={classes.divTag} style={{marginRight:'1%'}}>
//                 <CodeGrid setEdit={setEdit} onClick={onClick}/>
//             </div>
//             <div className={classes.divTag}>
//                 <DetailCodeGird divisionCodeNo={divisionCodeNo} edit={edit} onClick={onClick}/>
//             </div>
//         </>
//     );
// }

// export default CodeInfo;

