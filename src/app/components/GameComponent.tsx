import React from "react";

import {Color} from "../constants/Color";

import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Capital } from "../models/Capital";
import { Game, GameStateEnum } from "../models/game";

import { stylesheet } from "typestyle";
import { AnimatedText } from "./AnimatedText";
import { CityComponent } from "./CityComponent";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    resultContainer: {
      position: "relative",
      top: -250,
      width: 400,
      left: "calc(50% - 200px)"
    },
    resultPaper: {
      width: 400,
      height: 100,
      backgroundColor: "#ffffff9e",
      padding: 30,
      paddingTop: 20,
      marginBottom: 50
    }
  })
);

const classNames = stylesheet({
  container: {
    color: Color.BLUE,
    textAlign: "center"
  },
  question: {
    display: "block",
    height: 50,
    left: "calc(50% - 300px)",
    position: "absolute",
    top: 50,
    width: 650,
    zIndex: 10,
    overflow: "hidden"
  },
  animatedChar: {
    fontWeight: 900,
    color: "#f3c10c",
    fontSize: "20pt",
    letterSpacing: "10pt",
    textShadow: "2px 2px 6px black"
  }
});

interface IGameProps {
  correctAnswer?: Capital;
  game: Game;
  nextGame: Game;
  userAnswer?: Capital;
  onAnswer: (setAnswer: Capital) => void;
  onStartGame: () => void;
}

export const GameComponent = (props: IGameProps) => {
  const {game, nextGame, onStartGame} = props;
  const gameFinished = game.gameState.status !== 1;

  return (
    <div style={{position: "relative"}}>
      <div className={classNames.question}><AnimatedText text="Where is hotter?" charSize={20} offset={40}  classes={classNames.animatedChar}/></div>
      <Grid container={true} spacing={0}>

        <Grid item={true} xs={6}>

          <CityComponent
            cityInfo={game.city1}
            weather={game.weather1}
            showWeather={game.gameState.status !== GameStateEnum.started}
            onSelect={props.onAnswer}
          />
        </Grid>

        <Grid item={true} xs={6}>
          <CityComponent
            cityInfo={game.city2}
            weather={game.weather2}
            showWeather={game.gameState.status !== GameStateEnum.started}
            onSelect={props.onAnswer}
          />
        </Grid>

        {gameFinished && <ResultComponent game={game} onNextGame={onStartGame}/>}

        {/* preloading googleImages */}
        {nextGame && (
          <div style={{display: "none"}}>
            <CityComponent cityInfo={nextGame.city1} showWeather={true} weather={nextGame.weather1}/>
            <CityComponent cityInfo={nextGame.city2} showWeather={true} weather={nextGame.weather2}/>
          </div>
        )}
      </Grid>
    </div>

  );
};

interface IResultProps {
  onNextGame: () => void;
  game: Game;
}

const ResultComponent = (props: IResultProps) => {
  const classes = useStyles();
  const {game, onNextGame} = props;
  const isWin = game.userAnswer.id === game.correctAnswer.id;
  return (
    <div  className={classes.resultContainer}>
      <Paper elevation={3} className={classes.resultPaper}>

        {isWin && (<div><Typography variant="h3" gutterBottom={true} color={"primary"} >WIN!</Typography></div>)}
        {!isWin && (<div><Typography variant="h3" gutterBottom={true} >Nope!!</Typography></div>)}

      </Paper>
      <Button variant="contained" color="primary" onClick={onNextGame}><Typography variant="h3" gutterBottom={false}>NEXT</Typography></Button>
    </div>
  );
};