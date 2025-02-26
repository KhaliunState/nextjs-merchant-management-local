import { type Site } from "@/db/schema";
import {
  CheckCircle2,
  CircleHelp,
  CircleIcon,
  CircleX,
  Timer,
} from "lucide-react";
export function getStatusIcon(status: Site["status"]) {
  const statusIcons = {
    failed: CircleX,
    success: CheckCircle2,
    "processing": Timer,
    pending: CircleHelp,
  };

  return statusIcons[status] || CircleIcon;
}
