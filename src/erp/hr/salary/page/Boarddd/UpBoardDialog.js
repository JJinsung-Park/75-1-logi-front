import { TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MyGrid from 'util/LogiUtil/MyGrid';
import { width } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';
import BoardContainer from './BoardContainer';


const UpBoardDialog = ({
    setOpenCompanyUpDialog,
    update,
    maintitle,
    content,
    upBoard,
    handleChangeTitle
}) => {
    //const [title, settitle] = useState({update}.title);
    //const [content, setcontent] = useState([update.name]);
   // const { onClose,setonClose } = useState(false);

 /*   useEffect(() => {
        settitle(update.title)
        setcontent(update.name)
    },[]);
    */

    
    /*
      const upBoard = () => {

      //Axios.post('http://localhost:8282/hr/salary/board', { params: { title,content }, })
      
            axios.patch(
        'http://localhost:8282/hr/salary/board',
        {        
        'title':title, 
        'content':content
    }
        )
      .then(response => {



       //   dispatch({
           //   type: 'insureList',
           //   payload: response.data.baseInsureList
         // });
          //dispatch(insureList(response.data)); 
          setOpenCompanyUpDialog(false);
      })
      .catch(e => {
          alert("글 등록이 불가능해요");

     });
};

*/
// useEffect(() => {
//     setupdata(update.data.title)

// }, []);

 /*   const handleChangeTitle = useCallback(
        e => {
            if(e.target.id==='first')
           settitle(e.target.value);
           else
            setcontent(e.target.value);
        }        
    );  */
 
// props => {
//     const [itemCost, setItemCost] = useState(null);
//     const [total, setTotal] = useState(null);
//     const [itemAmount, setItemAmount] = useState(null);

//     const useStyles = makeStyles(theme => ({
//         root: {
//             flexGrow: 1
//         },
//         title: {
//             flexGrow: 1,
//             marginLeft: '3vw',
//             marginTop: 'calc(6vh - 4vh)',
//             height: '6vh',
//             fontSize: '3vh'
//         },
//         btn: {
//             flexGrow: 1,
//             marginBottom: '1vh',
//             marginTop: '1vh'
//         },
//         appBar: {
//             flexGrow: 1,
//             width: '100%',
//             height: '10vh'
//         },
//         text: {
//             flexGrow: 1,
//             fontSize: '3vh'
//         },
//         float: {
//             float: 'left'
//         }
//     }));

//     useEffect(() => {
//         props.handleSearchItemCode();
//     }, []);

//     const handleChangeTotal = useCallback(
//         e => {
//             setItemAmount(e.target.value);
//             setTotal(e.target.value * props.itemCost);
//         },
//         [itemCost, props]
//     );

//     const handleConfirmAmount = params => {
//         var row = props.gridApiEstimateDetail.getSelectedRows();
//         row[0].estimateAmount = itemAmount;
//         row[0].unitPriceOfEstimate = props.itemCost;
//         row[0].sumPriceOfEstimate = total;

//         props.gridApiEstimateDetail.updateRowData({ update: row });
//         props.close();
//     };

    return (
        <>
            <div>
                    <Typography>게시판 글</Typography>
            </div>

            <div align="center">
                <div>
                    <h4>제목</h4>
                    <TextField 
                    id='first' 
                    value={maintitle}
                    onChange={handleChangeTitle}
                    /> 
                </div>
                <div>
                    <h4>내용</h4> 
                    <textarea id='second'
                     value={content}
                      onChange={handleChangeTitle}
                      />
                    {/* <TextField id="costTxf" variant="outlined" /> */}
                </div>
                <div>
                <Button onClick={upBoard}  >수정</Button>
                
                </div>
               
            </div>
        
        </>
    
    
    );
};

export default UpBoardDialog;
