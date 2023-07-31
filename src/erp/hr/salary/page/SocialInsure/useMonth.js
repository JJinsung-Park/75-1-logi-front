import { useState, useEffect } from 'react';

export default function useMonth() {
    const [selectedmonth, setselectedmonth] = useState([
        {
            value: '',
            label: ''
        }
    ]);

    const thisYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    let months = [];

    useEffect(() => {
        months.push({
            value: thisYear,
            label: thisYear + '년 '
        });

        months.push({
            value: lastYear,
            label: lastYear + '년 '
        });

        setselectedmonth(months);
    }, []);

    return { selectedmonth };
}
