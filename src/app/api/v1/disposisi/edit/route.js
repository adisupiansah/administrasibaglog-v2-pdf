import prisma from "@/libs/prisma";
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, tgl_surat, no_disposisi, no_surat, perihal, satfung, type_disposisi } = body;

        if(!id) {
            return new Response(
                JSON.stringify({ message: "ID tidak ditemukan" }),
                { status: 400 }
            )
        }

        // Update data disposisi ke database
        const updateDisposisi = await prisma.disposisi.update({
            where: { id },
            data: {
                tgl_surat,
                no_disposisi,
                no_surat,
                perihal,
                satfung,
                type_disposisi,
            }
        })

        return new Response (
            JSON.stringify({ message: "Data berhasil diUpdate"}),
            { status: 200 }
        )
    } catch (error) {
        console.error('Error saat mengedit data disposisi:', error);
        return new Response(
            JSON.stringify({ message: 'Gagal mengedit data disposisi' }),
            { status: 500 }
        )
        
    }
}