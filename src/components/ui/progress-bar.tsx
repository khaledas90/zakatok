interface ProgressBarProps {
  percentage: number;
  label: string;
  color?: string;
}

export function ProgressBar({
  percentage,
  label,
  color = "#ffb600",
}: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#5b5d6b] min-w-[60px] text-right">
        {label}
      </span>
      <div className="flex-1 h-6 bg-[#f2f2f2] rounded-md overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-sm font-medium text-[#5b5d6b] min-w-[40px]">
        {percentage}%
      </span>
    </div>
  );
}
