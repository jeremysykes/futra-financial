interface ScoreDisplayProps {
  score: number;
  label: string;
  percentage?: number;
  size?: number;
}

export function ScoreDisplay({ score, label, percentage = 0.75, size = 220 }: ScoreDisplayProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius * 0.75;
  const filled = circumference * percentage;
  const center = size / 2;
  const startAngle = 135;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center} cy={center} r={radius}
          fill="none" className="stroke-border"
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
          transform={`rotate(${startAngle} ${center} ${center})`}
        />
        <circle
          cx={center} cy={center} r={radius}
          fill="none" className="stroke-primary"
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${filled} ${2 * Math.PI * radius}`}
          transform={`rotate(${startAngle} ${center} ${center})`}
        />
        <text
          x={center} y={center - 8}
          textAnchor="middle" dominantBaseline="central"
          className="fill-foreground font-mono font-bold"
          style={{ fontSize: size * 0.27 }}
        >
          {score}
        </text>
        <text
          x={center} y={center + size * 0.14}
          textAnchor="middle" dominantBaseline="central"
          className="fill-muted-foreground font-sans font-medium uppercase"
          style={{ fontSize: size * 0.07, letterSpacing: '0.08em' }}
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
