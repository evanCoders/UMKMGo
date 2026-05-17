import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Debug helper (remove later): ensure GROQ_API_KEY is present
if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY is not set or empty in environment (.env)');
}


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { product, tone } = req.body;

    if (!product) {
        return res.status(400).json({ error: 'Nama produk harus diisi' });
    }

    if (!tone) {
        return res.status(400).json({ error: 'Tone caption harus dipilih' });
    }

    // Map tone ke prompt yang sesuai (array of strings)
    const tonePrompt = {
        casual: [
            "Buat caption santai dan akrab dengan bahasa Indonesia kekinian, seperti ngobrol sama teman. Pakai kata 'kita', 'yuk', atau 'gas'.",
            "Buat caption yang relatable, pakai bahasa sehari-hari yang dekat dengan anak muda. Gunakan emoji yang sesuai.",
            "Buat caption yang lucu dan menghibur, tapi tetap promosiin produk. Gaya bahasa santai, seperti chatting di WA.",
            "Buat caption yang mengajak interaksi, misalnya dengan pertanyaan 'Udah coba yang ini belum?' atau 'Siapa nih yang suka produk ini?'",
            "Buat caption yang simpel, to the point, dan mudah diingat. Pakai bahasa yang ringan dan enak dibaca."
        ],
        promo: [
            "Buat caption promosi yang heboh, mendorong pembeli segera order. Pakai kata-kata seperti DISKON, FLASH SALE, TERBATAS!",
            "Buat caption yang bikin FOMO (Fear Of Missing Out). Tekankan bahwa stok terbatas dan harga spesial hanya hari ini.",
            "Buat caption promosi dengan hitungan mundur, contoh: '⏰ 3 jam lagi!', atau 'Buruan, sebelum kehabisan!'",
            "Buat caption yang menunjukkan keunggulan produk dibanding kompetitor. Pakai perbandingan yang menarik.",
            "Buat caption dengan gaya 'testimoni mendadak' dari pembeli fiktif, lalu ajak yang lain untuk order juga."
        ],
        formal: [
            "Buat caption profesional dan formal dengan bahasa baku, sopan, dan meyakinkan. Hindari singkatan.",
            "Buat caption yang menunjukkan kredibilitas produk. Gunakan kata-kata seperti 'terpercaya', 'berkualitas', 'terjamin'.",
            "Buat caption yang informatif dan detail, cocok untuk produk B2B atau jasa profesional.",
            "Buat caption dengan pendekatan statistik atau data (misal: 'Telah digunakan oleh 500+ klien', 'Tingkat kepuasan 98%').",
            "Buat caption yang menekankan nilai lebih produk secara elegan dan tidak berlebihan. Bahasa tetap sopan dan menghargai pembaca."
        ],
        storytelling: [
            "Buat caption storytelling yang menyentuh hati, ada emosi dan cerita di balik produk.",
            "Buat caption yang menceritakan awal mula produk dibuat, dengan gaya yang hangat dan personal.",
            "Buat caption yang mengangkat perjuangan di balik layar, misalnya proses produksi yang penuh cinta dan dedikasi.",
            "Buat caption yang terinspirasi dari kehidupan sehari-hari target pasar. Buat mereka merasa 'Ah, ini cerita saya banget'.",
            "Buat caption dengan alur: masalah → perjalanan mencari solusi → akhirnya nemu produk ini. Akhiri dengan ajakan yang lembut."
        ]
    };

    // Pilih prompt secara acak dari array yang sesuai dengan tone
    const promptList = tonePrompt[tone];
    const selectedPrompt = promptList[Math.floor(Math.random() * promptList.length)];

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `Kamu adalah asisten pemasaran untuk UMKM Indonesia. ${selectedPrompt}`
                    },
                    {
                        role: 'user',
                        content: `Buatkan caption singkat maksimal 100 kata untuk produk ini: ${product}`
                    }
                ],
                temperature: 0.8,
                max_tokens: 300,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API Error:', data);
            throw new Error(data.error?.message || 'Gagal memanggil Groq API');
        }

        const caption = data.choices[0].message.content;
        res.status(200).json({ caption });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Terjadi kesalahan pada server' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📡 Endpoint API: http://localhost:${PORT}/api/generate`);
});