import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  category?: string;
  onClick?: () => void;
  className?: string;
}

export function ToolCard({
  title,
  description,
  icon,
  category,
  onClick,
  className,
}: ToolCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-active transition-all duration-200 group",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-[#171717] mb-2 font-inter">
              {title}
            </h3>
            <p className="text-sm text-[#737373] leading-[1.6] mb-3">
              {description}
            </p>
            {category && (
              <p className="text-xs text-[#a3a3a3] font-medium">
                {category}
              </p>
            )}
          </div>
          <svg
            className="w-5 h-5 text-[#737373] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
