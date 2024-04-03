import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type MainBackgroundType = {
  children: ReactNode;
};

const MainBackground: React.FC<MainBackgroundType> = ({ children }) => {
  const [lastImageUpdateDate, setLastImageUpdateDate] = useState<string>(
    new Date().getDate().toString()
  );
  const [backgroundImageIndex, setBackgroundImageIndex] = useState<string>("0");
  const localStorageKey = "Last background update day";
  const localStorageKeyImageIndex = "Background image index";

  //Set last image update date
  useEffect(() => {
    const todayDate = new Date().getDate().toString();
    const dateFromLocalStorage = localStorage.getItem(localStorageKey);
    if (dateFromLocalStorage) {
      setLastImageUpdateDate(dateFromLocalStorage);
    }

    localStorage.setItem(localStorageKey, todayDate);
  }, []);

  //Set the image
  useEffect(() => {
    const imageIndexFromLocalStorage = localStorage.getItem(localStorageKeyImageIndex);
    const randomImageIndex = Math.floor(Math.random() * 32).toString();

    const setRandomImage = () => {
      setBackgroundImageIndex(randomImageIndex);
      localStorage.setItem(localStorageKeyImageIndex, randomImageIndex);
    };

    if (lastImageUpdateDate !== new Date().getDate().toString()) {
      //next day
      setRandomImage();
    } else {
      //the same day
      imageIndexFromLocalStorage
        ? setBackgroundImageIndex(imageIndexFromLocalStorage)
        : setRandomImage();
    }
  }, [lastImageUpdateDate]);

  const mainBoxStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    minWidth: "570px",
    maxWidth: "100vw",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)), url(src/images/backgrounds/${backgroundImageIndex}.jpg)`,
    backgroundSize: "cover",
    overflowX: "hidden",
  };
  return <Box sx={mainBoxStyle}>{children}</Box>;
};

export default MainBackground;
