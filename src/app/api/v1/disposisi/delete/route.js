import prisma from "@/libs/prisma";

export async function DELETE(request) {
    try {
        // ambil id dari parameter URL
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        
        if(!id) {
            return new Response(
                JSON.stringify({ error: 'id is required' }),
                { status: 400 }
            )
        }

        const parseId = parseInt(id, 10);
        if(isNaN(parseId)) {
            return new Response(
                JSON.stringify({ error: 'id harus berupa angka'}),
                { status: 400 }
            )
        }

        // hapus data dari database
        await prisma.disposisi.delete({
            where: {
                id: parseId
            }
        });
        return new Response(
            JSON.stringify({ message: 'Data disposisi berhasil dihapus' }),
            { status: 200 }
        )

    } catch (error) {
        console.error({error: 'Data berhasil dihapus'});
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan saat menghapus data' }),
            { status: 500 }
        )
        
    }
}