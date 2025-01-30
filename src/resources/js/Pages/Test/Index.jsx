// import FileUploader from "@/components/test/FileUpload";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

// import Echo from "@/echo";
export default function Index() {
    const { auth } = usePage().props;
    
    const user = "d80d47a8-80ee-4724-b1da-561b65747d9a";
    useEffect(() => {
        // console.log(Echo)
        Echo.private("App.Models.User." + user).notification((notification) => {
            console.log(notification);
        });
    }, []);

    return (
        <>
            <div>
                <h1>Teste</h1>
                {/* <FileUploader name="file" /> */}
            </div>
        </>
    );
}
