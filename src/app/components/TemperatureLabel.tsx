import * as React from "react";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";


interface ITempLabelProps {
  value: number;
  useCelsius: boolean;
}

const TemperatureLabel = (props: ITempLabelProps) => {
  const useCelsius = props.useCelsius === true;
  const temp =  useCelsius ? ((5 / 9) * (props.value - 32)).toFixed(1) : props.value;

  return <span>{temp}{useCelsius ? "C" : "F"}</span>;
};


function mapStateToProps(state: Pick<IStore, "settings">): {useCelsius: boolean} {
  return {
	  useCelsius: state.settings.useCelsius
  };
}

const connected = connect(mapStateToProps)(TemperatureLabel);
export {connected as TemperatureLabel, mapStateToProps};
