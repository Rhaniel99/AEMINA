import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import MediaMovie from "@/components/forms/aemina/media-movie";

export default function MediaForm({ isExpanded }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => (prev + 1) % 3),
    onSwipedRight: () => setActiveIndex((prev) => (prev + 3 - 1) % 3),
  });

  const mediaTypes = ["Filme", "Série", "Anime"];

  return (
    <div
    className={`
        transition-all duration-500 bg-[#D9CDBF] p-6 mt-2 rounded
        ${isExpanded ? "opacity-100 h-auto" : "opacity-0 h-0"}
      `}
    >
      <h2 className="text-xl font-semibold text-[#402E1F]">
        Cadastro de Mídias
      </h2>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="px-3 py-1 bg-[#735848] text-white rounded"
          onClick={() => setActiveIndex((prev) => (prev + 3 - 1) % 3)}
        >
          &larr;
        </button>
        <p className="text-[#402E1F]">{mediaTypes[activeIndex]}</p>
        <button
          className="px-3 py-1 bg-[#735848] text-white rounded"
          onClick={() => setActiveIndex((prev) => (prev + 1) % 3)}
        >
          &rarr;
        </button>
      </div>

      <div {...handlers} className="overflow-hidden relative w-full mt-6">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {/* Slide 1 - FILME */}
          <div className="w-full flex-shrink-0 px-4">
                <MediaMovie />
          </div>

          {/* Slide 2 - SÉRIE */}
          <div className="w-full flex-shrink-0 px-4">
            <h3 className="text-lg font-bold text-[#402E1F]">Série</h3>
            <p className="mt-4 text-[#402E1F]">
              Campos específicos para Série (a definir)
            </p>
          </div>

          {/* Slide 3 - ANIME */}
          <div className="w-full flex-shrink-0 px-4">
            <h3 className="text-lg font-bold text-[#402E1F]">Anime</h3>
            <p className="mt-4 text-[#402E1F]">
              Campos específicos para Anime (a definir)
            </p>
          </div>
        </div>
      </div>

      <button className="mt-6 bg-[#735848] text-white px-4 py-2 rounded">
        Salvar
      </button>
    </div>
  );
}
