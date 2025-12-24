export default function Tile({
  baseSrc,
  iconSrc,
  isActive,
  reward,
  onNotify
}) {
  console.log("Tile isActive:", isActive);
  return (
    <div className={`tile ${isActive ? "flipped" : ""}`}>
      <div className="tile-inner">
        {/* Front */}
        <div className="tile-face tile-front">
          <img src={baseSrc} className="tile-base" alt="" />
          <img src={iconSrc} className="tile-icon" alt="" />
        </div>

        {/* Back */}
        <div className="tile-face tile-back">
          {reward && (
            <>
              <p className="reward-text">{reward}</p>
              <button onClick={onNotify}>
              Redeem Reward
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
