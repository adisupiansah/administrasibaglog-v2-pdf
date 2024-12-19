import prisma from "@/libs/prisma";

export async function POST (request) {
    try {
        const body = await request.json();
        
        if (!body || typeof body !== 'object') {
            return new Response(
                JSON.stringify({ message: "Payload tidak valid" }),
                { status: 400 }
            );
        }

        const { tgl_surat, no_disposisi, no_surat, perihal, satfung, type_disposisi} = body;

        // validasi jika data tidak lengkap
        if (!tgl_surat || !no_disposisi || !no_surat || !perihal || !satfung || !type_disposisi) {
            return new Response (
                JSON.stringify({
                    message: "Data tidak lengkap"
                }),
                { status: 400 }
            )
        }

        // buat data di database
        const Disposisi = await prisma.disposisi.create({
            data: {
                tgl_surat,
                no_disposisi,
                no_surat,
                perihal,
                satfung,
                type_disposisi
            }
        })

        return new Response(
            JSON.stringify({message: "Berhasil menyimpan data",data: Disposisi}),
            { 
                status: 201,
                headers: {"Content-Type": "application/json"}
             }
        );
    } catch (error) {
        console.error("Error euy:", error.stack); 
        return new Response (
            JSON.stringify({ message: "Terjadi kesalahan saat menyimpan data", error: error.message }),
            { status: 500 }
        )
    }
}