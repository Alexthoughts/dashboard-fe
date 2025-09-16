import { Box } from '@mui/material';
import { FC } from 'react';
import { Holiday } from './Holidays/Holiday';
import { Exchanges } from './Exchanges/Exchanges';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 1), rgba(61, 60, 60, 0.26))',
                color: 'rgba(255, 255, 255, 0.8)',
                p: 1,
                px: 3,
            }}
        >
            <Holiday />
            <Exchanges />
        </Box>
    );
};
