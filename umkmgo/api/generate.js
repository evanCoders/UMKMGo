export const config = {
    maxDuration: 60,
};

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { product, tone } = req.body;

    if (!product) {
        return res.status(400).json({ error: 'Nama produk harus diisi' });
    }

    const tonePrompt = {
        casual: [
            "Buat caption santai dan akrab dengan bahasa Indonesia kekinian.",
            "Buat caption yang lucu dan menghibur, gaya chatting WA.",
            "Buat caption yang mengajak interaksi dengan pertanyaan."
        ],
        promo: [
            "Buat caption promosi yang heboh dengan DISKON dan FLASH SALE.",
            "Buat caption yang bikin FOMO, stok terbatas!",
            "Buat caption dengan hitungan mundur."
        ],
        formal: [
            "Buat caption profesional dan formal dengan bahasa baku.",
            "Buat caption yang menunjukkan kredibilitas produk.",
            "Buat caption dengan pendekatan data dan statistik."
        ],
        storytelling: [
            "Buat caption storytelling yang menyentuh hati.",
            "Buat caption tentang perjuangan di balik produk.",
            "Buat caption dengan alur masalah ke solusi."
        ]
    };

    const promptList = tonePrompt[tone] || tonePrompt.casual;
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
}
