import { FC } from "react";
import { User, Mail, Phone, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  full_name: string;
  email: string;
  phone_number: string;
  created_at: string;
}

interface Props {
  user: User;
}

export const UserProfile: FC<Props> = ({ user }) => {
  return (
    <Card className="shadow-md border">
      <CardContent className="space-y-8 pt-8 px-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Личные данные</h2>
          <ul className="text-base text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <User size={18} /> Имя: {user?.full_name || "Не указано"}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> Email: {user?.email || "Не указано"}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> Телефон: {user?.phone_number || "Не указано"}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays size={18} /> Дата регистрации:{" "}
              {user?.created_at
                ? format(new Date(user?.created_at), "dd MMMM yyyy", {
                    locale: ru,
                  })
                : "—"}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
