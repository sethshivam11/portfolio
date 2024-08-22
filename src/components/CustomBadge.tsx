import React from "react";
import { Badge } from "./ui/badge";

function CustomBadge({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Badge className={`flex gap-2 py-1 ${className}`}>{children}</Badge>;
}

export default CustomBadge;
