import React from "react";

import delay from "delay";
import { animated, Keyframes } from "react-spring/renderprops";

export const AnimatedText = (props: {text: string, charSize: number, offset: number, animationParams?: any, classes: string}) => {
  const anim = props.animationParams ? props.animationParams : { scale: [1, 1.5, 1] , rotate: [5, 0, -5] };
  const text = Array.from(props.text).map((char: string, ind: number) => (
    	<AnimatedChar key={ind} char={char} size={props.charSize} offsetLeft={ind * props.offset} animationParams={anim} classes={props.classes}/>
	  ));
  return (<div>{text}</div>);
};
const getContent = (size: number) => {
  const magnifValue = size + size / 4;
  return Keyframes.Spring(async(next) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await next({ transform: "rotate(10deg)", width: size, height: size});
      await next({ transform: "rotate(0deg)", width: magnifValue, height: magnifValue });
      await next({ transform: "rotate(-10deg)", width: size, height: magnifValue });
      await delay(2000);
      await next({ transform: "rotate(10deg)", width: magnifValue, height: magnifValue });
      await next({ transform: "rotate(0deg)", width: size, height: size });
      await next({ transform: "rotate(-10deg)", width: magnifValue, height: magnifValue });
    }
  });

};

export const AnimatedChar = (props: {char: string, size: number, offsetLeft: number, animationParams: any, classes: string}) => {
  const Content = getContent(props.size);
  return (
    <Content native={true}>
      {(transProps) => (
        <animated.div style={{ position: "absolute", left: props.offsetLeft, ...transProps }}><span className={props.classes}>{props.char}</span></animated.div>
      )}
    </Content>
  );
};


