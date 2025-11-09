import { Card } from "@/components/ui/card";

interface ContentStatsProps {
  total: number;
  drafts: number;
  published: number;
  totalWords: number;
}

export function ContentStats({ total, drafts, published, totalWords }: ContentStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold text-[#171717] font-satoshi">
          {total}
        </div>
        <div className="text-xs text-[#737373] mt-1">Total Articles</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold text-[#ff6b35] font-satoshi">
          {drafts}
        </div>
        <div className="text-xs text-[#737373] mt-1">Drafts</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold text-[#10b981] font-satoshi">
          {published}
        </div>
        <div className="text-xs text-[#737373] mt-1">Published</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold text-[#171717] font-satoshi">
          {(totalWords / 1000).toFixed(1)}K
        </div>
        <div className="text-xs text-[#737373] mt-1">Total Words</div>
      </Card>
    </div>
  );
}
