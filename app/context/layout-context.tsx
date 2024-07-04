"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isFullWidth: boolean;
  setIsFullWidth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullWidth, setIsFullWidth] = useState(false);
  return (
    <LayoutContext.Provider value={{ isFullWidth, setIsFullWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};
