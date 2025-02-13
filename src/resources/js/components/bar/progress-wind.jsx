import React, { useEffect, useState } from "react";

  /**
   * ProgressWind displays a progress bar with an animated fill and
   * a status text below it. The filled part uses a gradient built from 
   * the organization's color palette.
   *
   * Props:
   *  - progress: number (0-100) indicating desired progress percentage.
   */
  export default function ProgressWind({ progress }) {
    const [currentProgress, setCurrentProgress] = useState(progress);

    useEffect(() => {
      const interval = setInterval(() => {
        if (currentProgress < progress) {
          setCurrentProgress((prev) => Math.min(prev + 1, progress));
        } else if (currentProgress > progress) {
          setCurrentProgress((prev) => Math.max(prev - 1, progress));
        }
      }, 50); // Animation speed: 50ms per progress unit

      return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [progress, currentProgress]);

    return (
      <div className="flex flex-col items-center w-full">
        {/* Custom progress bar with a gradient from the color palette */}
        <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full rounded transition-all duration-500 ease-in-out"
            style={{
              width: `${currentProgress}%`,
              background: "linear-gradient(90deg, #D9CDBF 0%, #402E1F 25%, #A6907C 50%, #BFAC9B 75%, #735848 100%)"
            }}
          ></div>
        </div>
        {/* Status text centered under the progress bar */}
        <div className="mt-2 text-xs text-slate-500">
          <span className="sr-only">uploading</span> {currentProgress}%
        </div>
      </div>
    );
  }