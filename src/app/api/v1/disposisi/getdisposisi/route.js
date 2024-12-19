import prisma from "@/libs/prisma";

export async function GET (request) {
    try {
        // ambil semua data dari tabel disposisi
        const Disposisi = await prisma.disposisi.findMany();
        return new Response(JSON.stringify(Disposisi), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(
            JSON.stringify({ message: 'Gagal Mengambil Data', error: error.message }),
            {status: 500}
        )
        
    }
}