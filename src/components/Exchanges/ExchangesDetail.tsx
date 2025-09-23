import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useContext, useEffect, useState } from 'react';
import { Rate } from '../../types/types';
import { boxStyle, inputLabelStyle, selectStyle } from './ExchangeStyles';
import { useExchangeRate } from './useExchangeRateApi';
import { ExchangeContext } from './ExchangeContext';

type ExchangesDetailType = {};

type currencyType = {
    symbol: string;
    name: string;
};

export const ExchangesDetail: FC<ExchangesDetailType> = () => {
    const [currency1, setCurrency1] = useState<string>('');
    const [currency2, setCurrency2] = useState<string>('');
    const [rates, setRates] = useState<Rate[]>([]);
    const [currenciesList, setCurrenciesList] = useState<currencyType[]>([]);
    const [isUpdatedRate, setIsUpdatedRate] = useState<boolean>();

    const { apiCallGetCurrenciesList, apiCallGetExchanges, getSavedRates, apiDeleteRate } = useExchangeRate();
    const { setExhangesRatesList, setIsUpdated, isOpenExchangesDetail } = useContext(ExchangeContext);

    //get currencies list after open detail
    useEffect(() => {
        if (isOpenExchangesDetail) {
            apiCallGetCurrenciesList().then((currenciesList) => {
                setCurrenciesList(currenciesList);
            });
        }
    }, [isOpenExchangesDetail === true]);

    useEffect(() => {
        setExhangesRatesList(rates);
        setIsUpdated(isUpdatedRate);
    }, [JSON.stringify(rates)]);

    useEffect(() => {
        getSavedRates().then((savedRates) => {
            setRates(savedRates.convertRateList);
            setIsUpdatedRate(savedRates.isUpdated);
        });
    }, []);

    //get exchange rate after selecting both curencies
    useEffect(() => {
        if (currency1 && currency2) {
            getExchangeRate(currency1, currency2).then((data) => {
                if (data) {
                    saveRates(data);
                }
            });
            setCurrency1('');
            setCurrency2('');
        }
    }, [currency1, currency2]);

    const getExchangeRate = async (cur1: string, cur2: string) => {
        let ratesArray: Rate[];
        //max 4 rates
        if (rates.length < 4) {
            const exchangeRateData = await apiCallGetExchanges(cur1, cur2);
            ratesArray = [...rates, { ...exchangeRateData }];
        } else {
            ratesArray = rates;
        }
        return ratesArray;
    };

    const handleCurrencyOneChange = (event: SelectChangeEvent) => {
        setCurrency1(event.target.value.toUpperCase());
    };

    const handleCurrencyTwoChange = (event: SelectChangeEvent) => {
        setCurrency2(event.target.value.toUpperCase());
    };

    const handleDeleteRate = (rateId: number) => {
        const filteredArray = rates.filter((rate: Rate) => rate.id !== rateId);
        setRates(filteredArray);
        apiDeleteRate(rateId);
    };

    const saveRates = (ratesArray: Rate[]) => {
        setRates(ratesArray);
    };

    const renderExchangeRate = rates?.map((rate: Rate) => {
        if (rate.convertedAmount) {
            return (
                <Box sx={{ display: 'flex', alignContent: 'center' }} key={rate.id}>
                    <Typography>{`${rate.from}/${rate.to} = ${rate.convertedAmount}`}</Typography>
                    <ClearIcon
                        className="exchanges-clear-icon pointer"
                        sx={{ width: '1rem', position: 'absolute', right: '2px' }}
                        onClick={() => handleDeleteRate(rate.id)}
                    />
                </Box>
            );
        }
    });

    const renderCurrenciesList = currenciesList?.map((currency, index) => {
        return (
            <MenuItem key={`${currency.symbol}${index}`} value={currency.symbol}>
                {currency.name}
            </MenuItem>
        );
    });

    return (
        <Box className={`visible-header-detail ${isOpenExchangesDetail || 'hidden-header-detail'}`} sx={boxStyle}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    m: 2,
                }}
            >
                {/* CURRENCY 1 */}
                <Box>
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 120,
                        }}
                    >
                        <InputLabel id="select-currency-1-label" sx={inputLabelStyle}>
                            Currency
                        </InputLabel>
                        <Select
                            labelId="select-currency-1-label"
                            id="select-currency-1"
                            value={currency1}
                            onChange={handleCurrencyOneChange}
                            label="Currency 1"
                            sx={selectStyle}
                        >
                            {renderCurrenciesList}
                        </Select>
                    </FormControl>
                </Box>
                {/* CURRENCY 2 */}
                <Box>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="select-currency-2-label" sx={inputLabelStyle}>
                            Currency
                        </InputLabel>
                        <Select
                            labelId="select-currency-2-label"
                            id="select-currency-2"
                            value={currency2}
                            onChange={handleCurrencyTwoChange}
                            label="Currency 2"
                            sx={selectStyle}
                        >
                            {renderCurrenciesList}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {/* LIST */}
            <Box sx={{ display: 'flex', gap: 5 }}>
                {/* LEFT SIDE */}
                <Box sx={{ position: 'relative', pr: 4 }}>
                    {rates && renderExchangeRate?.[0]}
                    {rates && renderExchangeRate?.[1]}
                </Box>
                {/* RIGHT SIDE */}
                <Box sx={{ position: 'relative', pr: 4 }}>
                    {rates && renderExchangeRate?.[2]}
                    {rates && renderExchangeRate?.[3]}
                </Box>
            </Box>
        </Box>
    );
};
