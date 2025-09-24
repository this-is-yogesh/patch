import "../../styles/Carousel.css";
import { useEffect, useState, useRef, use } from "react";

type ChildrenProps = {
  children: React.ReactElement[];
};

export default function Carousel({ children }: ChildrenProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number>(0);

  function startSlide() {
    const { slidesArray } = getSlides();
    let intervalId = setInterval(() => {
      setCurrentIndex(prev => {
        if (!slidesArray?.length) return 99;
        let newIndex = prev === slidesArray?.length - 1 ? 0 : prev + 1;
        [...slidesArray].forEach((slide, index) => {
          slide.setAttribute("data-active", (index === newIndex).toString());
        });
        return newIndex;
      });
    }, 2000);
    intervalRef.current = intervalId;
    return intervalId;
  }

  function getSlides() {
    const childrenRefElement = childrenRef.current;
    let slidesArray = childrenRefElement?.children;
    return { slidesArray };
  }

  useEffect(() => {
    let intervalId = startSlide();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function handleNext() {
    const { slidesArray } = getSlides();
    clearInterval(intervalRef.current);
    if (!slidesArray?.length) {
      return;
    }
    setCurrentIndex(prev => {
      let newIndex = prev === slidesArray?.length - 1 ? 0 : prev + 1;
      [...slidesArray].forEach((slide, index) => {
        slide.setAttribute("data-active", (index === newIndex).toString());
      });
      return newIndex;
    });

    startSlide();
  }
  return (
    <>
      {currentIndex}
      <div className="carousel">
        <div className="box" ref={childrenRef}>
          {children}
        </div>
        <div className="button__class">
          <button>＜</button>
          <button onClick={handleNext}>＞</button>
        </div>
      </div>
    </>
  );
}
