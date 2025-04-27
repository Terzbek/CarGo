import { FC } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const RatingReviews: FC = () => {
  return (
    <Card className="shadow-md border">
      <CardContent className="space-y-8 pt-8 px-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Рейтинг / Отзывы</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star size={18} className="text-yellow-400" /> 4.8 на основе 25
            отзывов
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
