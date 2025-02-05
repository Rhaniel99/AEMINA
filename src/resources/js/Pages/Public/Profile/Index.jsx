import { Link } from "@inertiajs/react";
import { UserCircle2 } from "lucide-react";
import { useRoute } from "ziggy";

export default function Index({ profiles }) {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-black bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Quem está assistindo?
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {profiles.map((profile) => (
                        <Link href={route("profile.selected", profile.id)}>
                            <button
                                key={profile.id}
                                className="group flex flex-col items-center"
                            >
                                <div className="w-32 h-32 rounded-lg overflow-hidden group-hover:ring-4 ring-red-600 transition-all">
                                    <UserCircle2 className="w-full h-full text-gray-600 group-hover:text-red-600 transition-colors" />
                                </div>
                                <span className="mt-2 text-gray-400 group-hover:text-white transition-colors">
                                    {profile.username}
                                </span>
                            </button>
                        </Link>
                    ))}
                </div>
                <button className="mt-8 px-4 py-2 text-gray-400 border border-gray-400 hover:text-white hover:border-white transition-colors">
                    Gerenciar Perfis
                </button>
            </div>
        </div>

        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">Selecionar Perfil</h1>

        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        //         {profiles.map((profile) => (
        //             <div
        //                 key={profile.id}
        //                 className="p-4 border rounded-lg shadow-md text-center"
        //             >
        //                 <img
        //                     src={profile.avatar_url}
        //                     alt={profile.username}
        //                     className="w-24 h-24 mx-auto rounded-full mb-2"
        //                 />
        //                 <h2 className="text-lg font-semibold">{profile.username}</h2>
        //                 {profile.is_kids && (
        //                     <span className="text-sm text-green-600">Perfil Infantil</span>
        //                 )}
        //                 <Link
        //                     href={ route("profile.selected", profile.id)}
        //                     className="mt-2 block bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        //                 >
        //                     Selecionar
        //                 </Link>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}
