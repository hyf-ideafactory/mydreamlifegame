export default function GoalList({ onGoalCompleted }) {
  console.log("GoalList rendered");

  return (
    <div
      style={{
        border: "4px solid red",
        padding: "16px",
        background: "yellow",
        zIndex: 9999,
      }}
    >
      <h2>GoalList DEBUG</h2>

      <button
        onClick={() => {
          console.log("GOAL BUTTON CLICKED");
          onGoalCompleted();
        }}
      >
        Mark Goal Complete
      </button>
    </div>
  );
}
