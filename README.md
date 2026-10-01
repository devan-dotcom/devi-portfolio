# Devi Andriyan Subakti — Portfolio V3

Static portfolio website. Tidak menggunakan Next.js, React, npm, atau build step.

## Preview lokal

Double-click `PREVIEW-WEBSITE.bat`. Website akan langsung terbuka di browser tanpa server lokal dan tanpa npm.

Opsional: bila ingin preview melalui local server dan Python tersedia, jalankan `py -m http.server 8080` lalu buka `http://localhost:8080`.

## Struktur

- `index.html` — seluruh konten website
- `styles.css` — visual, layout, responsive, animation
- `script.js` — interaction, live demo, animation, document lightbox
- `assets/profile/` — portrait clean transparent
- `assets/credentials/` — preview ijazah, transkrip, dan sertifikat
- `assets/docs/` — CV dan bundle sertifikat PDF
- `vercel.json` — konfigurasi Vercel static site

## Tentang project preview

Dashboard HARMONY dan project preview menggunakan data simulasi untuk demonstrasi UI. Tidak ada data karyawan asli yang dimasukkan ke website.

## Academic document privacy

Nomor identitas, beberapa nomor dokumen, tanggal lahir, dan QR pada preview ijazah/transkrip disamarkan untuk versi publik. Informasi utama pendidikan tetap dapat dilihat.

## Vercel

Gunakan Vercel project lama agar domain tetap sama.

Framework Preset: `Other`
Build Command: kosong
Install Command: kosong
Output Directory: kosong/default
Root Directory: `./`
