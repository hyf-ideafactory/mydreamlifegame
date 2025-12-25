import { useState, useEffect } from "react";

export default function GoalList({ onGoalCompleted, completedCount }) {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("activeGoals");
    return saved ? JSON.parse(saved) : [];
  });

  console.log("GoalList completedCount prop:", completedCount);


  const [newGoal, setNewGoal] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const MAX_GOALS = 20;

  useEffect(() => {
    localStorage.setItem("activeGoals", JSON.stringify(goals));
  }, [goals]);

  function addGoal() {
    if (!newGoal.trim()) return;
    if (goals.length >= MAX_GOALS) return;

    setGoals([
      ...goals,
      { id: Date.now(), text: newGoal.trim() },
    ]);

    setNewGoal("");
  }

  function removeGoal(id) {
    setGoals(goals.filter(goal => goal.id !== id));
    if (selectedGoalId === id) setSelectedGoalId(null);
  }

  function toggleSelect(goalId) {
    setSelectedGoalId(prev =>
      prev === goalId ? null : goalId
    );
  }

  function confirmComplete() {
    const goal = goals.find(g => g.id === selectedGoalId);
    if (!goal) return;

    const completed = {
      ...goal,
      completedAt: new Date().toISOString(),
    };

    setGoals(goals.filter(g => g.id !== selectedGoalId));
    setSelectedGoalId(null);

    onGoalCompleted(completed);
  }

  const remainingSlots = MAX_GOALS - goals.length;

  return (
    <div className="goal-list">
      <h2>Your Goals</h2>

      {/* Instructions */}
      <div className="goal-section goal-instructions">

      <p>
        Add up to <strong>{MAX_GOALS}</strong> active goals at a time.
        Once you've completed a goal, click the box beside it and select "Mark as Completed" to unlock a reward.
        You can also remove a goal at any time by clicking the "X" icon beside it. </p>
        <p>NOTE: You can only select one goal at a time for completion, removal, etc. 
        </p>

      <p style={{ fontStyle: "italic", marginBottom: "12px", marginTop: "20px" }}>
        <strong>You can add {remainingSlots} more goal
        {remainingSlots !== 1 && "s!"} Each completed goal unlocks space for another.</strong>
      </p>
      </div>

      {/* Goal list */}
      <div className="goal-section goal-items">
        {goals.map(goal => (
          <div
            key={goal.id}
            className={`goal-item ${
              selectedGoalId === goal.id ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedGoalId === goal.id}
              onChange={() => toggleSelect(goal.id)}
            />

            <span className="goal-text">{goal.text}</span>

            <button
              className="remove-goal"
              onClick={() => removeGoal(goal.id)}
            >
              ✕
            </button>
          </div>
        ))}

      {/* Confirm completion */}
      {selectedGoalId && (
        <div className="goal-section goal-confirm">
        <button
          onClick={confirmComplete}
          style={{ marginTop: "12px", width: "100%" }}
        >
          Mark as Completed
        </button>
        </div>
      )}

      {/* Add new goal */}
      <div className="goal-section goal-add">
        <div className="goal-add-row">
        <textarea
          value={newGoal}
          placeholder="Add a new goal"
          onChange={e => setNewGoal(e.target.value)}
          rows={1}
        />
        <button
          onClick={addGoal}
          disabled={goals.length >= MAX_GOALS}
        >
          Add Goal
        </button>
        </div>
      </div>

      {/* Inspirational progress */}
      <div className="goal-section goal-progress"></div>
      <p style={{ marginTop: "16px", fontWeight: "500" }}>
        You’ve completed <strong>{completedCount}</strong> goal
        {completedCount !== 1 && "s"} so far 🎉
      </p>
    </div>
    </div>
  );
}
