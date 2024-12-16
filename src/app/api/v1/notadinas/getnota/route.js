import prisma from "@/libs/prisma";

export async function GET (request) {
    try {
        // ambil semua data dari notadinas
        const notadinas = await prisma.notadinas.findMany();
        return new Response(JSON.stringify(notadinas), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        })
    } catch (error){
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({ message: "Gagal mengambil data", error: error.message}),
            {status: 500}
        )
        
    }
}