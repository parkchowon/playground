import { useEffect, useRef, useState } from "react";
import walkChii from "../../img/walking.png";
import grassChii from "../../img/working.png";

import "./Pikachu.css";

function Pikachu() {
  const pikaRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isRight, setIsRight] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 65: //A
          if (x !== 0) {
            moveXY(x, "left", false);
            checkDirection(false);
          }
          break;
        case 68: //D
          if (x !== 630) {
            moveXY(x, "left", true);
            checkDirection(true);
          }
          break;
        case 83: //S
          if (y !== 630) {
            moveXY(y, "top", true);
          }
          break;
        case 87: //W
          if (y !== 0) {
            moveXY(y, "top", false);
          }
          break;
        case 32: //space bar
          jumpPika();
          break;
        case 16:
          grabGrass();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  //몸 방향 바꾸기
  const checkDirection = (value) => {
    if (!value) {
      setIsRight(value);
      pikaRef.current.style.setProperty("transform", "rotateY(180deg)");
    } else {
      pikaRef.current.style.setProperty("transform", "rotateY(0deg)");
      setIsRight(value);
    }
  };

  //움직이기
  const moveXY = (a, direction, side) => {
    let move = a;
    side === true ? (move = move + 70) : (move = move - 70);
    direction === "left" ? setX(move) : setY(move);
    const moving = pikaRef.current.style.setProperty(direction, `${move}px`);
    return moving;
  };

  //점프하기
  const jumpPika = () => {
    if (isRight) {
      pikaRef.current.style.setProperty("animation", "jumpR 300ms");
    } else {
      pikaRef.current.style.setProperty("animation", "jumpL 300ms");
    }
    setTimeout(
      () => pikaRef.current.style.setProperty("animation", "none"),
      200
    );
  };

  //풀뽑기
  const grabGrass = () => {
    pikaRef.current.style.backgroundImage = `url(${grassChii})`;
    setTimeout(() => {
      pikaRef.current.style.backgroundImage = `url(${walkChii})`;
    }, 1000);
  };

  return <div ref={pikaRef} className="pikachu-container"></div>;
}

export default Pikachu;
