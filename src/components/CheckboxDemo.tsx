"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  label: string;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckboxDemo({ label, setChecked }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        onCheckedChange={(checked: boolean) => setChecked(checked)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
