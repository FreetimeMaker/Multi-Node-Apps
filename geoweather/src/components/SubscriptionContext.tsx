"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUserSubscription, getPlanDetails, redeemCode, type Plan, type Subscription } from "@/lib/api-client";
import { useAuth } from "@/components/AuthContext";

interface SubCtx {
  plan: string;
  planDetails: Plan;
  subscription: Subscription | null;
  loading: boolean;
  redeem: (code: string) => Promise<{ success: boolean; message?: string }>;
  refresh: () => Promise<void>;
}

const DEFAULT_PLAN: Plan = { maxLocations: 5, forecastDays: 1, notifications: false };

const SubscriptionContext = createContext<SubCtx>({
  plan: "free",
  planDetails: DEFAULT_PLAN,
  subscription: null,
  loading: true,
  redeem: async () => ({ success: false }),
  refresh: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState("free");
  const [planDetails, setPlanDetails] = useState<Plan>(DEFAULT_PLAN);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setPlan("free");
      setPlanDetails(DEFAULT_PLAN);
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const sub = await getUserSubscription();
      if (sub) {
        setSubscription(sub);
        setPlan(sub.type);
        setPlanDetails(getPlanDetails(sub.type));
      } else {
        setSubscription(null);
        setPlan("free");
        setPlanDetails(DEFAULT_PLAN);
      }
    } catch (e) {
      console.error("[Sub] Error:", e);
      setPlan("free");
      setPlanDetails(DEFAULT_PLAN);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const redeem = async (code: string) => {
    try {
      const res = await redeemCode(code);
      if (res.success) await refresh();
      return res;
    } catch {
      return { success: false, message: "Fehler beim Einlösen" };
    }
  };

  return (
    <SubscriptionContext.Provider value={{ plan, planDetails, subscription, loading, redeem, refresh }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubCtx {
  return useContext(SubscriptionContext);
}
