import { useState, useEffect } from "react";

import Header from "./components/header";
import GoalList from "./components/goallist";
import GameBoard from "./components/gameboard";

import { REWARDS } from "./data/rewards";
import { pickWeightedReward } from "./utils/pickweightedreward";

function App() {
  // Reward state
  const [activeTileIndex, setActiveTileIndex] = useState(null);
  const [currentReward, setCurrentReward] = useState(null);
  const [lastReward, setLastReward] = useState(() => {
      return localStorage.getItem("lastReward");
  });

  useEffect(() => {
    if (lastReward) {
      localStorage.setItem("lastReward", lastReward);
      }
  }, [lastReward]);

  // Called when a goal is completed
  function handleGoalCompleted() {
    if (currentReward) return;
    
    const reward = pickWeightedReward(REWARDS, lastReward);
    const randomTile = Math.floor(Math.random() * 21);
    console.log("Unlocked reward:", reward);
    console.log("Active tile index", randomTile);
    
    setCurrentReward(reward);
    setLastReward(reward);
    setActiveTileIndex(randomTile);
  }

  function handleNotifyReward() {
    localStorage.removeItem("currentReward");
    setCurrentReward(null);
    setActiveTileIndex(null);
  }

  return (
    <div style={{ padding: "24px" }}>
      <Header />

      <div style={{ display: "flex", gap: "24px" }}>
        <GoalList onGoalCompleted={handleGoalCompleted} />
        <GameBoard 
          currentReward={currentReward}
          activeTileIndex={activeTileIndex}
          onNotifyReward={handleNotifyReward} />
      </div>
    </div>
  );
}

export default App;
