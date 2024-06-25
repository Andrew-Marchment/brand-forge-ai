"use client";

import React from "react";

const SubmitButton: React.FC<{
  children: React.ReactNode;
  isLoading: boolean;
  pendingLabel: React.ReactElement;
  disable: boolean;
}> = ({ children, isLoading, pendingLabel, disable }) => {
  return (
    <button
      className="w-full rounded-[--radius] bg-primary py-2 font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-primary/50 disabled:text-primary-foreground/50"
      type="submit"
      disabled={isLoading || disable}
    >
      {isLoading ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
