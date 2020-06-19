import React, {useState} from "react";
import { stylesheet } from "typestyle";
import {Color} from "../constants/Color";
import { AnimatedText } from "./AnimatedText";

const classNames = stylesheet({
  container: {
    color: Color.BLUE,
    textAlign: "center"
  },
  startButton: {
    display: "block",
    position: "relative",
    top: -350,
    width: 600,
    left: "calc(50% - 400px)",
    height: 200,
    padding: 30,
    fontWeight: 900,
    color: "#f3c10c !important",
    fontSize: "70pt",
    letterSpacing: "5pt",
    textShadow: "2px 2px 6px black",
    overflow: "hidden"
  },
  animatedChar: {
    fontWeight: 900,
    color: "#f3c10c !important",
    fontSize: "70pt",
    letterSpacing: "5pt",
    textShadow: "2px 2px 6px black"
  }
});


export const StartButton = () => {
  const text = "START";
  const charSize = 150;
  return <div><AnimatedText text={text} charSize={charSize} offset={80}  classes={classNames.animatedChar}/></div>;
};
