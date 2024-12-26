import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "@inertiajs/react";

export default function Account({ user, onSuccess }) {
    const {
        data: accountData,
        setData: setAccountData,
        patch: patchAccount,
    } = useForm({
        name: "",
        email: "",
    });
    const {
        data: passwordData,
        setData: setPasswordData,
        patch: patchPassword,
    } = useForm({
        senha_atual: "",
        nova_senha: "",
    });

    const submitAccount = (e) => {
        e.preventDefault();
        patchAccount(
            route("login.update", { id_user: user.id, type: "account" }),
            {
                onSuccess: () => {
                    onSuccess();
                },
                onError: () => {
                    console.log("Erros de validação detectados.");
                },
            }
        );
    };

    const submitPassword = (e) => {
        e.preventDefault();
        patchPassword(
            route("login.update", { id_user: user.id, type: "password" }),
            {
                onSuccess: () => {
                    onSuccess();
                    // reset("name", "email");
                },
                onError: () => {
                    console.log("Erros de validação detectados.");
                },
            }
        );
    };

    return (
        <>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    {/* TabsTrigger para Account */}
                    <TabsTrigger
                        value="account"
                        className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Conta
                    </TabsTrigger>
                    {/* TabsTrigger para Password */}
                    <TabsTrigger
                        value="password"
                        className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Senha
                    </TabsTrigger>
                </TabsList>

                {/* Contas */}
                <TabsContent value="account">
                    <form onSubmit={submitAccount}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Conta</CardTitle>
                                <CardDescription>
                                    Faça alterações na sua conta aqui. Clique em
                                    Salvar quando você terminar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        name="name"
                                        id="name"
                                        value={accountData.name || user.name}
                                        onChange={(e) =>
                                            setAccountData(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        // defaultValue={user.name}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        id="email"
                                        type="email"
                                        value={accountData.email || user.email}
                                        onChange={(e) =>
                                            setAccountData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Salvar alterações</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                {/* Senha */}
                <TabsContent value="password">
                    <form onSubmit={submitPassword}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Senha</CardTitle>
                                <CardDescription>
                                    Altere sua senha aqui. Depois de salvar,
                                    você será desconectado.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Senha atual</Label>
                                    <Input
                                        id="current"
                                        name="senha_atual"
                                        type="password"
                                        value={passwordData.senha_atual}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "senha_atual",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Senha nova</Label>
                                    <Input
                                        id="new"
                                        name="nova_senha"
                                        type="password"
                                        value={passwordData.nova_senha}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "nova_senha",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Salvar senha</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </>
    );
}
