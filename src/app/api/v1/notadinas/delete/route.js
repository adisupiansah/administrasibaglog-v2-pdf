import prisma from "@/libs/prisma";

export async function DELETE(request) {
    try {
        // ambil id dari parameter URL
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id');

        if (!id) {
            return new Response (
                JSON.stringify({ error: "ID tidak boleh kosong" }),
                { status: 400 }
            )
        }

        
        const parseId = parseInt(id, 10);
        if (isNaN(parseId)) {
            return new Response (
                JSON.stringify({ error: "ID harus berupa angka" }),
                { status: 400 }
            )
        }
        // Hapus data dari database menggunakan Prisma
         await prisma.notadinas.delete({
            where: {id: parseId},
        })

        return new Response (
            JSON.stringify({ message: "Data berhasil dihapus" }),
            { status: 200 }
        )

    } catch (error) {
        console.error({error: "Error saat menghapus data"});
        return new Response (
            JSON.stringify({ error: "Terjadi kesalahan saat mengahpus data" }),
            { status: 500 }
        )

    }
}