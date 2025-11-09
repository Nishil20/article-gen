import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
  className?: string;
}

export function MetricCard({ label, value, icon, className }: MetricCardProps) {
  return (
    <Card
      className={cn(
        "p-6 hover:shadow-active transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-[#737373] font-medium">{label}</p>
          <p className="text-3xl font-bold text-[#171717] font-satoshi">
            {value}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </Card>
  );
}
