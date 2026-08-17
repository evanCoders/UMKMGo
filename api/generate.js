import fs from 'fs';
import path from 'path';

export const config = {
  maxDuration: 60,
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getApiKey() {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() && !process.env.GROQ_API_KEY.includes('placeholder')) {
    return process.env.GROQ_API_KEY.trim();
  }
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GROQ_API_KEY\s*=\s*(.+)$/m);
      if (match && match[1]) {
        const val = match[1].trim().replace(/^["']|["']$/g, '');
        if (val && !val.includes('placeholder')) {
          return val;
        }
      }
    }
  } catch (e) {}
  return null;
}

function generateDynamicCaption(product, tone) {
  const p = product.trim();
  const tag = p.replace(/[^a-zA-Z0-9]/g, '');

  const data = {
    casual: {
      openings: [
        `Lagi cari ${p} yang beneran cocok buat nemenin aktivitas harian kamu?`,
        `Siapa di sini yang dari kemarin lagi kepikiran pengin nikmatin ${p}?`,
        `Buat kamu yang mendambakan ${p} dengan rasa dan kualitas juara, ini jawabannya!`,
        `Kadang yang bikin hari jadi lebih bersemangat itu sesimpel nemu ${p} yang pas banget di hati.`,
        `Nggak perlu bingung lagi nyari ${p} yang terpercaya dan bikin puas.`,
        `${p} ini beneran beda dari yang pernah kamu coba sebelumnya!`,
        `Paling asyik kalau istirahat ditemenin sama ${p}, rasa lezatnya bikin mood langsung naik.`,
        `Sudah banyak yang ketagihan sama kenikmatan ${p}, sekarang giliran kamu yang buktiin sendiri!`,
        `Kabar baik buat kamu yang suka produk lokal berkualitas: ${p} siap kamu order hari ini.`,
        `Lagi santai di rumah atau kumpul bareng teman? Lengkapi momen seru kalian dengan ${p}.`
      ],
      bodies: [
        `Dibuat teliti dengan bahan-bahan pilihan biar kualitas ${p} tetap terjaga dari awal sampai ke tangan kamu. Sekali coba, dijamin langsung kerasa bedanya!`,
        `Setiap detailnya kami racik dengan penuh perhatian untuk memastikan rasa dan mutunya selalu konsisten. Pas banget buat dinikmati sendiri atau bareng orang terdekat.`,
        `Kami selalu mengutamakan kesegaran dan keaslian racikan, jadi kamu bisa menikmati pengalaman terbaik bersama ${p} di setiap momen.`,
        `Proses pembuatannya higienis dan mengutamakan bahan lokal berkualitas tinggi. Cocok banget buat melengkapi rutinitas harianmu.`,
        `Bukan rahasia lagi kalau ${p} jadi andalan banyak pelanggan kami karena tekstur dan rasanya yang khas tanpa pemanis atau pengawet berlebih.`,
        `Dibuat langsung oleh tangan terampil pengrajin lokal, memastikan setiap kemasan ${p} hadir dengan standar rasa terbaik.`,
        `Keaslian rasa dan kemasan yang praktis bikin ${p} mudah dibawa ke mana saja tanpa repot.`,
        `Kami menjaga resep otentik ini secara turun-temurun agar kepuasan kamu saat menikmati ${p} selalu terjaga sempurna.`
      ],
      ctas: [
        `Yuk, amankan pesanan kamu sekarang sebelum kehabisan slot batch hari ini! Langsung klik link di bio atau DM kami ya ✨`,
        `Stok harian terbatas ya kak. Yuk amankan ${p} favoritmu sekarang via chat atau klik link pemesanan di profil!`,
        `Biar nggak penasaran, langsung cobain sendiri hari ini. Chat admin kami sekarang untuk tanya varian atau langsung order ya! 🚀`,
        `Jangan sampai ketinggalan, amankan sekarang sebelum antrean pengiriman hari ini ditutup. Ditunggu pesanan baiknya! 😊`,
        `Mau kirim ke luar kota? Tenang, packing ${p} dijamin aman berlapis sampai depan pintu rumahmu. Hubungi kami sekarang!`,
        `Klik tombol pesan di profil untuk info harga dan ongkos kirim termurah hari ini ya! 📦`,
        `Tersedia berbagai pilihan paket hemat untuk ${p}, yuk tanya langsung ke admin via WhatsApp atau DM!`,
        `Langsung amankan stok kamu sekarang sebelum kuota promo mingguan ini ditutup!`
      ],
      tags: [
        `#UMKMLokal #${tag} #RekomendasiProduk #KaryaAnakBangsa #ProdukLokal`,
        `#PilihanCerdas #${tag} #KualitasTerbaik #BelanjaLokal #SupportUMKM`,
        `#RekomendasiHariIni #${tag} #KulinerLokal #UsahaLokal #BanggaBuatanIndonesia`,
        `#ProdukFavorit #${tag} #BelanjaOnline #UMKMIndonesia #CamilanLokal`,
        `#KaryaLokal #${tag} #JajananViral #RekomendasiMedsos #KreatifLokal`
      ]
    },
    promo: {
      openings: [
        `Kabar gembira buat kamu pencinta ${p}! Khusus minggu ini ada penawaran istimewa yang sayang banget dilewatkan.`,
        `Momen terbaik buat borong ${p} favorit kamu sudah tiba!`,
        `Penawaran terbatas! Dapatkan ${p} berkualitas dengan harga spesial khusus pemesanan hari ini.`,
        `Lagi pengin hemat tapi tetap dapat ${p} dengan mutu premium? Pas banget, kami lagi ada promo menarik!`,
        `${p} lagi diskon besar-besaran khusus untuk pelanggan tercepat hari ini!`,
        `Spesial flash sale! Ambil kesempatan emas bawa pulang ${p} dengan potongan harga spesial.`,
        `Hari ini saat yang paling pas buat stok ${p} di rumah karena harganya lagi ramah banget di kantong.`,
        `Beli sekarang lebih hemat! Nikmati penawaran eksklusif ${p} khusus orderan minggu ini.`,
        `Jangan sampai nyesel kehabisan, promo ${p} cuma berlaku selama kuota batch masih ada!`,
        `Promo bundling terbaik untuk ${p} sudah resmi dibuka, yuk serbu sekarang!`
      ],
      bodies: [
        `Kami siapkan penawaran harga terbaik langsung dari dapur produksi kami. Kualitas tetap nomor satu, porsi dan kemasan dijamin memuaskan!`,
        `Stok harian promo sengaja kami batasi agar standar mutu dan kesegaran ${p} tetap terjaga maksimal sampai ke alamat kamu.`,
        `Kombinasi rasa lezat dan harga bersahabat. Cocok buat stok di rumah atau kirim bingkisan ${p} buat keluarga dan teman.`,
        `Pengemasan super rapi dan aman, siap kami kirimkan ke seluruh wilayah dengan opsi ekspedisi terpercaya.`,
        `Dapatkan bonus ekstra dan potongan ongkos kirim untuk setiap pembelian ${p} minimal dua paket hari ini.`,
        `Kapan lagi bisa dapetin ${p} dengan kualitas premium tapi harganya sehemat ini? Jangan sampai terlewat!`,
        `Garansi rasa dan kualitas 100% otentik, dijamin bikin nagih dari suapan pertama sampai habis.`,
        `Setiap paket ${p} dipacking menggunakan lapisan pelindung tebal sehingga aman selama perjalanan antar kota.`
      ],
      ctas: [
        `Slot promo sangat terbatas dan bisa habis sewaktu-waktu. Yuk checkout sekarang sebelum kehabisan kuota! 🛒📦`,
        `Segera hubungi kontak kami sekarang untuk mengklaim harga promo spesial ${p} ini sebelum periode berakhir!`,
        `Klik link di bio atau kirim pesan sekarang untuk amankan paket promo kamu hari ini juga! 🔥`,
        `Jangan tunda sampai besok, pesan sekarang dan nikmati penawaran terbaiknya langsung dari kami!`,
        `Ketik "PROMO" di kolom komentar atau langsung DM kami untuk klaim voucher diskon ${p} sekarang juga!`,
        `Hubungi WhatsApp resmi kami sekarang untuk konsultasi varian dan dapatkan harga promo langsung! 📲`,
        `Siapa cepat dia dapat! Segera amankan pesanan ${p} sebelum promo otomatis berakhir tengah malam nanti.`
      ],
      tags: [
        `#PromoSpesial #${tag} #FlashSale #DiskonUMKM #HematBerkualitas`,
        `#PenawaranTerbatas #${tag} #PromoLokal #DiskonHariIni #BelanjaHemat`,
        `#PromoHemat #${tag} #ProdukLokalBerkualitas #PeluangHemat #PaketSpesial`,
        `#DiskonBesar #${tag} #PromoTerbatas #FlashSaleLokal #BelanjaMurah`
      ]
    },
    formal: {
      openings: [
        `Hadirkan kemudahan dan kepuasan optimal bersama ${p}.`,
        `Tingkatkan standar kualitas kebutuhan Anda dengan ${p} yang terpercaya.`,
        `Kami berkomitmen menghadirkan produk ${p} bermutu tinggi yang dirancang untuk memberikan nilai terbaik bagi Anda.`,
        `Solusi praktis dan andal untuk mendukung aktivitas harian Anda: ${p}.`,
        `${p} hadir sebagai solusi tepat bagi Anda yang mengutamakan mutu dan konsistensi layanan.`,
        `Percayakan pemenuhan kebutuhan Anda pada ${p} dengan jaminan mutu standar terbaik.`,
        `Keandalan dan efisiensi kini hadir lebih dekat melalui ${p}.`,
        `Pilihan cerdas untuk mendukung kenyamanan serta produktivitas bisnis Anda: ${p}.`
      ],
      bodies: [
        `Kami senantiasa mengedepankan integritas proses, standarisasi mutu yang ketat, serta konsistensi layanan untuk memastikan kepuasan setiap pelanggan.`,
        `Diproduksi dengan mengacu pada standar kualitas unggul, ${p} menjadi pilihan tepat bagi Anda yang mengutamakan keandalan dan kepraktisan.`,
        `Dukungan bahan baku teruji dan proses produksi profesional menjadikan produk ini bernilai investasi tinggi untuk kenyamanan Anda.`,
        `Setiap unit ${p} melewati tahapan kontrol kualitas berlapis guna memastikan kesempurnaan produk hingga ke tangan konsumen.`,
        `Kami siap menjadi mitra terpercaya dalam menghadirkan solusi ${p} yang berkelanjutan dan berstandar prima.`
      ],
      ctas: [
        `Katalog spesifikasi lengkap serta layanan pemesanan dapat diakses langsung melalui kontak resmi kami. Kami siap melayani kebutuhan Anda secara profesional.`,
        `Silakan menghubungi tim layanan pelanggan kami untuk konsultasi kebutuhan ${p} dan informasi kerja sama lebih lanjut.`,
        `Hubungi saluran komunikasi resmi kami untuk pemesanan dalam jumlah reguler maupun kebutuhan khusus perusahaan Anda.`,
        `Dapatkan penawaran resmi dan rincian katalog lengkap dengan menghubungi perwakilan layanan kami hari ini.`
      ],
      tags: [
        `#SolusiUsaha #${tag} #KualitasTerpercaya #UMKMGo #StandarProfesional`,
        `#KemitraanUsaha #${tag} #PelayananTerbaik #MutuTerjamin #BisnisLokal`,
        `#ProdukProfesional #${tag} #IntegritasMutu #LayananTerpercaya #SolusiBisnis`
      ]
    },
    storytelling: {
      openings: [
        `Setiap produk ${p} yang sampai ke tangan Anda selalu bermula dari sebuah cerita sederhana di ruang kerja kami.`,
        `Bagi kami, membuat ${p} bukan sekadar proses produksi harian, melainkan bentuk kecintaan kami pada kualitas rasa dan ketulusan berkarya.`,
        `Ada proses panjang, ketelitian, dan harapan yang kami sematkan dalam setiap kemasan ${p}.`,
        `Melihat senyum kepuasan pelanggan saat menerima ${p} adalah alasan mengapa kami terus bersemangat setiap pagi.`,
        `Dari dapur kecil perintis hingga kini menjangkau ribuan pelanggan, perjalanan ${p} selalu diwarnai ketekunan.`,
        `Kami percaya bahwa sebuah karya yang dibuat dengan hati, seperti ${p}, akan selalu menemukan tempat di hati penikmatnya.`,
        `Terkadang, hal-hal sederhana yang dirawat dengan konsistensi menghasilkan cerita luar biasa di balik ${p}.`,
        `Di balik sebungkus ${p}, ada dedikasi para pengrajin lokal yang terus berinovasi menjaga tradisi mutu.`
      ],
      bodies: [
        `Dari pemilihan bahan segar di pagi hari, penimbangan takaran yang presisi, hingga proses pengemasan yang rapi dan higienis—semua kami lakukan dengan penuh perhatian.`,
        `Kami percaya bahwa rasa dan kualitas yang jujur tidak pernah berbohong. Itulah mengapa kami menolak kompromi dalam pemilihan bahan baku ${p}.`,
        `Perjalanan membangun usaha ini mengajarkan kami bahwa kepercayaan pelanggan adalah amanah yang harus kami jaga dengan sepenuh hati.`,
        `Setiap masukan dan testimoni hangat dari Anda menjadi bahan bakar semangat kami untuk terus menyempurnakan kualitas ${p}.`,
        `Kami bangga bisa memberdayakan bahan baku petani dan produsen lokal di sekitar kami untuk menghasilkan ${p} yang berdaya saing tinggi.`
      ],
      ctas: [
        `Terima kasih sudah menjadi bagian penting dalam perjalanan usaha lokal kami. Nikmati momen istimewa Anda bersama ${p} hari ini ❤️`,
        `Dukungan Anda sangat berarti bagi kelangsungan karya lokal kami. Yuk pesan dan rasakan sendiri ketulusan rasanya!`,
        `Mari ciptakan momen berharga bersama orang tersayang dengan ${p}. Kami nantikan pesanan baik Anda!`,
        `Jadilah bagian dari cerita kami hari ini. Klik tautan pemesanan di profil untuk menikmati keaslian cita rasa ${p}.`
      ],
      tags: [
        `#CeritaUsaha #${tag} #BanggaProdukLokal #DedikasiKualitas #KaryaLokal`,
        `#KisahUMKM #${tag} #KetulusanRasa #ProdukLokalIndonesia #DukungUsahaKecil`,
        `#KisahInspirasi #${tag} #WarisanRasa #BanggaBuatanIndonesia #SemangatLokal`
      ]
    }
  };

  const selected = data[tone] || data.casual;
  const op = pickRandom(selected.openings);
  const bd = pickRandom(selected.bodies);
  const ct = pickRandom(selected.ctas);
  const tg = pickRandom(selected.tags);

  const rollStyle = Math.floor(Math.random() * 3);
  if (rollStyle === 0) {
    return `${op}\n\n${bd}\n\n${ct}\n\n${tg}`;
  } else if (rollStyle === 1) {
    return `${bd}\n\n${op}\n\n${ct}\n\n${tg}`;
  } else {
    return `${op}\n\n${ct}\n\n${bd}\n\n${tg}`;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode request tidak diizinkan' });
  }

  const { product, tone } = req.body || {};

  if (!product || typeof product !== 'string' || !product.trim()) {
    return res.status(400).json({ error: 'Mohon cantumkan nama produk Anda' });
  }

  const safeTone = tone && typeof tone === 'string' ? tone : 'casual';
  const cleanProduct = product.trim();

  const toneGuidelines = {
    casual: 'Gaya santai, ramah, mengalir akrab seperti obrolan sehari-hari dengan kawan. Variasikan penempatan nama produk (di awal, tengah, atau akhir kalimat).',
    promo: 'Fokus pada nilai penawaran, keterbatasan kesempatan, dan kejelasan cara order. Variasikan susunan kalimat agar tidak formulaik.',
    formal: 'Bahasa baku yang luwes, santun, lugas, dan terpercaya. Cocok untuk profil bisnis profesional, kemitraan, atau korporat.',
    storytelling: 'Awali dengan sudut pandang cerita nyata tentang proses, dedikasi kualitas, atau solusi keseharian. Beri sentuhan emosional yang tulus.'
  };

  const selectedGuideline = toneGuidelines[safeTone] || toneGuidelines.casual;

  try {
    const apiKey = getApiKey();

    if (apiKey) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `Anda adalah seorang praktisi pemasaran digital dan penulis naskah iklan (copywriter) handal dari Indonesia. Tulis naskah dengan gaya bahasa Indonesia yang sangat alami, hidup, variatif panjang kalimatnya, dan terasa ditulis langsung oleh manusia asli (bukan hasil terjemahan kaku atau template robot AI). Variasikan penempatan nama produk agar tidak selalu di posisi awal, bisa di tengah maupun akhir kalimat. ${selectedGuideline} Langsung berikan hasil teks siap posting tanpa kalimat pembuka 'Tentu, ini captionnya' atau penjelasan tambahan.`,
            },
            {
              role: 'user',
              content: `Tuliskan naskah caption media sosial yang memikat untuk produk: ${cleanProduct}`,
            },
          ],
          temperature: 0.9,
          max_tokens: 350,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const caption = data?.choices?.[0]?.message?.content?.trim();
        if (caption) {
          return res.status(200).json({ caption });
        }
      }
    }

    return res.status(200).json({ caption: generateDynamicCaption(cleanProduct, safeTone) });
  } catch (error) {
    return res.status(200).json({ caption: generateDynamicCaption(cleanProduct, safeTone) });
  }
}
