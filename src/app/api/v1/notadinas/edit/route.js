import prisma from "@/libs/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function PUT(request) {
    const formData = await request.formData();
    const id = formData.get("id"); // Pastikan `id` dikirim untuk menentukan data yang akan diubah.
    const tgl_surat = formData.get("tgl_surat");
    const no_surat = formData.get("no_surat");
    const kepada = formData.get("kepada");
    const perihal = formData.get("perihal");
    const type_notadinas = formData.get("type_notadinas");
    const file = formData.get("notadinas_pdf");

    // Validasi data
    if (!id || !tgl_surat || !no_surat || !kepada || !perihal || !type_notadinas) {
        return new Response(
            JSON.stringify({ message: "Data tidak lengkap" }),
            { status: 400 }
        );
    }

    // Cari data lama di database
    const existingData = await prisma.notadinas.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingData) {
        return new Response(
            JSON.stringify({ message: "Data tidak ditemukan" }),
            { status: 404 }
        );
    }

    let filePath = existingData.notadinas_pdf; // Default gunakan file lama

    // Jika ada file baru, simpan file baru dan hapus file lama
    if (file) {
        const uploadDir = path.join(process.cwd(), "public/uploads/notadinasPDF");
        await fs.mkdir(uploadDir, { recursive: true });

        // Simpan file baru
        const newFilePath = path.join(uploadDir, file.name);
        await fs.writeFile(newFilePath, Buffer.from(await file.arrayBuffer()));

        // Hapus file lama jika ada
        if (existingData.notadinas_pdf) {
            const oldFilePath = path.join(process.cwd(), `public${existingData.notadinas_pdf}`);
            try {
                await fs.unlink(oldFilePath); // Menghapus file lama
            } catch (error) {
                console.error("Gagal menghapus file lama:", error);
            }
        }

        filePath = `/uploads/notadinasPDF/${file.name}`; // Update path file
    }

    // Perbarui data di database
    const updatedNotaDinas = await prisma.notadinas.update({
        where: { id: parseInt(id) },
        data: {
            tgl_surat,
            no_surat,
            kepada,
            perihal,
            type_notadinas,
            notadinas_pdf: filePath,
        },
    });

    return new Response(
        JSON.stringify({ message: "Berhasil diperbarui", updatedNotaDinas }),
        { status: 200 }
    );
}
