import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/components/forms/user/login";
import SignupForm from "@/components/forms/user/signup";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/lib/animation";
import logo from "/public/img/logo/aemina.png";
import Notification from "@/components/notifications/toastify";

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
         <Notification />

        <div className="min-h-screen flex items-center justify-center bg-[#D9CDBF]">
            <div className="bg-[#BFAC9B] p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Aemina Logo" width={250} height={60} />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "login" : "register"}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadeIn}
                    >
                        {isLogin ? <LoginForm /> : <SignupForm />}
                    </motion.div>
                </AnimatePresence>
                <div className="mt-4 text-center">
                    <Button
                        variant="link"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[#402E1F] hover:text-[#735848]"
                    >
                        {isLogin
                            ? "Criar uma conta"
                            : "Já tem uma conta? Entrar"}
                    </Button>
                </div>
            </div>
        </div>
    </>
    );
}
