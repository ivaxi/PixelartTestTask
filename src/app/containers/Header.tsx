import * as React from "react";
import {connect} from "react-redux";
import {ConnectedLink} from "react-router5";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {getRoutes} from "../routes/routes";
import {translationsSelector} from "../selectors/translationsSelector";

import Switch from "@material-ui/core/Switch";
import { Dispatch } from "redux";
import { setTemperature } from "../redux/modules/settingsActionCreators";

const classNames = stylesheet({
  activeLink: {
    textDecoration: "underline"
  },
  nav: {
    $nest: {
      ul: {
        $nest: {
          li: {
            display: "inline",
            padding: "5px"
          }
        },
        listStyleType: "none",
        padding: 0
      }
    },
    marginRight: 200,
    marginLeft: 200
  },
  navContainer: {
	  position: "relative"
  },
  tempSwitch: {
    position: "absolute",
    right: 20,
    top: -10
  }
});

interface IStateToProps {
  translations: {
    home: string;
    game: string;
    history: string;
  };
  useCelsius: boolean;
}

interface IDispatchToProps {
  setTemperatureSettings: (value: boolean) => void;
}

class Header extends React.Component<IStateToProps&IDispatchToProps> {
  public changeSettings = () => {
    // eslint-disable-next-line no-invalid-this
    this.props.setTemperatureSettings(!this.props.useCelsius);
  }
  public render(): JSX.Element {
    const {translations} = this.props;
    const routes = getRoutes();

    return (
      <div className={classNames.navContainer}><nav className={classNames.nav}>
        <ul>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.homePage.name}>
              {translations.home}
            </ConnectedLink>
          </li>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.gamePage.name}>
              {translations.game}
            </ConnectedLink>
          </li>
		  <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.historyPage.name}>
              {translations.history}
            </ConnectedLink>
          </li>
        </ul>
      </nav>
      <div className={classNames.tempSwitch}>
        <span>F</span>
        <Switch
          checked={this.props.useCelsius}
          onChange={this.changeSettings}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "Display temperature setting" }}
        />
        <span>C</span>
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
	  game: translator.translate("Game"),
	  history: translator.translate("History"),
      home: translator.translate("Home")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "settings">): IStateToProps {
  return {
    translations: componentTranslationsSelector(state),
    useCelsius: state.settings.useCelsius
  };
}
function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
	  setTemperatureSettings: (value: boolean) => dispatch(setTemperature(value))
  };
}
const connected = connect(mapStateToProps, mapDispatchToProps)(Header);


export {connected as Header, Header as UnconnectedHeader, mapStateToProps};
