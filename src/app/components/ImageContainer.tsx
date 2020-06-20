import React, { CSSProperties } from "react";
import { googleImageIpiPath } from "../api/GoogleApi";


const styles: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "auto 100% ",
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat"
};

const backUpImageRef = "CmRaAAAAfsD2Eg6iNaj5LNZa3PK1R8eAZ0CijjB4Z44KBTBO8lKQ8FfaLXgRXinN0KZzY798xTJvdm_bcHBWFiH-gci6mvxE-aOEeVC5R8iJLgHG7UdAGf4H4_fOYex67U3cTfuJEhBB_V-lU2aP3Smucn9flq3YGhTfxz1aTdVuIYhpjATU2FNFbZ2ezQ";

export const ImageContainer = (props: {children?: any, imagePath: string}) => {
  const backUpimgStyle = {...styles, overflow: "hidden", backgroundImage: `url(${googleImageIpiPath(backUpImageRef)})`};
  const imgStyle = {...styles, margin: -225, backgroundImage: `url(${googleImageIpiPath(props.imagePath)})`};
  return (
    <span style={backUpimgStyle}>

      <span style={{...styles, backdropFilter: "blur(3px)", ...imgStyle}}>
        {props.children}
      </span>

    </span>
  );
};
