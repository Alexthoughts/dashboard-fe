import { useContext } from 'react';
import axiosInstance from '../../api/axios';
import { ExchangeContext } from './ExchangeContext';

export const useExchangeRate = () => {
    const { setIsGetSavedRatesPending, setIsGetCurrenciesListPending } = useContext(ExchangeContext);

    const apiCallGetCurrenciesList = async () => {
        try {
            setIsGetCurrenciesListPending(true);
            const response = await axiosInstance.get('exchange/get-currencies-list');
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to fetch list of currencies');
        } finally {
            setIsGetCurrenciesListPending(false);
        }
    };

    const apiCallGetExchanges = async (cur1: string, cur2: string) => {
        try {
            const response = await axiosInstance.get(`exchange/get-exchange-rate`, {
                params: {
                    from: cur1,
                    to: cur2,
                },
            });
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to fetch rate');
        }
    };

    const getSavedRates = async () => {
        try {
            setIsGetSavedRatesPending(true);
            const response = await axiosInstance.get('exchange/get-saved-rates');
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to fetch saved rates');
        } finally {
            setIsGetSavedRatesPending(false);
        }
    };

    const apiDeleteRate = async (id: number) => {
        try {
            await axiosInstance.delete(`exchange/delete-rate/${id}`);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to delete rate');
        }
    };

    return { apiCallGetCurrenciesList, apiCallGetExchanges, getSavedRates, apiDeleteRate };
};
