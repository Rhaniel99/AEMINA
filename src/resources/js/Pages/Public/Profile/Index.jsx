import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy";

export default function Index({ profiles }) {
    const route = useRoute();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Selecionar Perfil</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className="p-4 border rounded-lg shadow-md text-center"
                    >
                        <img
                            src={profile.avatar_url}
                            alt={profile.username}
                            className="w-24 h-24 mx-auto rounded-full mb-2"
                        />
                        <h2 className="text-lg font-semibold">{profile.username}</h2>
                        {profile.is_kids && (
                            <span className="text-sm text-green-600">Perfil Infantil</span>
                        )}
                        <Link
                            href={ route("profile.selected", profile.id)}
                            className="mt-2 block bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                            Selecionar
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
