import prisma from "@/libs/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
    const formData = await request.formData();
    const tgl_surat = formData.get("tgl_surat");
    const no_surat = formData.get("no_surat");
    const kepada = formData.get("kepada");
    const perihal = formData.get("perihal");
    const type_notadinas = formData.get("type_notadinas");
    const file = formData.get("notadinas_pdf");

    if (!tgl_surat || !no_surat || !kepada || !perihal || !type_notadinas || !file) {
        return new Response(
            JSON.stringify({ message: "Data tidak lengkap" }),
            { status: 400 }
        );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads/notadinasPDF");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    const notaDinas = await prisma.notadinas.create({
        data: {
            tgl_surat,
            no_surat,
            kepada,
            perihal,
            type_notadinas,
            notadinas_pdf: `/uploads/notadinasPDF/${file.name}`
        }
    });

    return new Response(
        JSON.stringify({ message: "Berhasil disimpan", notaDinas }),
        { status: 201 }
    );
}
