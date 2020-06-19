import React, { useState } from "react";

import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Capital } from "../models/Capital";
import { ImageContainer } from "./ImageContainer";


interface IItroProps {
  cities: Capital[];
}

const getRandomCitiesImages = (cities: Capital[], count: number = 10): string[] => {
  const citiesToShow: Capital[] = [];
  const citiesWithImages = cities.filter((ct) => ct.googleInfo.ImageRef);
  for (let i = 0; i < count; i++) {
    let city = citiesWithImages[Math.floor(Math.random() * citiesWithImages.length)];
    if (citiesToShow.some((ct) => ct.id === city.id)) {
      city = citiesWithImages[Math.floor(Math.random() * citiesWithImages.length)];
    }
    citiesToShow.push(city);
  }
  return citiesToShow.map((city) => city.googleInfo.ImageRef);
};

export const IntroComponent = (props: IItroProps) => {
  if (!props.cities || props.cities.length === 0) {
    return <div/>;
  }
  const [cityImages, setCityImages] = useState(getRandomCitiesImages(props.cities));
  return (
    <div >
	    <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={10}
        interval={3000}
        isPlaying={true}
      >
		   <Slider style={{ height: "600px" }}>
  			{cityImages.map((cityImg, ind) => <Slide key={ind} index={ind}><ImageContainer imagePath={cityImg}/></Slide>)}
        </Slider>
      </CarouselProvider>
    </div>
  );
};
