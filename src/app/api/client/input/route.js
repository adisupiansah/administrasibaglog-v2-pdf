import prisma from "@/libs/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const { nama, satfung, perihal, no_pengajuan } = body;

    // validasi data yang dikirim dari  client
    if (!nama || !satfung || !perihal || !no_pengajuan) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // simpan data ke database
    const dataAmbilNomor = await prisma.ambilnomor.create({
      data: {
        nama,
        satfung,
        perihal,
        no_pengajuan,
      },
    });

    return new Response(JSON.stringify({ message: "Data berhasil disimpan" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Terjadi kesalahan :", error);
    return new Response (
        JSON.stringify({ message: "Terjadi kesaalahan saat  menyimpan data" }),
        {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
  }
}