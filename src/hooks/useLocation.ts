import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const ipResponse = await axios.get("https://checkip.amazonaws.com/");
        const locationResponse = await axios.get(
          `http://ip-api.com/json/${ipResponse.data.trim()}`
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
