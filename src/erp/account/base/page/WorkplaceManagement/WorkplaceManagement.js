import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import * as types from '../../reducer/BaseReducer'

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import MainCard from '../../../../../template/ui-component/cards/MainCard';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import CreditCard from '@mui/icons-material/CreditCard';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {DataGrid} from "@mui/x-data-grid";
import {SEARCH_CREDITCARD_REQUEST} from "../../reducer/BaseReducer";

// tab content
function TabPanel({children, value, index, ...other}) {
  return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
           aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
            <Box sx={{p: 3}}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}


// styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

// ==============================|| 거래처관리 ||============================== //
const columns = [
  { checkboxSelection: true, width: '100', rowSelection: 'multiple' },
  {
    headerName: '거래처 코드',
    field: 'customerCode',
    sortable: true,
    width: '240'
  }, // sortable 컬럼눌러서 오름차순내림차순 가능
  {
    headerName: '거래처명',
    field: 'customerName',
    editable: true,
    width: '240'
  },
  {
    headerName: '거래처 전화번호',
    field: 'customerTelNumber',
    editable: true,
    width: '240'
  },
  {
    headerName: '사업자번호 ',
    field: 'businessLicenseNumber',
    editable: true,
    width: '240'
  },
  {
    headerName: '종목',
    field: 'customerBusinessConditions',
    editable: true,
    width: '240'
  },
  {
    headerName: '유형',
    field: 'customerBusinessItems',
    editable: true,
    width: '240'
  },
  { headerName: '상태', field: 'status', hide: true, width: '240' }
];

const CreditCardGrid = [
  // 칼럼정의
  {
    checkboxSelection: true,
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    width: '80'
  },
  { headerName: '카드 회원명', field: 'cardMemberName', editable: true },
  { headerName: '거래처코드', field: 'customerCode', sortable: true }, // sortable 컬럼눌러서 오름차순내림차순 가능
  { headerName: '거래처명', field: 'customerName', editable: true },
  { headerName: '가맹점 번호', field: 'businessLicenseNumber', editable: true },
  { headerName: '카드번호', field: 'customerNote', editable: true },
  { headerName: '유형', field: 'customerType', editable: true },
];

const FinanceAccountGrid = [
  // 칼럼정의
  {
    checkboxSelection: true,
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    width: '80'
  },
  { headerName: '금융 거래처코드', field: 'customerCode', sortable: true }, // sortable 컬럼눌러서 오름차순내림차순 가능
  { headerName: '사업장코드', field: 'workplaceCode', editable: true },
  {
    headerName: '금융기관코드',
    field: 'financiaLInstituteCode',
    editable: true
  },
  {
    headerName: '금융기관명',
    field: 'financialInstituteName',
    editable: true
  },
  { headerName: '금융거래처명', field: 'customerName', editable: true },
  { headerName: '계좌번호', field: 'accountNumber', editable: true },
  { headerName: '유형', field: 'customerType', editable: true },
  { headerName: '상태', field: 'status', hide: true }
];

export default function SimpleTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.accountCustomerList);
  const creditCardData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.creditCardList);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 useEffect(() => {
   dispatch({
     type: types.SEARCH_CUSTOMERS_REQUEST
   })
 }, []);

  const creditCardClick = () => {
   dispatch({
     type : types.SEARCH_CREDITCARD_REQUEST
   })
  }

  return (
      <MainCard>
        <Grid item xs={12}>
          <Tabs
              value={value}
              variant="scrollable"
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                mb: 3,
                '& a': {
                  minHeight: 'auto',
                  minWidth: 10,
                  py: 1.6,
                  px: 1,
                  mr: 2.2,
                  color: theme.palette.grey[600],
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                '& a.Mui-selected': {
                  color: theme.palette.secondary.main
                },
                '& a > svg': {
                  mb: '0px !important',
                  mr: 1.1
                }
              }}
          >
            <Tab
                component={Link}
                to="#"
                icon={<PersonOutlineTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
                label="일반거래처"
                {...a11yProps(0)}
            />
            <Tab
                component={Link}
                to="#"
                icon={<RecentActorsTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
                label="금융거래처"
                {...a11yProps(1)}
            />
            <Tab
                onClick={creditCardClick}
                component={Link}
                to="#"
                icon={<CreditCard sx={{fontSize: '1.3rem'}}/>}
                label="신용카드"
                {...a11yProps(2)}
            />
          </Tabs>
          <div Align="center">
            <div>
              <Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}
                      sx={{mx: 1, mb: "1px"}}>추가</Button>
              <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                      sx={{mx: 1, mb: "1px"}}>삭제</Button>
              <Button variant="contained" color="secondary" startIcon={<SaveIcon/>}
                      sx={{mx: 1, mb: "1px"}}>저장</Button>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <Grid item xs={12}>
              {/* table */}
                   <div style={{
                     height:500,
                     width:"100%"
                   }}>
                     <DataGrid columns={columns} rows={customerData} pageSize={10} getRowId={(row) => row.customerCode}/>
                   </div>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12}>
              {/* table */}
              <div style={{
                height:500,
                width:"100%"
              }}>
                <DataGrid columns={FinanceAccountGrid} rows={customerData} pageSize={10} getRowId={(row) => row.customerCode}/>
              </div>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12}>
              {/* table */}
              <div style={{
                height:500,
                width:"100%"
              }}>
                <DataGrid columns={CreditCardGrid} rows={creditCardData} pageSize={10} getRowId={(row) => row.customerCode}/>
              </div>
            </Grid>
          </TabPanel>
        </Grid>
      </MainCard>
  );
}