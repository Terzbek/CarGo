import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Язык" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Язык</SelectLabel>
          <SelectItem value="apple">Казахский</SelectItem>
          <SelectItem value="banana">Русский</SelectItem>
          <SelectItem value="blueberry">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
