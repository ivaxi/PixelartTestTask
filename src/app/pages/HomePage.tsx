import React, {useState} from "react";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import { IntroComponent } from "../components/IntroComponent";
import {Color} from "../constants/Color";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import { ICitiesState } from "../redux/modules/citiesModule";
import {translationsSelector} from "../selectors/translationsSelector";


import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";


import Paper from "@material-ui/core/Paper";
import { ConnectedLink } from "react-router5";
import { AnimatedText } from "../components/AnimatedText";
import { StartButton } from "../components/StartButton";
import { getRoutes } from "../routes/routes";


const classNames = stylesheet({
  container: {
    color: Color.BLUE,
    textAlign: "center"
  },
  backdrop: {
    zIndex: 10,
    color: "#fff"
  },
  startButton: {
    display: "block",
    position: "relative",
    top: -350,
    width: 400,
    left: "calc(50% - 200px)",
    height: 200,
    padding: 30
  },

  question: {
    display: "block",
    height: 50,
    left: "calc(50% - 300px)",
    position: "absolute",
    top: 100,
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
  },
  listStyle : {
    textAlign: "left",
    padding: 10,
    paddingLeft: 50

  },
  listItemStyle : {
    listStyleType: "disc",
    padding: 5
  }
});

interface IStateToProps  {
  translations: {
    hello: string;
  };
  citiesState: ICitiesState;
}

class HomePage extends React.Component<IStateToProps> {


  public render(): JSX.Element {
    const {translations, citiesState} = this.props;
    const routes = getRoutes();
    if (citiesState.pending) {
      return (
	  	<Backdrop className={classNames.backdrop} open={true}>
	  		<CircularProgress color="inherit"/>
		  </Backdrop>
			 );
    }
    return (
      <div>
        <div className={classNames.question}><AnimatedText text="Where is hotter?" charSize={20} offset={40}  classes={classNames.animatedChar}/></div>
      	<IntroComponent cities={citiesState.cities}/>
        <div style={{height: 10}}><ConnectedLink  routeName={routes.gamePage.name} className={classNames.startButton}><StartButton/></ConnectedLink></div>
        <div>
          <Paper elevation={3} style={{margin: 30}}>
            <ul className={classNames.listStyle}>
              <li className={classNames.listItemStyle}>
                    The list of cities includes only capitals, to guarantee the download of images from Google api.
                    Images loaded from Google PlaceAPI by reference id.
              </li>
              <li className={classNames.listItemStyle}>
                    Animation implemented by "react-spring" library
              </li>
              <li className={classNames.listItemStyle}>
                    Internal stage storage implemented by "redux", "redux-saga"
              </li>
              <li className={classNames.listItemStyle}>
                    Long live storage for storing game results implemented by "dexie", wrapper on the indexedDB
              </li>
              <li className={classNames.listItemStyle}>
                    UI components used from "Material-UI" library
              </li>
            </ul>
          </Paper>
        </div>
      </div>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      hello: translator.translate("Hello")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "settings" | "citiesState">): IStateToProps {
  return {
    translations: componentTranslationsSelector(state),
    citiesState: state.citiesState
  };
}


const connected = connect(mapStateToProps)(HomePage);
export {connected as HomePage, HomePage as UnconnectedHomePage, mapStateToProps};
