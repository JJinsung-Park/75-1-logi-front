import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import useConfig from "../../../../../template/hooks/useConfig";
import {useTheme} from '@mui/material/styles';
import axios from "axios";


// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const stockChart = ({isLoading}) => {
    const [value, setValue] = React.useState('today');
    const [chart, setChart] = useState([{
        allowanceAmount: '',
        itemName: '',
        saftyAmount: '',
        status: '',
        stockAmount: ''
    }]);
    const theme = useTheme();
    const {navType} = useConfig();

    const {primary} = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
        axios
            .get('http://localhost:9102/stock/sto/chart')
            .then(response => {
                setChart(response.data.gridRowJson);
              
            })
            .catch(e => {
              
            });
        return () => {
            setChart([]);
        };
    }, []);

    const itemName = chart.map((data) => {
        return data.itemName
    })
    const stockAmount = chart.map((data) => {
        return data.stockAmount
    })
    const saftyAmount = chart.map((data) => {
        return data.saftyAmount
    })
    const allowanceAmount = chart.map((data) => {
        return data.allowanceAmount
    })

    const chartData = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: Object.values(itemName)
            },
            legend: {
                show: true,
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            {
                name: '전체 재고',
                data: Object.values(stockAmount)
            },
            {
                name: '안전 재고',
                data: Object.values(saftyAmount)
            },
            {
                name: '사용 가능 재고',
                data: Object.values(allowanceAmount)
            }
        ],
    };

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: navType === 'dark' ? darkLight + 20 : grey200
            },
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <>
            {(
                <MainCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h3">재고 그래프</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

stockChart.propTypes = {
    isLoading: PropTypes.bool
};

export default stockChart;
