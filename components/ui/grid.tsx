import React from "react";

export function DotBackgroundDemo({children}:any) {
  return (
    <div className="h-screen w-full dark:bg-background bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="h-screen w-full  z-40 overflow-scroll ">
        {children}
      </div>

    </div>
  );
}
