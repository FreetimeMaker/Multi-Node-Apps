import { getSupabase } from "@/lib/supabase/client";

const PLAN_DETAILS: Record<string, { maxLocations: number; forecastDays: number; notifications: boolean }> = {
  free: { maxLocations: 1, forecastDays: 7, notifications: false },
  freemium: { maxLocations: 5, forecastDays: 14, notifications: true },
  premium: { maxLocations: 9999, forecastDays: 16, notifications: true },
  ultrimium: { maxLocations: 9999, forecastDays: 16, notifications: true },
};

export interface Plan {
  maxLocations: number;
  forecastDays: number;
  notifications: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  type: string;
  is_active: boolean;
  created_at?: string;
  expires_at?: string;
}

export async function getUserSubscription(): Promise<Subscription | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;

  const { data, error } = await sb
    .from("geoweather_subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[Sub] Supabase query error:", error.message);
    return null;
  }

  return data;
}

export function getPlanDetails(planName: string): Plan {
  return PLAN_DETAILS[planName] ?? PLAN_DETAILS.free;
}

export async function redeemCode(code: string): Promise<{ success: boolean; message?: string }> {
  const sb = getSupabase();
  if (!sb) return { success: false, message: "Supabase nicht konfiguriert" };

  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { success: false, message: "Nicht eingeloggt" };

  const { error } = await sb
    .from("geoweather_subscriptions")
    .insert({
      user_id: user.id,
      type: code.toLowerCase().trim(),
      is_active: true,
    });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Plan aktiviert!" };
}
