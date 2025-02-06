import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";
import logo from "/public/img/logo/aemina.png";
import { router } from '@inertiajs/react';

export default function ProfileSelection({ profiles }) {
    const [selectedProfile, setSelectedProfile] = useState(null);
    const handleProfileSelect = (profileId) => {
        setSelectedProfile(profileId);
    };

    const handleContinue = () => {
      if (selectedProfile) {
        router.get(`/selected-profile/${selectedProfile}`);
      }
    }

    const handleCreateProfile = () => {
      router.get("/create-profile");
    }

    const handleExit = () => {
        router.post("/logout");
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#D9CDBF] p-4 relative">
                <Button
                    variant="ghost"
                    onClick={handleExit}
                    className="absolute top-4 right-4 text-[#402E1F] hover:text-[#735848]"
                >
                    <LogOut className="mr-2 h-4 w-4" /> Sair
                </Button>
                <div className="bg-[#BFAC9B] p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <img
                            src={logo}
                            alt="Aemina Logo"
                            width={200}
                            height={60}
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#402E1F] mb-6">
                        Quem está assistindo?
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {profiles.map((profile) => (
                            <button
                                key={profile.id}
                                onClick={() => handleProfileSelect(profile.id)}
                                className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all ${
                                    selectedProfile === profile.id
                                        ? "bg-[#735848] scale-105"
                                        : "hover:bg-[#A6907C]"
                                }`}
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                    <img
                                        src={
                                            profile.avatar_url ||
                                            "/placeholder.svg"
                                        }
                                        alt={profile.username}
                                        className="object-cover"
                                    />
                                </div>
                                <span
                                    className={`font-medium ${
                                        selectedProfile === profile.id
                                            ? "text-[#D9CDBF]"
                                            : "text-[#402E1F]"
                                    }`}
                                >
                                    {profile.username}
                                </span>
                            </button>
                        ))}
                        <button
                            onClick={handleCreateProfile}
                            className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg hover:bg-[#A6907C] transition-all"
                        >
                            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[#735848] flex items-center justify-center">
                                <PlusCircle className="w-12 h-12 text-[#735848]" />
                            </div>
                            <span className="font-medium text-[#402E1F]">
                                Criar Perfil
                            </span>
                        </button>
                    </div>
                    <Button
                          onClick={handleContinue}
                          disabled={!selectedProfile}
                        className="w-full mt-6 bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF] disabled:opacity-50"
                    >
                        Continuar
                    </Button>
                </div>
            </div>
        </>
    );
}
