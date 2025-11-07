# notin

Modern ve basit bir not alma uygulaması. Next.js, shadcn/ui ve LocalStorage kullanılarak geliştirilmiştir.

## Özellikler

- ✨ Modern ve temiz arayüz
- 📝 Sınırsız not oluşturma
- 💾 LocalStorage ile otomatik kaydetme
- 🎨 shadcn/ui ile güzel tasarım
- 🚀 Hızlı ve responsive
- 🌙 Dark mode desteği

## Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI bileşenleri
- [Lucide Icons](https://lucide.dev/) - İkonlar

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Tarayıcınızda açın:

[http://localhost:3000](http://localhost:3000)

## Kullanım

1. **Yeni Not Oluşturma**: Sol üst köşedeki "Yeni Not" butonuna tıklayın
2. **Not Düzenleme**: Bir notu seçin ve sağ taraftaki editörde düzenleyin
3. **Not Silme**: Not üzerine geldiğinizde görünen çöp kutusu ikonuna tıklayın
4. **Otomatik Kaydetme**: Tüm değişiklikler otomatik olarak LocalStorage'a kaydedilir

## Proje Yapısı

```
notes-app/
├── app/
│   ├── layout.tsx        # Ana layout
│   ├── page.tsx          # Ana sayfa
│   └── globals.css       # Global stiller
├── components/
│   ├── NoteSidebar.tsx   # Sol panel (not listesi)
│   ├── NoteEditor.tsx    # Sağ panel (not editörü)
│   └── ui/               # shadcn/ui bileşenleri
├── hooks/
│   └── useLocalStorage.ts # LocalStorage hook'u
├── types/
│   └── note.ts           # TypeScript tipleri
└── lib/
    └── utils.ts          # Yardımcı fonksiyonlar
```

## Özelleştirme

### Renkler

`app/globals.css` dosyasında CSS değişkenlerini düzenleyerek renk paletini özelleştirebilirsiniz.

### Bileşenler

shadcn/ui bileşenleri `components/ui/` klasöründe bulunur ve tamamen özelleştirilebilir.

## Geliştirme

```bash
# Geliştirme modu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint
```

## Lisans

MIT

## Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için lütfen önce bir issue açın.
