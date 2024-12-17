import prisma from "@/libs/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(
                JSON.stringify({ error: "ID tidak boleh kosong" }),
                { status: 400 }
            );
        }

        const parseId = parseInt(id, 10);
        if (isNaN(parseId)) {
            return new Response(
                JSON.stringify({ error: "ID harus berupa angka" }),
                { status: 400 }
            );
        }

        // Cari data untuk mendapatkan path file PDF
        const notaDinas = await prisma.notadinas.findUnique({
            where: { id: parseId },
        });

        if (!notaDinas) {
            return new Response(
                JSON.stringify({ error: "Data tidak ditemukan" }),
                { status: 404 }
            );
        }

        // Path file PDF yang akan dihapus
        const filePath = path.join(
            process.cwd(),
            "public/uploads/notadinasPDF",
            path.basename(notaDinas.notadinas_pdf) // Pastikan hanya mengambil nama file
        );

        console.log("Path file PDF yang dihapus:", filePath);

        // Hapus file PDF jika ada
        try {
            await fs.unlink(filePath);
            console.log("File PDF berhasil dihapus.");
        } catch (fileError) {
            if (fileError.code === "ENOENT") {
                console.warn("File tidak ditemukan, lanjutkan proses hapus data.");
            } else {
                console.error("Gagal menghapus file:", fileError);
                return new Response(
                    JSON.stringify({ error: "Gagal menghapus file PDF" }),
                    { status: 500 }
                );
            }
        }

        // Hapus data dari database
        await prisma.notadinas.delete({
            where: { id: parseId },
        });

        console.log("Data berhasil dihapus dari database.");
        return new Response(
            JSON.stringify({ message: "Data dan file PDF berhasil dihapus" }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error utama:", error);
        return new Response(
            JSON.stringify({ error: "Error saat menghapus data", details: error.message }),
            { status: 500 }
        );
    }
}
