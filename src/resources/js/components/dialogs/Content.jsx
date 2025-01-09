import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import Movie  from "@/components/forms/aemina/Movie";
  export default function Content({ open, onOpenChange, content }) {
    const renderForm = () => {
      switch (content?.name) {
        case "Filme":
          return (
            <>
              <Movie />
            </>
          );
        case "Série":
          return (
            <form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nomeSérie" className="text-right">
                    Nome da Série
                  </Label>
                  <Input
                    id="nomeSérie"
                    className="col-span-3"
                    placeholder="Digite o nome da série"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="temporadas" className="text-right">
                    Temporadas
                  </Label>
                  <Input
                    id="temporadas"
                    type="number"
                    className="col-span-3"
                    placeholder="Número de temporadas"
                  />
                </div>
              </div>
            </form>
          );
        case "Anime":
          return (
            <form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nomeAnime" className="text-right">
                    Nome do Anime
                  </Label>
                  <Input
                    id="nomeAnime"
                    className="col-span-3"
                    placeholder="Digite o nome do anime"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="episodios" className="text-right">
                    Episódios
                  </Label>
                  <Input
                    id="episodios"
                    type="number"
                    className="col-span-3"
                    placeholder="Número de episódios"
                  />
                </div>
              </div>
            </form>
          );
        default:
          return null;
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[850px]" onPointerDownOutside={(event) => event.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              {content ? `Cadastrar ${content.name}` : "Cadastro"}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar o novo conteúdo.
            </DialogDescription>
          </DialogHeader>
                {renderForm()}
        </DialogContent>
      </Dialog>
    );
  }
  