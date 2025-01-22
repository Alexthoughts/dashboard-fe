import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResponse = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=f5a930d151f04b70acc044d547d6db9f`
        );
        setLocation(locationResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocation();
  }, []);

  return { location };
};

export default useLocation;
