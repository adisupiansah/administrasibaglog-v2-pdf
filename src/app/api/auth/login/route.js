import prisma from "@/libs/prisma";

export async function POST(request) {
    try {
        // Menerima dan validasi body
        const body = await request.json();
        console.log('Body received:', body);
        
        if (!body || typeof body !== 'object' || !body.username || !body.password) {
            return new Response(JSON.stringify({ 
                message: 'Bad Request: Body tidak valid' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { username, password } = body;

        // Cari user di database
        const user = await prisma.user.findUnique({
            where: { username },
        })

        // Jika user tidak ditemukan
        if (!user) {
            return new Response(JSON.stringify({ message: 'Username tidak ditemukan' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Jika password salah
        if (user.password !== password) {
            return new Response(JSON.stringify({ message: 'Password salah' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Jika login berhasil
        return new Response(JSON.stringify({ message: 'Login berhasil' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Terjadi kesalahan server:', error);
        return new Response(JSON.stringify({ 
            message: 'Terjadi kesalahan saat login', 
            error: error?.message || 'Kesalahan tidak diketahui' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}