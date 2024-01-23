import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col mx-auto">
        {children}
    </div>
  );
}

export default layout;