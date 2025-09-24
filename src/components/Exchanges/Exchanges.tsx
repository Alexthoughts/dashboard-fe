import { FC, useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
import { Rate } from '../../types/types';
import RedDot from '../Common/RedDot';
import { ExchangeContext } from './ExchangeContext';

type ExchangesType = {};

export const Exchanges: FC<ExchangesType> = ({}) => {
    const [exchangeRates, setExchangeRates] = useState<Rate[]>([]);
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const {
        exhangesRatesList,
        isUpdated,
        isOpenExchangesDetail,
        setIsOpenExchangesDetail,
        isGetSavedRatesPending,
    } = useContext(ExchangeContext);

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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', position: 'relative' }}>
            {isGetSavedRatesPending && (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>Exchanges</Typography>
                    <CircularProgress size="1rem" color="inherit" />
                </Stack>
            )}

            {renderedExchangeRates && !isGetSavedRatesPending && (
                <>
                    {renderedExchangeRates.length > 0 ? renderedExchangeRates : <Typography>Exchanges</Typography>}
                    {isUpdated === false && (
                        <RedDot sx={{ top: '-3px', right: { md: '22px', lg: '22px', sm: '22px', xs: '22px' } }} />
                    )}
                    <KeyboardArrowUpIcon
                        className="pointer"
                        onClick={handleClickAction}
                        style={{
                            transition: 'transform 0.3s',
                            transform: isOpenExchangesDetail ? 'rotate(-180deg)' : 'rotate(0)',
                        }}
                    />
                </>
            )}
        </Box>
    );
};
