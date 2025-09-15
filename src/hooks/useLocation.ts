import axios from 'axios';

const useLocation = () => {
    const fetchLocation = async () => {
        try {
            const locationResponse = await axios.get(
                `https://api.ipgeolocation.io/ipgeo?apiKey=f5a930d151f04b70acc044d547d6db9f`,
            );
            return locationResponse.data;
        } catch (err) {
            console.error(err);
        }
    };
    return { fetchLocation };
};

export default useLocation;
