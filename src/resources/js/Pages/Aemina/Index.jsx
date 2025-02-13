import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, Head, router } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa";
// import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Defina cores baseadas em categorias (pode usar outras cores)
const categoryColors = {
    ação: "bg-red-900",
    drama: "bg-blue-900",
    comédia: "bg-green-900",
    fantasia: "bg-purple-900",
    terror: "bg-gray-800",
    aventura: "bg-yellow-900",
    ficção: "bg-teal-900",
};

export default function Index({
    content,
    category,
    medias,
}) {

    // Estado para controlar os filmes favoritados (key: media.id, value: boolean)
    const [favorites, setFavorites] = useState({});

    const handleFavorite = (media_id) => {
        const isFavorite = favorites[media_id];
        const type = isFavorite ? "unset_favorite" : "set_favorite";
    
        router.post(
            route("aemina.favorite", media_id),
            { type },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Update the local state
                    setFavorites((prev) => ({
                        ...prev,
                        [media_id]: !isFavorite,
                    }));
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                },
            }
        );
    };

    return (
        <>
            <Head title={category ? `${category.toUpperCase()}` : "Home"} />

            <div className="container px-6 m-auto">
                <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                    {medias.map((media) => (
                        <Card className="col-span-4" key={media.id}>
                            <CardHeader>
                                <CardTitle>{media.title}</CardTitle>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {media.categories?.map((cat, index) => (
                                        <Badge
                                            key={index}
                                            className={`px-2 py-1 text-white rounded-full ${
                                                categoryColors[
                                                    cat.name.toLowerCase()
                                                ] || "bg-gray-700"
                                            }`}
                                        >
                                            {cat.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <img
                                    src={media.cover_image_path}
                                    alt="Placeholder"
                                    className="w-full h-48 object-cover"
                                    width="200"
                                    height="200"
                                    style={{
                                        aspectRatio: "200/200",
                                        objectFit: "cover",
                                    }}
                                />
                                <p className="text-sm">{media.description}</p>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center justify-between w-full">
                                    <Link
                                        href={route("aemina.show", [
                                            content,
                                            category,
                                            media.id,
                                        ])}
                                        prefetch={false}
                                    >
                                        Ver mais
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        aria-label="Favoritar"
                                        onClick={() => handleFavorite(media.id)}
                                    >
                                        <FaHeart
                                            className={`h-4 w-4 ${
                                                favorites[media.id]
                                                    ? "text-red-500"
                                                    : "text-black"
                                            }`}
                                        />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
