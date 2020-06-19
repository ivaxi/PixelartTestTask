import React from "react";

import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Capital } from "../models/Capital";
import { ICapitalWeather } from "../models/Weather";

import Typography from "@material-ui/core/Typography";
import { ImageContainer } from "./ImageContainer";
import { TemperatureLabel } from "./TemperatureLabel";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 400,
      width: "100%"
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: "center",
      color: theme.palette.text.secondary
	  },
    image: {
      "position": "relative",
      "height": 500,
      [theme.breakpoints.down("xs")]: {
        width: "100% !important", // Overrides inline-style
        height: 100
      },
      "&:hover, &$focusVisible": {
        "zIndex": 1,
        "& $imageBackdrop": {
          opacity: 0.15
        },
        "& $imageMarked": {
          opacity: 0
        },
        "& $imageTitle": {
          border: "4px solid currentColor"
        }
      }
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%"
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity")
    },
    imageTitle: {
      position: "relative",
	  padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
	  fontSize: "30pt",
	  fontWeight: 600

    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity")
    }
  })
);


interface ICityInfoProps {
  cityInfo: Capital;
  showWeather?: boolean;
  weather: ICapitalWeather;
  onSelect?: (city: Capital) => void;
}

export const CityComponent = (props: ICityInfoProps) => {

  const { showWeather, cityInfo, weather} = props;
  const classes = useStyles();
  const imgWidth = "100%";
  const onCitySelected = () => {props.onSelect(cityInfo); };
  return (
    <Paper className={classes.paper}>
      <ButtonBase
        focusRipple={true}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{width: imgWidth}}
        onClick={onCitySelected}
        disabled={showWeather}
      >
        <ImageContainer imagePath={cityInfo.googleInfo.ImageRef}/>
        <span className={classes.imageBackdrop}/>
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            <div>{cityInfo.name}</div>
            {showWeather && (<div><TemperatureLabel value={weather.main.temp}/></div>)}
            <span className={classes.imageMarked}/>
          </Typography>
        </span>
      </ButtonBase>
    </Paper>
  );
};
