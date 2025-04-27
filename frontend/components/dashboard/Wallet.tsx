import { FC } from "react";
import { BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Wallet: FC = () => {
  return (
    <Card className="shadow-md border">
      <CardContent className="space-y-8 pt-8 px-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Кошелек</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BadgeDollarSign size={18} />
            Баланс, история транзакций — скоро будет доступно
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
