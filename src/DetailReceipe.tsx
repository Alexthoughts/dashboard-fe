import { Box, Chip, IconButton, Link, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { mockReceipes } from "./mocks/mockReceipes";
import dayjs, { Dayjs } from "dayjs";

type DetailReceipe = {
  className: string;
  onChangeRecipeImage: (image: string) => void;
  circleName: string;
  isOpenExchangesDetail: boolean;
  isOpenHolidayList: boolean;
};

type RecipeType = {
  calories: number;
  cautions: string[];
  cuisineType: string[];
  dietLabels: string[];
  digest: object[];
  dishType: string[];
  healthLabels: string[];
  image: string;
  images: object;
  ingredientLines: string[];
  ingredients: object[];
  label: string;
  mealType: string[];
  shareAs: string;
  source: string;
  totalDaily: object;
  totalNutrients: object;
  totalTime: number;
  totalWeight: number;
  uri: string;
  url: string;
  yield: number;
};

const options = {
  method: "GET",
  url: "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2",
  params: {
    type: "public",
    co2EmissionsClass: "A+",
    "field[0]": "uri",
    beta: "true",
    random: "true",
    "cuisineType[0]": "American",
    "imageSize[0]": "REGULAR",
    "mealType[0]": "Breakfast",
    "health[0]": "alcohol-cocktail",
    "diet[0]": "balanced",
    "dishType[0]": "Biscuits and cookies",
  },
  headers: {
    "Accept-Language": "en",
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
  },
};

export const DetailReceipe: FC<DetailReceipe> = ({
  className,
  onChangeRecipeImage,
  circleName,
  isOpenExchangesDetail,
  isOpenHolidayList,
}) => {
  const [listOfReceipes, setListOfReceipes] = useState<any[]>([]);
  const [renderedReceipe, setRenderedReceipe] = useState<RecipeType | null>(null);
  const [renderedReceipeIndex, setRenderedReceipeIndex] = useState<number>(0);
  const [listOfSavedReceipes, setListOfSavedReceipes] = useState<RecipeType[]>([]);
  const [isFavouriteRecipe, setIsFavouriteRecipe] = useState<boolean>(false);
  const [lastUpdateAt, setLastUpdateAt] = useState<Dayjs | null>(null);
  const [nextUpdateAt, setNextUpdateAt] = useState<Dayjs | null>(null);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
  const imageTimeout = 60; //minutes
  const nextUpdateIn = 10; //minutes
  const localStorageKeyList = "Recipes list";
  const localStorageKeyFavourite = "Favourite recipes";
  const basicImagePath = "/images/circles/salad.png";

  //API call
  const receipesApiCall = async () => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //get the recipes in first render
  useEffect(() => {
    if (!nextUpdateAt || dayjs() >= nextUpdateAt) {
      receipesApiCall()
        .then((response: any) => {
          setListOfReceipes(response.hits);
          setIsFirstRender(true);
          setLastUpdateAt(dayjs());
          localStorage.setItem(localStorageKeyList, JSON.stringify(response.hits));
        })
        .catch(() => {
          const recipesFromLocalStorage = localStorage.getItem(localStorageKeyList);
          if (recipesFromLocalStorage) {
            setListOfReceipes(JSON.parse(recipesFromLocalStorage));
          } else {
            setListOfReceipes(mockReceipes);
          }
        })
        .finally(() => {
          setNextUpdateAt(dayjs().add(nextUpdateIn, "minutes"));
          setIsFirstRender(true);
          const favoriteRecipesFromLocalStorage = localStorage.getItem(
            localStorageKeyFavourite
          );
          if (favoriteRecipesFromLocalStorage) {
            setListOfSavedReceipes(JSON.parse(favoriteRecipesFromLocalStorage));
          }
        });
    }
  }, []);

  //auto recipe change
  useEffect(() => {
    if (listOfReceipes.length === 0) return;
    if (isFirstRender) {
      getNextRecipeIndex(renderedReceipeIndex);
    } else if (nextUpdateAt && dayjs() >= nextUpdateAt) {
      //prevent recipe update after click on recipe circle
      if (!(circleName === "receipe")) getNextRecipeIndex(renderedReceipeIndex);
    }
  }, [circleName, isOpenExchangesDetail, isOpenHolidayList, isFirstRender]);

  const getNextRecipeIndex = (index: number) => {
    let newIndex = isFirstRender ? index : index + 1;
    if (newIndex < 0) {
      newIndex = listOfReceipes.length - 1;
    } else if (newIndex >= listOfReceipes.length) {
      newIndex = 0;
    }
    setNextRecipe(newIndex);
  };

  //logic for changing the recipt
  const setNextRecipe = (nextIndex: number) => {
    const recipe = listOfReceipes[nextIndex]?.recipe;
    if (!recipe) return;
    setRenderedReceipe(recipe);
    setNextUpdateAt(dayjs().add(nextUpdateIn, "minutes"));
    setRenderedReceipeIndex(nextIndex);
    setIsFirstRender(false);
  };

  //select img for the recipt
  useEffect(() => {
    if (renderedReceipe) {
      if (lastUpdateAt && dayjs() >= lastUpdateAt.add(imageTimeout, "minutes")) {
        onChangeRecipeImage(basicImagePath);
      } else if (!lastUpdateAt) {
        onChangeRecipeImage(basicImagePath);
      } else {
        onChangeRecipeImage(renderedReceipe.image);
      }
    }
  }, [renderedReceipe]);

  //save recipt to the list of saved
  const saveRecipe = () => {
    if (renderedReceipe) {
      const savedRecipesArray = [...listOfSavedReceipes, renderedReceipe];
      updateListOfFavouriteRecipes(savedRecipesArray);
    }
  };

  //delete saved recipe
  const handleDeleteSavedRecipe = (uri: string) => {
    const newListOfSavedRecipes = listOfSavedReceipes.filter(
      (recipe) => recipe.uri != uri
    );
    updateListOfFavouriteRecipes(newListOfSavedRecipes);
  };

  const updateListOfFavouriteRecipes = (newListOfSavedRecipes: RecipeType[]) => {
    setListOfSavedReceipes(newListOfSavedRecipes);
    localStorage.setItem(localStorageKeyFavourite, JSON.stringify(newListOfSavedRecipes));
  };

  //render saved recipe after click
  const handleSavedClick = (recipe: RecipeType) => {
    setRenderedReceipe(recipe);
  };

  //check if recipe in list of saved
  useEffect(() => {
    const isRecipeSaved = listOfSavedReceipes.some(
      (recipe) => recipe.uri === renderedReceipe?.uri
    );
    setIsFavouriteRecipe(isRecipeSaved);
  }, [renderedReceipe, JSON.stringify(listOfSavedReceipes)]);

  //render list of ingredients
  const ingredients = renderedReceipe?.ingredientLines?.map((ingredient: string) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  //render saved recipts
  const renderSavedRecipes = listOfSavedReceipes.map((recipe) => {
    return (
      <Chip
        label={recipe.label}
        variant="outlined"
        color="secondary"
        onClick={() => handleSavedClick(recipe)}
        onDelete={() => handleDeleteSavedRecipe(recipe.uri)}
        key={recipe.uri}
        sx={{
          height: "auto",
          maxWidth: "23%",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "2.7rem",
            lineHeight: "0.9rem",
          },
        }}
      />
    );
  });

  if (renderedReceipe && Object.keys(renderedReceipe).length === 0) {
    return <></>;
  }

  if (renderedReceipe) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          overflowY: "auto",
        }}
        className={className}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Link
            href={renderedReceipe.url}
            target="_blank"
            underline="none"
            sx={{
              fontSize: "34px",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: { md: "68%", xs: "60%" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "8rem",
              lineHeight: "2.6rem",
            }}
          >
            {renderedReceipe.label}
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: "5rem",
              alignSelf: "flex-start",
            }}
          >
            {isFavouriteRecipe ? (
              <IconButton
                aria-label="favourite"
                size="medium"
                sx={{ "&:hover": { backgroundColor: "rgba(955, 555, 9, 0.2)" } }}
                onClick={() => handleDeleteSavedRecipe(renderedReceipe.uri)}
              >
                <FavoriteIcon
                  fontSize="inherit"
                  sx={{ color: "rgba(255, 214, 0, 0.5)", width: "fit-content" }}
                />
              </IconButton>
            ) : (
              <IconButton
                aria-label="favourite"
                size="medium"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(955, 555, 9, 0.2)",
                  },
                  width: "fit-content",
                }}
                onClick={saveRecipe}
              >
                <FavoriteBorderIcon
                  fontSize="inherit"
                  sx={{ color: "rgba(255, 214, 0, 0.5)" }}
                />
              </IconButton>
            )}
            <Box sx={{ display: "flex" }}>
              {/* position: "absolute", right: "5rem" */}
              <IconButton
                aria-label="previous-recipe"
                size="medium"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(955, 555, 9, 0.2)",
                  },
                  color: "rgba(255, 214, 0, 0.5)",
                }}
                onClick={() => getNextRecipeIndex(renderedReceipeIndex - 2)}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                aria-label="next-recipe"
                size="medium"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(955, 555, 9, 0.2)",
                  },
                  color: "rgba(255, 214, 0, 0.5)",
                }}
                onClick={() => getNextRecipeIndex(renderedReceipeIndex)}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* </Box> */}

        <ul style={{ marginBottom: "10px", minHeight: "3.5rem", overflowY: "auto" }}>
          {ingredients}
        </ul>

        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ display: "flex" }}>
            <LocalFireDepartmentIcon />
            <Typography>{`${Math.round(renderedReceipe.calories)} cal`}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <AccessTimeIcon />
            <Typography>{`${renderedReceipe?.totalTime} min`}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "5px", marginBottom: "1rem" }}>
          <Chip
            label={`${renderedReceipe.cuisineType?.[0]}${
              renderedReceipe?.cuisineType?.length > 1
                ? ` and ${renderedReceipe?.cuisineType?.[1]}`
                : ""
            }`}
            sx={{
              backgroundColor: "rgba(221,128,0,0.6)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <Chip
            label={`${renderedReceipe.mealType?.[0]}${
              renderedReceipe.mealType?.length > 1
                ? `/${renderedReceipe.mealType?.[1]}`
                : ""
            }`}
            sx={{
              backgroundColor: "rgba(0,128,221,0.6)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <Chip
            label={`${renderedReceipe?.dishType?.[0]}${
              renderedReceipe?.dishType?.length > 1
                ? ` and ${renderedReceipe?.dishType?.[1]}`
                : ""
            }`}
            sx={{
              backgroundColor: "rgba(0,221,128,0.6)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          />
        </Box>
        {listOfSavedReceipes.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              minHeight: "3rem",
              overflowX: "auto",
            }}
          >
            {renderSavedRecipes}
          </Box>
        )}
      </Box>
    );
  }
};
