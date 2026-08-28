"use client";

import { useSubscription } from "@/components/SubscriptionContext";

const PLAN_STYLES: Record<string, { color: string; bg: string; icon: string }> = {
  free: { color: "text-gray-300", bg: "bg-gray-500/20", icon: "☁️" },
  freemium: { color: "text-blue-300", bg: "bg-blue-500/20", icon: "⭐" },
  premium: { color: "text-yellow-300", bg: "bg-yellow-500/20", icon: "👑" },
  ultrimium: { color: "text-purple-300", bg: "bg-purple-500/20", icon: "💎" },
};

export default function PlanBadge() {
  const { plan, loading } = useSubscription();

  if (loading) return null;

  const style = PLAN_STYLES[plan] ?? PLAN_STYLES.free;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.color}`}>
      {style.icon} {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </span>
  );
}
