import { Box, Button, ButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { FC, useEffect, useState } from "react";
import { DetailNotes } from "./DetailNotes";
import { DetailReceipe } from "./DetailReceipe";
import { DetailWeather } from "./DetailWeather";
import { CircleNames } from "../types/types";

const theme = createTheme({
  palette: {
    // primary: lime,
    secondary: grey,
  },
});

type DetailType = {
  detailName: CircleNames | null;
  onClose: () => void;
  onChangeRecipeImage: (image: string) => void;
  onChangeWeather: (weather: []) => void;
  isOpenExchangesDetail: boolean;
  isOpenHolidayList: boolean;
};

export const Detail: FC<DetailType> = ({
  detailName,
  onClose,
  onChangeRecipeImage,
  onChangeWeather,
  isOpenExchangesDetail,
  isOpenHolidayList,
}) => {
  const localStorageKey = "Saved detail";
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<any>();
  const [localStorageName, setLocalStorageName] = useState<any>(null);

  useEffect(() => {
    const savedDetailName = localStorage.getItem(localStorageKey);
    if (savedDetailName) {
      setLocalStorageName(savedDetailName);
      setIsVisible(true);
      setSelectedDetail(savedDetailName);
    }
  }, []);

  useEffect(() => {
    if (detailName) {
      setIsVisible(true);
      setSelectedDetail(detailName);
    }
  }, [detailName]);

  const handleCloseClick = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); //transition
  };

  const handleSaveDetail = () => {
    if (selectedDetail && localStorageName === selectedDetail) {
      localStorage.removeItem(localStorageKey);
      setLocalStorageName(null);
    } else {
      localStorage.setItem(localStorageKey, selectedDetail);
      setLocalStorageName(detailName);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`visible-detail ${isVisible ? "" : "hidden-detail"}`}
        sx={{
          position: "relative",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          maxHeight: "61vh",
          borderRadius: "20px",
          mt: 2,
          mb: 7,
          overflow: "hidden",
        }}
      >
        <div className="detail-actions">
          <ButtonGroup>
            <Button
              variant="contained"
              disableElevation
              size="small"
              color="secondary"
              onClick={handleSaveDetail}
            >
              {localStorageName === selectedDetail ? (
                <TurnedInIcon fontSize="small" />
              ) : (
                <TurnedInNotIcon fontSize="small" />
              )}
            </Button>
            <Button
              variant="contained"
              disableElevation
              size="small"
              color="error"
              onClick={handleCloseClick}
            >
              X
            </Button>
          </ButtonGroup>
        </div>

        <Box p={2} sx={{ height: "100%" }}>
          <DetailNotes
            className={`visible-detail-info ${
              selectedDetail === "notes" ? "" : "hidden-detail-info"
            }`}
          />
          <DetailReceipe
            className={`visible-detail-info ${
              selectedDetail === "receipe" ? "" : "hidden-detail-info"
            }`}
            onChangeRecipeImage={onChangeRecipeImage}
            circleName={selectedDetail}
            isOpenExchangesDetail={isOpenExchangesDetail}
            isOpenHolidayList={isOpenHolidayList}
          />
          <DetailWeather
            className={`visible-detail-info ${
              selectedDetail === "weather" ? "" : "hidden-detail-info"
            }`}
            onChangeWeather={onChangeWeather}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
