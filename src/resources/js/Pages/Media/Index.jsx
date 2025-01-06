import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy";

export default function Index({ medias }) {
    const route = useRoute();

    return (
        <div className="flex justify-evenly">
            {medias.map((media) => (
                <Card className="m-4" key={media.id}>
                    <CardHeader>
                        <CardTitle>{media.title}</CardTitle>
                        <Badge>Lançamento</Badge>
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
                        <Link href={route("media.show", media.id)} prefetch={false}>
                            Ver mais
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
