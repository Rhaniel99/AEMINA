import React, { useEffect, useState } from "react";

export default function ProgressWind({ progress }) {
  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProgress < progress) {
        setCurrentProgress((prev) => Math.min(prev + 1, progress));
      } else if (currentProgress > progress) {
        setCurrentProgress((prev) => Math.max(prev - 1, progress));
      }
    }, 50); // Ajuste a velocidade da animação (50ms por unidade de progresso)

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, [progress, currentProgress]);

  return (
    <div className="flex w-full gap-2">
      <label
        id="p01e-label"
        htmlFor="p01e"
        className="order-2 mb-0 text-center text-xs text-slate-500"
      >
        <span className="sr-only">uploading</span> {currentProgress}%
      </label>
      <progress
        aria-labelledby="p01e-label"
        id="p01e"
        max="100"
        value={currentProgress}
        className="block w-full overflow-hidden rounded bg-slate-100 transition-all ease-in-out duration-500"
      >
        {currentProgress}%
      </progress>
    </div>
  );
}
