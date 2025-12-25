export default function Tile({
  baseSrc,
  iconSrc,
  isActive,
  reward,
  onNotify, 
  className
}) {
  console.log("Tile isActive:", isActive);
  return (
    <div className={`tile ${className || ""} ${isActive ? "flipped" : ""}`}>
      <div className="tile-inner">
        {/* Front */}
        <div className="tile-face tile-front">
          <img src={baseSrc} className="tile-base" alt="" />
          <img src={iconSrc} className="tile-icon" alt="" />
        </div>

        {/* Back */}
        <div className="tile-face tile-back">
          {reward && (
          <div className="tile-reward-content">
          <p className="reward-text">{reward}</p>

          <button
            className="redeem-button"
            onClick={onNotify}
          >
            Make it happen →
          </button>
        </div>
      )}
</div>
</div>
</div>
)};

