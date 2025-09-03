import "../styles/Layout.css";
import { useState } from "react";

interface LayoutProps {
  imagesArray: string[];
}
type Card = {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};
function generateShuffleArray(newArray: Card[]): Card[] {
  for (let i = 0; i < newArray.length; i++) {
    let shuffledIndex = Math.floor(Math.random() * newArray.length);
    [newArray[i], newArray[shuffledIndex]] = [
      newArray[shuffledIndex],
      newArray[i],
    ];
  }
  return newArray;
}

function Layout({ imagesArray }: LayoutProps) {
  const [images, setImages] = useState<Card[]>(() => {
    let clonedArray = [...imagesArray, ...imagesArray];
    let newArray: Card[] = clonedArray.map((i, index) => ({
      id: index,
      image: i,
      isFlipped: false,
      isMatched: false,
    }));
    newArray = generateShuffleArray(newArray);
    return newArray;
  });

  function flipImage(inNumber: number) {
    setImages(prevData => {
      let data = [...prevData];
      if (data[inNumber].isFlipped || data[inNumber].isMatched) return data;

      data[inNumber] = { ...data[inNumber], isFlipped: true };

      let flippedAndUnmatched = data.filter(i => i.isFlipped && !i.isMatched);

      if (flippedAndUnmatched.length === 2) {
        if (flippedAndUnmatched[0].image === flippedAndUnmatched[1].image) {
          data = data.map(card =>
            card.isFlipped && !card.isMatched
              ? { ...card, isMatched: true }
              : card
          );
        } else {
          setTimeout(() => {
            setImages(prev => {
              return prev.map(card => {
                return !card.isMatched ? { ...card, isFlipped: false } : card;
              });
            });
          }, 300);
        }
      }
      return data;
    });
  }

  function resetGame() {
    let clonedArray = [...imagesArray, ...imagesArray];
    let newArray: Card[] = clonedArray.map((i, index) => ({
      id: index,
      image: i,
      isFlipped: false,
      isMatched: false,
    }));
    newArray = generateShuffleArray(newArray);
    setImages(newArray);
  }
  return (
    <div className="skeleton_box">
      <div className="outer_box">
        {Array.from(images, (value, index) => (
          <div
            className={`mini_box ${!value?.isFlipped ? "hide" : ""}`}
            key={value.id}
            onClick={() => flipImage(index)}
          >
            {!value?.isFlipped ? (
              <div />
            ) : (
              <img src={value.image} height={"100%"} width={"100%"} />
            )}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default Layout;
