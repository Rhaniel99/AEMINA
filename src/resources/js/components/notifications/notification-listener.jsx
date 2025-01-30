import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, cssTransition } from "react-toastify";

export default function NotificationListener() {
    const { auth } = usePage().props;
    const Bounce = cssTransition({
        enter: 'animate__animated animate__bounceIn',
        exit: 'animate__animated animate__bounceOut',
      });

    // Escuta o canal privado para o profileId do usuário autenticado
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

        Echo.private(`profile.${auth.profile.id}`).listen(
            ".job.failed", // Note o ponto (.) antes do nome do evento
            (notification) => {
                console.log(notification);
                toast.error(notification, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
        );

        // Verificando se a conexão está funcionando
        Echo.connector.pusher.connection.bind('connected', () => {
            console.log('Conectado ao Pusher!');
        });

        // Cleanup (para não ficar ouvindo o canal quando o componente for desmontado)
        return () => {
            Echo.leave(`profile.${auth.profile.id}`);
        };
    }, [auth.profile.id]);

    return null; // Não precisa renderizar nada visualmente, apenas escuta eventos
}
