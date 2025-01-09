import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Link, Head } from "@inertiajs/react";
import { useRoute } from "ziggy";

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

export default function Index({ content, category, medias }) {
    const route = useRoute();

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
                                        categoryColors[cat.name.toLowerCase()] || "bg-gray-700"
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
                        <p className="text-sm">
                            {media.description}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link href={route("aemina.show", [content, category, media.id])} prefetch={false}>
                            Ver mais
                        </Link>
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>

        </>
    );
}
