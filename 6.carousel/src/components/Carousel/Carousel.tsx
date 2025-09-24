import "../../styles/Carousel.css";
import { useEffect, useState, useRef } from "react";

type ChildrenProps = {
  children: React.ReactElement[];
};

export default function Carousel({ children }: ChildrenProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const childrenRefElement = childrenRef.current;
  let slidesArray = childrenRefElement?.children;
  if (slidesArray?.length) {
    slidesArray[0].setAttribute("data-active", "true");
  }
    let intervalId = setInterval(() => {
      setCurrentIndex(prev => {
        if (!slidesArray?.length) return 99;
        let newIndex = prev === slidesArray?.length - 1 ? 0 : prev + 1;
        [...slidesArray].forEach((slide, index) => {
          slide.setAttribute("data-active", (index === newIndex).toString());
        });
        return newIndex;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {currentIndex}
      <div className="carousel">
        <div className="box" ref={childrenRef}>
          {children}
        </div>
      </div>
    </>
  );
}
