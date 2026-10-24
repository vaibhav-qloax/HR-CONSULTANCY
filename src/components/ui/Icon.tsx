import {
  ChartNoAxesColumn,
  Clock,
  Compass,
  Crown,
  Search,
  ShieldCheck,
  UserCheck,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

const map = {
  "user-check": UserCheck,
  clock: Clock,
  crown: Crown,
  workflow: Workflow,
  compass: Compass,
  chart: ChartNoAxesColumn,
  search: Search,
  shield: ShieldCheck,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
