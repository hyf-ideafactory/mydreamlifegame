import { useState, useEffect } from "react";

import Header from "./components/header";
import GoalList from "./components/goallist";
import GameBoard from "./components/gameboard";

import { REWARDS } from "./data/rewards";
import { pickWeightedReward } from "./utils/pickweightedreward";

function App() {
  const [completedGoals, setCompletedGoals] = useState(() => {
    const saved = localStorage.getItem("completedGoals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "completedGoals",
      JSON.stringify(completedGoals)
    );
  }, [completedGoals]);

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

  function handleGoalCompleted(completedGoal) {
    const reward = pickWeightedReward(REWARDS, lastReward);
    const randomTile = Math.floor(Math.random() * 21);

    setCompletedGoals(prev => [...prev, completedGoal]);
    setCurrentReward(reward);
    setLastReward(reward);
    setActiveTileIndex(randomTile);
  }

  function handleNotifyReward() {
    setCurrentReward(null);
    setActiveTileIndex(null);
  }

  function exportCompletedGoals() {
  if (completedGoals.length === 0) return;

  const header = ["Goal", "Completed At"];
  const rows = completedGoals.map(goal => [
    goal.text,
    goal.completedAt,
  ]);

  const csvContent = [
    header.join(","),
    ...rows.map(row =>
      row.map(value => `"${value}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "completed-goals.csv";
  link.click();

  URL.revokeObjectURL(url);
}


  function resetCompletedGoals() {
    if (
      window.confirm(
        "This will clear all completed goals. Continue?"
      )
    ) {
      setCompletedGoals([]);
      localStorage.removeItem("completedGoals");
    }
  }

  return (
    <div style={{ padding: "24px" }}>
      <Header />

      <div style={{ display: "flex", gap: "32px" }}>
        {/* SIDEBAR */}
        <div
          style={{
            width: "360px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <GoalList
            onGoalCompleted={handleGoalCompleted}
            completedCount={completedGoals.length}
          />

          <button
            onClick={exportCompletedGoals}
            disabled={completedGoals.length === 0}
            className="export-button"
          >
            Export Completed Goals
          </button>

          <button
            onClick={resetCompletedGoals}
            className="reset-progress"
          >
            Click Here to Reset Completed Goals to 0
          </button>
        </div>

        {/* GAME BOARD */}
        <GameBoard
          currentReward={currentReward}
          activeTileIndex={activeTileIndex}
          onNotifyReward={handleNotifyReward}
        />
      </div>
    </div>
  );
}

export default App;
