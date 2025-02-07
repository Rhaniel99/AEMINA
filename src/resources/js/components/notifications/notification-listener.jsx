import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, Flip } from "react-toastify";

export default function NotificationListener() {
    const { auth } = usePage().props;

    useEffect(() => {
        // Escuta o canal privado para o profileId
        // Echo.private(`profile.${auth.profile.id}`).listen(
        //     "JobFailedNotification",
        //     (notification) => {
        //         // Lida com a notificação, você pode customizar para exibir de outras formas
        //         console.log("Notificação recebida:", notification);
        //         alert(notification.message); // Exibe a mensagem do erro
        //     }
        // );
        
        // ? Teste de conectividade do pusher
        const user = "dafc366a-6c64-4c60-a17e-9d88444368ee";

        Echo.private("App.Models.User." + user).notification((notification) => {
            console.log(notification);
        });

        Echo.private(`profile.${auth.profile.id}`).listen(
            ".job.success", // Note o ponto (.) antes do nome do evento
            (notification) => {
                toast.success(notification.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            }
        );

        Echo.private(`profile.${auth.profile.id}`).listen(
            ".job.failed", // Note o ponto (.) antes do nome do evento
            (notification) => {
                // toast.error(notification.message || "Erro inesperado", { ... });
                // console.log(notification);
                toast.error(notification.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            }
        );

        // Verificando se a conexão está funcionando
        Echo.connector.pusher.connection.bind("connected", () => {
            console.log("Conectado ao Pusher!");
        });

        // Cleanup (para não ficar ouvindo o canal quando o componente for desmontado)
        return () => {
            Echo.leave(`profile.${auth.profile.id}`);
        };
    }, [auth.profile.id]);

    return null; // Não precisa renderizar nada visualmente, apenas escuta eventos
}
