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

        slidesArray[prev].classList.remove("show");
        slidesArray[prev].classList.add("hide");

        slidesArray[newIndex].classList.remove("hide");
        slidesArray[newIndex].classList.add("show");
        // [...slidesArray].forEach((slide, index) => {
        //   slide.setAttribute("data-active", (index === newIndex).toString());
        // });
        return newIndex;
      });
    }, 4000);
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

  function handlePrevious() {
    const { slidesArray } = getSlides();
    clearInterval(intervalRef.current);
    if (!slidesArray?.length) {
      return;
    }
    setCurrentIndex(prev => {
      let newIndex = prev === 0 ? slidesArray?.length - 1 : prev - 1;
      [...slidesArray].forEach((slide, index) => {
        slide.setAttribute("data-active", (index === newIndex).toString());
      });
      return newIndex;
    });

    startSlide();
  }

  function handleStepper(e: React.MouseEvent, id: number) {
    clearInterval(intervalRef.current);
    let { slidesArray } = getSlides();
    setCurrentIndex(id);
    if (!slidesArray?.length) return;
    [...slidesArray].forEach((ele, index) => {
      ele.setAttribute("data-active", (index === id).toString());
    });
    startSlide();
  }
  function handleMouseEnter() {
    clearInterval(intervalRef.current);
    const childrenRefElement = childrenRef.current;
    if (!childrenRefElement) return;
    childrenRefElement.classList.add("mouseenter-class");
    childrenRefElement?.setAttribute("mouseenter", "true");
  }
  function handleMouseLeave() {
    startSlide();
    const childrenRefElement = childrenRef.current;
    if (!childrenRefElement) return;
    childrenRefElement.classList.remove("mouseenter-class");
  }

  return (
    <>
      <div className="carousel">
        <div
          className="box"
          ref={childrenRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        <div className="button__class">
          <button onClick={handlePrevious} id="prev">
            ＜
          </button>
          <button onClick={handleNext} id="next">
            ＞
          </button>
        </div>
        <div className="stepper__class">
          {Array.from(children, (_, index) => (
            <button
              onClick={e => handleStepper(e, index)}
              key={index}
              current-button={(currentIndex === index).toString()}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
