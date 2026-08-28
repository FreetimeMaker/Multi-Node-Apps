"use client";

import { SettingsProvider } from "@/components/SettingsContext";
import { CitiesProvider } from "@/components/CitiesContext";
import { AuthProvider } from "@/components/AuthContext";
import { SubscriptionProvider } from "@/components/SubscriptionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <SettingsProvider>
          <CitiesProvider>{children}</CitiesProvider>
        </SettingsProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}
