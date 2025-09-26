import "../styles/Layout.css";
import { useState } from "react";

interface LayoutProps {
  imagesArray: string[];
}
interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
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

export default function Layout({ imagesArray }: LayoutProps) {
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
      //if already showing img then no need to do anything
      if (data[inNumber].isFlipped || data[inNumber].isMatched) return data;

      //else flip the img 
      data[inNumber] = { ...data[inNumber], isFlipped: true };
      //see if we have two images which are flipped just now and are not matched
      let flippedAndUnmatched = data.filter(i => i.isFlipped && !i.isMatched);

//if we do have two images like that then see if both of them have similar image
      if (flippedAndUnmatched.length === 2) {
        if (flippedAndUnmatched[0].image === flippedAndUnmatched[1].image) {
//if both have similar image then run a loop and do matched true for the cards with flipped true and matched false which are basically these two cards 
          data = data.map(card =>
            card.isFlipped && !card.isMatched
              ? { ...card, isMatched: true }
              : card
          );
        } else {
  //else just put the flip key to false for all the cards which are not matched and trigger it in timeout so that it gives user time to see both cards
          setTimeout(() => {
            setImages(prev => {
              return prev.map(card => {
                return !card.isMatched ? { ...card, isFlipped: false } : card;
              });
            });
          }, 300);
        }
      }
      //return the changed data
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
            {value?.isFlipped && (
              <img src={value.image} height={"100%"} width={"100%"} />
            )}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

