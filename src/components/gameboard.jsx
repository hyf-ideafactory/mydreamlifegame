import Tile from "./tile";

import tileBase from "../assets/tile-base.svg";
import lockIcon from "../assets/icon-lock.svg";
import questionIcon from "../assets/icon-question.svg";
import sparkleIcon from "../assets/icon-sparkle.svg";

const ICONS = [
  ...Array(7).fill(lockIcon),
  ...Array(7).fill(questionIcon),
  ...Array(7).fill(sparkleIcon),
];

export default function GameBoard({ 
  currentReward, 
  activeTileIndex, 
  onNotifyReward 
}) {
  console.log("gameboard activeTileIndex:", activeTileIndex);
  return (
    <div>
      <div className="tile-grid">
        {ICONS.map((icon, index) => (
          <Tile
            key={index}
            baseSrc={tileBase}
            iconSrc={icon}
            isActive={index === activeTileIndex}
            reward={currentReward}
            onNotify={onNotifyReward}
            className="tile-enter"
          />
        ))}
      </div>
    </div>
  );
}
