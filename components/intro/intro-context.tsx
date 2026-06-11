"use client";

import { createContext, useContext, type ReactNode } from "react";

const IntroReadyContext = createContext(true);

export function IntroReadyProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return <IntroReadyContext.Provider value={ready}>{children}</IntroReadyContext.Provider>;
}

/** False while the intro splash is visible; true once the site is shown. */
export function useIntroReady() {
  return useContext(IntroReadyContext);
}
