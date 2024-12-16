import prisma from "@/libs/prisma";

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, tgl_surat, no_surat, kepada, perihal } = body;

        if (!id) {
            return new Response(
                JSON.stringify({ error: "id tidak boleh kosong"}),
                { status: 400 }
            )
        }

        // Update data ke database menggunakan Prisma
        const updateData = await prisma.notadinas.update({
            where: {id},
            data: {
                tgl_surat,
                no_surat,
                kepada,
                perihal
            }
        })

        return new Response(
            JSON.stringify({message: "Data berhasil diupdate", updateData}),
            { status: 200 }
        )

    } catch (error) {
        console.error("Error saat mengedit data:", error);
        return new Response(
            JSON.stringify({error: "Terjadi kesalahan saat mengedit data"}),
            { status: 500 }
        )
    }
}