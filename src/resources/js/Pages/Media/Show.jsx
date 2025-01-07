import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function Index({ media }) {
    const videoRef = useRef(null);

    useEffect(() => {
        // Inicializa o player de vídeo
        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                fluid: true, // Responsivo
            });

            return () => {
                // Limpeza do player ao desmontar o componente
                if (player) {
                    player.dispose();
                }
            };
        }
    }, []);

    return (
        <div className="video-container max-w-4xl mx-auto mt-4">
            <h1 className="text-center text-xl font-semibold mb-4">{media.title || "Ver Filme"}</h1>
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    className="video-js vjs-big-play-centered w-full h-auto"
                    controls
                    preload="auto"
                >
                    <source src={media.file_path} type="video/mp4" />
                    {/* Adicione mais formatos se necessário */}
                    <source src={media.file_path} type="video/webm" />
                </video>
            </div>
        </div>
    );
}
