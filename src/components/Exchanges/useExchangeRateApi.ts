import axiosInstance from '../../api/axios';

export const useExchangeRate = () => {
    //get all currencies
    const apiCallGetCurrenciesList = async () => {
        try {
            const response = await axiosInstance.get('exchange/get-currencies-list');
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to fetch list of currencies');
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
            const response = await axiosInstance.get('exchange/get-saved-rates');
            return response.data.data.convertRateList;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to fetch saved rates');
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
