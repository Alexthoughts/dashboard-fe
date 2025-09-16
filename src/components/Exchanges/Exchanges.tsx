import { FC, useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
import { Rate } from '../../types/types';
import RedButton from '../Common/RedButton';
import { ExchangeContext } from './ExchangeContext';

type ExchangesType = {};

export const Exchanges: FC<ExchangesType> = ({}) => {
    const [exchangeRates, setExchangeRates] = useState<Rate[]>([]);
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const { exhangesRatesList, isUpdated, isOpenExchangesDetail, setIsOpenExchangesDetail } =
        useContext(ExchangeContext);

    useEffect(() => {
        if (exhangesRatesList?.length > 4) {
            const slicedArray = exhangesRatesList.slice(0, -1);
            setExchangeRates(slicedArray);
        } else {
            setExchangeRates(exhangesRatesList);
        }
    }, [JSON.stringify(exhangesRatesList)]);

    const handleClickAction = () => {
        setIsOpenDetail(!isOpenDetail);
        setIsOpenExchangesDetail(!isOpenDetail);
    };

    const renderedExchangeRates = exchangeRates?.map((rate) => {
        if (!rate.convertedAmount) return;
        return <Typography key={rate.id}>{`${rate.from}/${rate.to} = ${rate.convertedAmount}`}</Typography>;
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            {renderedExchangeRates?.length > 0 ? renderedExchangeRates : <p>Exchanges</p>}
            {isUpdated === false && (
                <RedButton sx={{ top: '-33px', right: { md: '44px', lg: '44px', sm: '44px', xs: '44px' } }} />
            )}
            <KeyboardArrowUpIcon
                className="pointer"
                onClick={handleClickAction}
                style={{
                    transition: 'transform 0.3s',
                    transform: isOpenExchangesDetail ? 'rotate(-180deg)' : 'rotate(0)',
                }}
            />
        </Box>
    );
};
