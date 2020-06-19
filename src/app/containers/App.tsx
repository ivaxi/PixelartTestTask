import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {createSelector} from "reselect";
import {State as IRouteState} from "router5";
import {stylesheet} from "typestyle";
import {config as appConfig} from "../../../config";
import {setupCss} from "../helpers/setupCss";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {GamePage} from "../pages/GamePage";
import {HistoryPage} from "../pages/HistoryPage";
import {HomePage} from "../pages/HomePage";
import {IStore} from "../redux/IStore";
import {loadCities as loadCitiesActionCreator} from "../redux/modules/citiesActionCreators";
import { loadGameHistory } from "../redux/modules/gameActionCreators";
import {RoutePageMap} from "../routes/routes";
import {translationsSelector} from "../selectors/translationsSelector";
import {Header} from "./Header";

setupCss();

const classNames = stylesheet({
  container: {
    margin: 0,
    padding: 0,
    textAlign: "center"
  }
});

interface IStateToProps {
  route: IRouteState;
  translations: {
    notFound: string;
  };
}
interface IDispatchToProps {
  loadCities: () => void;
  loadGameHistory: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class App extends React.Component<IProps> {
  private components: RoutePageMap = {
    historyPage: HistoryPage,
    gamePage: GamePage,
    homePage: HomePage
  };

  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.props.loadCities();
    this.props.loadGameHistory();
  }

  public render(): JSX.Element {
    const {route, translations: {notFound}} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={classNames.container}>
        <Helmet {...appConfig.app.head}/>
        <Header/>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>{notFound}</div>}
      </section>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      notFound: translator.translate("Not found")
    };
  }
);

const mapStateToProps = (state: Pick<IStore, "router" | "settings" | "citiesState">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state),
  translations: componentTranslationsSelector(state)
});

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
	  loadCities: () => dispatch(loadCitiesActionCreator.invoke(null)),
	  loadGameHistory: () => dispatch(loadGameHistory())
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(App);

export {classNames, connected as App, App as UnconnectedApp, mapStateToProps};
