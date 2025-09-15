import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import { getNearestHoliday, getWorkingDay } from './reusableFunctions';
import { holidayObjectType } from '../../types/types';

type HolidayProps = {
    onChange: (isOpen: boolean) => void;
    holidayList: holidayObjectType[];
    isOpenHolidayList: boolean;
};

export const Holiday: FC<HolidayProps> = ({ onChange, holidayList, isOpenHolidayList }) => {
    const [nextHolidayDay, setNextHolidayDay] = useState<string>();

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
        onChange(!isOpenHolidayList);
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
        // )
    );
};
