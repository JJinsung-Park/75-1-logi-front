// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'template/ui-component/cards/MainCard';
import TotalGrowthBarChart from "../../../util/TotalGrowthBarChart";

// ==============================|| SAMPLE PAGE ||============================== //



const SamplePage = () => (
    <MainCard title="Sample Card">
        <Typography variant="body2">
            72기 리액트 프로젝트
        <TotalGrowthBarChart />
        </Typography>
    </MainCard>
);

export default SamplePage;
