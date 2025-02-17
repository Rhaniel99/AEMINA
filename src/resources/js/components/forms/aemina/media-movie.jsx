import Uppy from "@uppy/core";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useState, useEffect } from "react";

// 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const coverUppy = new Uppy();
coverUppy.use(ThumbnailGenerator, {
    thumbnailWidth: 200,
    thumbnailHeight: 200,
});

const fileUppy = new Uppy();

export default function MediaMovie() {
    const [coverPreview, setCoverPreview] = useState(null);

    useEffect(() => {
        coverUppy.on("thumbnail:generated", (file, preview) => {
            setCoverPreview(preview);
        });
    }, []);

    return (
        <>
            <div className="col-span-4 lg:col-span-6">
                <Label htmlFor="titulo_filme" className="text-right">
                    Titulo do Filme
                </Label>
                <Input
                    id="titulo_filme"
                    className="col-span-3"
                    placeholder="Digite o nome do filme"
                    // value={data.titulo_filme || Movie?.title || ""}
                    // onChange={(e) => setData("titulo_filme", e.target.value)}
                />
            </div>
            <div className="mt-4">
                <label className="text-[#402E1F] block mb-2">
                    Data de Lançamento
                </label>
                <input
                    type="date"
                    className="w-full p-2 bg-[#BFAC9B] text-[#402E1F] rounded"
                />
            </div>
            <div className="mt-4">
                <label className="text-[#402E1F] block mb-2">Descrição</label>
                <textarea
                    className="w-full p-2 bg-[#BFAC9B] text-[#402E1F] rounded"
                    rows={4}
                />
            </div>
            <div className="mt-4">
                <label className="text-[#402E1F] block mb-2">Capa</label>
                {coverPreview && (
                    <img
                        src={coverPreview}
                        alt="preview"
                        className="mb-2 w-32 h-32 object-cover rounded"
                    />
                )}
                <DragDrop
                    uppy={coverUppy}
                    note="Solte os arquivos aqui ou navegue pelos arquivos"
                />
            </div>
            <div className="mt-4">
                <label className="text-[#402E1F] block mb-2">
                    Arquivo do Filme
                </label>
                <DragDrop
                    uppy={fileUppy}
                    note="Solte os arquivos aqui ou navegue pelos arquivos"
                />
            </div>
        </>
    );
}
