import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

const CompanyCodeDialog = ({ open, close, value }) => {
 
  //========================== 그리드 객체 준비 ==========================
  const [positionGridApi, setPositionGridApi] = useState();
  const onGridReady = params => {
    
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    { headerName: "회 사 코 드", field: "companyCode", width: 210 },
    { headerName: "회 사 명", field: "companyName", width: 210 },
  ];

  //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
  // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
  // onClose안에 객체(data, division) 을 가지고 JournalGrid 컴포넌트로 감.

  const handleClose = () => {
    close({
      data: positionGridApi.getSelectedRows(), // data는 클릭한 row의 정보이고,
      division: "CompanyCodeDialog",
    });
  };

  const Close = () => {
    close({
      division: "CompanyCodeDialog",
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { dark } = useThemeSwitcher();
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"xs"}
      fullScreen={fullScreen}
    >
      <DialogTitle id="responsive-dialog-title">회 사 목 록</DialogTitle>
      <DialogContent dividers>
        <List>
          <div
            className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
            style={{
              height: "300px",
              width: "100%",
              paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs}
              rowData={value} // 뿌릴 data
              rowSelection="single" // 하나만 선택 가능.
              onGridReady={onGridReady}
              onCellClicked={handleClose} // cell을 클릭하면, handleClose가 실행된다.
              getRowStyle={function(param) {
                if (param.node.rowPinned) {
                  return { "font-weight": "bold", background: "#CEFBC9" };
                }
                return { "text-align": "center" }; // bady 값 가운데정렬
              }}
            />
          </div>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyCodeDialog;
