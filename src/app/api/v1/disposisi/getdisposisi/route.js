import prisma from "@/libs/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        if (id) {
            // Jika ID diberikan, ambil data berdasarkan ID
            const disposisi = await prisma.disposisi.findUnique({
                where: { id: parseInt(id) },
            });

            if (!disposisi) {
                return new Response(
                    JSON.stringify({ message: "Data tidak ditemukan" }),
                    { status: 404 }
                );
            }

            return new Response(JSON.stringify(disposisi), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            // Jika tidak ada ID, ambil semua data
            const disposisi = await prisma.disposisi.findMany();
            return new Response(JSON.stringify(disposisi), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({ message: "Gagal Mengambil Data", error: error.message }),
            { status: 500 }
        );
    }
}
