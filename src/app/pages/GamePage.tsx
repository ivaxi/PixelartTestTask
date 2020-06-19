import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import { Game } from "../models/game";
import {IStore} from "../redux/IStore";

import { ICitiesState } from "../redux/modules/citiesModule";
import { setGameResult, startGameAction } from "../redux/modules/gameActionCreators";
import { IGameState } from "../redux/modules/gameModule";

import { GameComponent } from "../components/GameComponent";
import { Capital } from "../models/Capital";

interface IStateToProps {
  citiesState: ICitiesState;
  gameState: IGameState;
}

interface IDispatchToProps {
  setAnswer: (city: Capital) => void;
  startGame: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

const getCorrectAnswer = (game: Game) => {
  return game.weather1.main.temp > game.weather2.main.temp ? game.city1 : game.city2;
};

class GamePage extends React.Component<IProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {gameState, setAnswer, startGame} = this.props;
    const correctAnswer = gameState.game && gameState.game ? getCorrectAnswer(gameState.game) : undefined;
    if (gameState.game) {
      return (
        <GameComponent
          game={gameState.game}
          nextGame={gameState.nextGame}
          correctAnswer={correctAnswer}
          onAnswer={setAnswer}
          onStartGame={startGame}
        />
      );
    } else {
      return <div><div>Loading</div></div>;
    }

  }
}


function mapStateToProps(state: Pick<IStore, "settings" | "citiesState" | "gameState">): IStateToProps {
  return {
    citiesState: state.citiesState,
    gameState: state.gameState
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    startGame: () => dispatch(startGameAction()),
    setAnswer: (city: Capital) => dispatch(setGameResult(city))
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(GamePage);
export {connected as GamePage, mapDispatchToProps, mapStateToProps, GamePage as UnconnectedGamePage};
