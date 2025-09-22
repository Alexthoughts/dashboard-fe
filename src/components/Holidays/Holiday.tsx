import { FC, useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import { getNearestHoliday, getWorkingDay } from './reusableFunctions';
import { HolidaysContext } from './HolidaysContext';

type HolidayProps = {};

export const Holiday: FC<HolidayProps> = ({}) => {
    const [nextHolidayDay, setNextHolidayDay] = useState<string>();

    const { holidayList, isOpenHolidayList, setIsOpenHolidayList } = useContext(HolidaysContext);

    console.log(holidayList);

    useEffect(() => {
        if (holidayList.length > 0) {
            setNextHoliday();
        }
    }, [holidayList]);

    const setNextHoliday = () => {
        const nearestHoliday = getNearestHoliday(holidayList);
        let nextHoliday: string;

        //nearestHoliday = undefined, means that no more holidays this year
        if (!nearestHoliday) {
            nextHoliday = `New Year's Day, 01 January`;
        } else {
            nextHoliday = `${nearestHoliday.name}, ${dayjs(nearestHoliday.date).format(
                'DD MMMM',
            )} ${getWorkingDay(dayjs(nearestHoliday.date).day())}`;
        }

        setNextHolidayDay(nextHoliday);
    };

    const clickAction = () => {
        setIsOpenHolidayList(!isOpenHolidayList);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            {nextHolidayDay && (
                <>
                    <Typography>Next public holiday: {nextHolidayDay}</Typography>
                    <KeyboardArrowUpIcon
                        className="pointer"
                        onClick={clickAction}
                        style={{
                            transition: 'transform 0.3s',
                            transform: isOpenHolidayList ? 'rotate(0)' : 'rotate(180deg)',
                        }}
                    />
                </>
            )}
        </Box>
    );
};
