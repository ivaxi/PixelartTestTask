import * as React from "react";
import {connect} from "react-redux";
import { Dispatch } from "redux";

import { Button } from "@material-ui/core";
import { HistoryComponent } from "../components/HistoryComponent";
import { Game } from "../models/game";
import { IStore } from "../redux/IStore";
import { cleanHistory } from "../redux/modules/gameActionCreators";


interface IStateToProps {
  gameHistory: Game[];
}
interface IDispatchToProps {
  cleanHistory: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class HistoryPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {gameHistory} = this.props;

    if (gameHistory == null) {
      return (<div>Loading...</div>);
    } else {
	  const sorted = gameHistory.reverse();
	  return (
        <div>
	  		<HistoryComponent history={sorted}/>
          {gameHistory.length > 0 && (
			  <Button variant="contained" onClick={this.props.cleanHistory} color="secondary">
        		Clean scores history
			  </Button>
			  )
          }
	  	</div>
	  );
    }
  }
}

function mapStateToProps(state: Pick<IStore, "settings" | "gameState">): IStateToProps {
  return {
    gameHistory: state.gameState.gameHistory
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    cleanHistory: () => dispatch(cleanHistory())
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
export {connected as HistoryPage, mapStateToProps, HistoryPage as UnconnectedHistoryPage};
