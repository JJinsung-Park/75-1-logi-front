/*global kakao*/
import React, { useEffect } from 'react';
import GridStyle from "./GridStyle";
import {
    Paper,
    Grid,
    AppBar,
    Typography,
    Toolbar,
} from "@material-ui/core";
const { kakao } = window;


//********** 범석 찾아오시는길 카카오 api구현 2021/90/30 **************/
const CompanyMap = () => {

    const classes = GridStyle();

    
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(35.15975257532115, 128.10621708232605), // 지도의 중심좌표
            level: 2
        };

        const map = new kakao.maps.Map(container, options);

        var marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter()
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);


    }, []);

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography component="h2" variant="h4">
                        Seoul IT Company 찾아오시는 길
                    </Typography>
                </Toolbar>
            </AppBar>
            <br />
            <Grid
                container
                spacing={8}
                alignContent="center"
                justify="center"
                alignItems="baseline"
            >
                <Grid item xs={7} alignContent={"center"}>
                    <Paper className={classes.rightPaper}>
                        <AppBar position="relative" className={classes.subCategory}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.subCategory}>경상남도 진주시 가좌길74번길 8 혜람빌딩 5층 /// TEL : 055-753-3677 ///</Typography>
                            </Toolbar>
                        </AppBar>
                        <br />
                        <div id='map' style={{
                            width: '870px',
                            height: '520px'
                        }}>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

        </div>

    );
}

export default CompanyMap;


