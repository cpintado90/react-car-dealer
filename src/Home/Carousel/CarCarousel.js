import { Carousel } from "@material-tailwind/react";
import { useState } from "react";
import carouselData from './CarCarousel-list.json';
 
export default function CarCarousel() {
   const [carousel] = useState(carouselData);

  return (
    <Carousel transition={{ duration: 2 }} autoplay= {true} loop={true} className="rounded-xl">
      {carousel.carouselItem.map((car) => {
        return <img
        key={car.alt}
        src={car.src}
        alt={car.alt}
        className={car.class}/>
      })}
      
    </Carousel>
  );
}