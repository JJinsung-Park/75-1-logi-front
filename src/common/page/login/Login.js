import React, { useState } from 'react';
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade
} from '@material-ui/core';
import classnames from 'classnames';
import useInput from 'util/useInput';
// styles
import useStyles from 'common/page/login/styles';
// logo
import logo from 'util/images/logo.svg';
import google from 'util/images/google.svg';

// Dialog
import CompanyCodeDialog from 'common/page/login/CompanyCodeDialog';
import WorkPlaceCodeDialog from 'common/page/login/WorkPlaceCodeDialog';

import MyCarousal from './login/MyCarousal';
import Message from './login/Message';
import Particle from './login/Particles';

import { makeStyles } from '@material-ui/core/styles';

const Login = ({
    handleLogin,
    status,
    errorMsg,
    isLogin,
    history,
    searchCode,
    companyCode,
    workPlaceCode
}) => {
    const classes = useStyles();
    //const userDispatch = useUserDispatch(); // global --UserContext에 필요한 함수

    const [empCode, setEmpcode] = useState('');
    const [password, setPassword] = useState('');
    const [companyCodes, setCompanycodes] = useState('');
    const [workplaceCodes, setWorkplacecodes] = useState('');
    // local --기존 스테이트들은 TAP2에서 계정생성을 위한 작업으로 남겨두었다
    // 사가로 구현시 삭제하자 그냥 삭제시 오류발생
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTabId, setActiveTabId] = useState(0);
    const [nameValue, setNameValue] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [openWorkPlaceCodeDialog, setOpenWorkPlaceCodeDialog] = useState(false);
    const [openCompanyCodeDialog, setOpenCompanyCodeDialog] = useState(false);

    const enter = () => {
        handleLogin(empCode, password, companyCodes, workplaceCodes);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            enter();
        }
    };

    const handleClickOpen = Comparing => {
        switch (Comparing) {
            case 'companyCode':
                searchCode({ type: Comparing });
                setOpenCompanyCodeDialog(true);
                break;
            case 'workplaceCode':
                searchCode({ type: Comparing, companyCode: companyCodes });
                setOpenWorkPlaceCodeDialog(true);
                break;
            default:
                break;
        }
    };

    const handleClose = value => {
        switch (value.division) {
            case 'CompanyCodeDialog':
                setOpenCompanyCodeDialog(false);
                if (value.data === undefined) return;
                setCompanycodes(value.data[0].companyCode);
                break;
            case 'WorkPlaceCodeDialog':
                setOpenWorkPlaceCodeDialog(false);
                if (value.data === undefined) return;
                setWorkplacecodes(value.data[0].workplaceCode);
                break;
            default:
                break;
        }
    };

    const easterEgg = () => {
        handleLogin('1111', '1111', 'COM-01', 'BRC-01');
    };

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <MyCarousal className={classes.logotypeImage} />
                <Message />
                <Particle />
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <button className={classes.easterEgg} onClick={easterEgg}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                        <Tab label="New User" classes={{ root: classes.tab }} />
                    </Tabs>

                    <CompanyCodeDialog
                        open={openCompanyCodeDialog}
                        close={handleClose}
                        value={companyCode}
                    />

                    <WorkPlaceCodeDialog
                        open={openWorkPlaceCodeDialog}
                        close={handleClose}
                        value={workPlaceCode}
                    />

                    {// Login 탭 내용
                    activeTabId === 0 && (
                        <>
                            <Typography variant="h2" className={classes.greeting}>
                                Good Morning User
                            </Typography>
                            <Fade in={!isLogin}>
                                <Typography color="secondary" className={classes.errorMessage}>
                                    {errorMsg}
                                </Typography>
                            </Fade>
                            <TextField
                                id="companyCode"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    },
                                    endAdornment: (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleClickOpen('companyCode')}
                                            value="companyCode"
                                        >
                                            search
                                        </Button>
                                    )
                                }}
                                value={companyCodes}
                                margin="normal"
                                placeholder="회사코드"
                                fullWidth
                                disabled={true}
                                style={{ backgroundColor: "white" }}
                            />

                            <TextField
                                id="workplaceCode"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    },
                                    endAdornment: (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleClickOpen('workplaceCode')}
                                            value="workplaceCode"
                                        >
                                            search
                                        </Button>
                                    )
                                }}
                                value={workplaceCodes}
                                onKeyPress={handleKeyPress}
                                margin="normal"
                                placeholder="사업장코드"
                                fullWidth
                                disabled={true}
                                style={{ backgroundColor: "white" }}
                            />
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={empCode}
                                onChange={e => setEmpcode(e.target.value)}
                                margin="normal"
                                placeholder="사원코드"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                margin="normal"
                                placeholder="비밀번호"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.formButtons}>
                                {status === 'WAITING' ? (
                                    <CircularProgress size={26} className={classes.loginLoader} />
                                ) : (
                                    <Button
                                        disabled={empCode.length === 0 || password.length === 0}
                                        onClick={enter}
                                        variant="contained"
                                        size="large"
                                        className={classes.loginButton}
                                    >
                                        Login
                                    </Button>
                                )}
                                <Button
                                    color="primary"
                                    size="large"
                                    className={classes.forgetButton}
                                >
                                    Forget Password
                                </Button>
                            </div>
                        </>
                    )}

                    {// New User 탭 내용 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    activeTabId === 1 && (
                        <>
                            <Typography variant="h1" className={classes.greeting}>
                                Welcome!
                            </Typography>
                            <Typography variant="h2" className={classes.subGreeting}>
                                Create your account
                            </Typography>
                            <Fade in={error}>
                                <Typography color="secondary" className={classes.errorMessage}>
                                    Something is wrong with your login or password :(
                                </Typography>
                            </Fade>
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={nameValue}
                                onChange={e => setNameValue(e.target.value)}
                                margin="normal"
                                placeholder="Full Name"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={loginValue}
                                onChange={e => setLoginValue(e.target.value)}
                                margin="normal"
                                placeholder="Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                value={passwordValue}
                                onChange={e => setPasswordValue(e.target.value)}
                                margin="normal"
                                placeholder="Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.creatingButtonContainer}>
                                {isLoading ? (
                                    <CircularProgress size={26} />
                                ) : (
                                    <Button
                                        disabled={
                                            loginValue.length === 0 ||
                                            passwordValue.length === 0 ||
                                            nameValue.length === 0
                                        }
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className={classes.createAccountButton}
                                    >
                                        Create your account
                                    </Button>
                                )}
                            </div>
                            <div className={classes.formDividerContainer}>
                                <div className={classes.formDivider} />
                                <Typography className={classes.formDividerWord}>or</Typography>
                                <div className={classes.formDivider} />
                            </div>
                            <Button
                                size="large"
                                className={classnames(
                                    classes.googleButton,
                                    classes.googleButtonCreating
                                )}
                            >
                                <img src={google} alt="google" className={classes.googleIcon} />
                                &nbsp;Sign in with Google
                            </Button>
                        </>
                    )}
                </div>
                <Typography color="primary" className={classes.copyright}>
                    © 2021 SeoulIt, Academy. All rights reserved.
                </Typography>
            </div>
        </Grid>
    );
};

export default Login;
