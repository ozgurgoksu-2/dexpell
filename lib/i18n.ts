export type SupportedLanguage = 'en' | 'tr';

export type Messages = Record<string, any>;

export const messages: Record<SupportedLanguage, Messages> = {
  en: {
    nav: {
      brand: 'Dexpell AI',
      login: 'Login',
      getStarted: 'Get Started',
      instantQuotes: 'Instant Quotes',
      aiConfiguration: 'AI Configuration',
      apiAccess: 'API Access',
      company: 'Company',
      aboutUs: 'About Us',
      contact: 'Contact',
      careers: 'Careers',
      connect: 'Connect',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      support: 'Support',
    },
    popup: {
      title: 'Ready to Transform Your Shipping?',
      subtitle:
        'Join thousands of businesses that trust Dexpell AI for their international shipping needs.',
      cta: { try: "Try Now - It's Free" },
      footnote: 'No credit card required • Instant results',
    },
    hero: {
      title: {
        prefix: "Dexpell's",
        highlight: 'Digital Twin',
      },
      subtitle:
        'This site is the fully AI-transformed digital version of Dexpell. Our corporate memory, processes, and expertise are securely processed; our customers speak with the best version of our team 24/7, get quotes, and reach solutions.',
      explainer:
        'analyzes historical shipments and current market data to provide you with the best shipping rates and optimal solutions.',
      explainer2:
        'Our AI-powered system, built by logistics experts, handles everything from sea freight to air cargo with human-like decision making.',
      cta: { quote: 'Get Instant Quote', team: 'Meet Our Digital Team' },
      tagline: {
        prefix: 'You just make the request —',
        suffix: 'Dexpell.ai takes care of the rest.',
      },
      badges: [
        'Real team tone & expertise',
        'Policy and approval flow compliance',
        'WhatsApp • Web • Email',
        'Freight & transit & total cost'
      ],
    },
    features: {
      heading: {
        prefix: 'Everything You Need for',
        highlight: 'Smart Shipping',
      },
      subheading: 'Advanced AI technology meets decades of logistics expertise',
    },
    feature: {
      rtq: {
        title: 'Real-Time Shipping Quotes',
        desc: 'Instant UPS Express pricing for international shipments from Turkey',
      },
      global: {
        title: 'Global Coverage',
        desc: 'Ship to any country worldwide with region-based pricing',
      },
      calc: {
        title: 'Smart Calculations',
        desc: 'Automatic volumetric weight calculation and optimal pricing',
      },
      compliance: {
        title: 'Compliance Check',
        desc: 'Built-in verification for prohibited items and shipping regulations',
      },
      team: {
        title: 'AI Powered Team',
        desc: 'Conversational interface for easy quote generation',
      },
      exp: {
        title: '10+ Years Experience',
        desc: 'Trusted by thousands of businesses for reliable shipping solutions',
      },
    },
    benefits: {
      heading: 'Why Choose Dexpell AI?',
      b1: 'Real-time shipping rate calculation',
      b2: 'Instant customs & HS code analysis',
      b3: 'Delivery time & route optimization',
      b4: 'Coverage in every country, every region',
      b5: 'WhatsApp, Web & API integration',
      b6: '24/7 AI-powered support',
    },
    about: {
      heading: { prefix: 'About', highlight: 'Us' },
      p1: 'At Dexpell, we are redefining the future of logistics solutions.',
      p2: 'In 2025, we took a bold step forward by enhancing our business model with artificial intelligence and smart technologies.',
      p3: 'By integrating artificial intelligence into critical processes such as demand forecasting, route planning, and operational efficiency, we are reshaping the road of logistics.',
      p4: 'With innovation at our core, we empower businesses to move smarter—beyond traditional freight forwarding—through AI-powered decision-making, automation, and digital agility.',
      p5: "Dexpell AI isn't just a feature—it's the engine behind a new era of logistics.",
    },
    cta: {
      title: 'Ready to Transform Your Shipping?',
      subtitle:
        'Join thousands of businesses that trust Dexpell AI for their international shipping needs.',
      try: "Try Now - It's Free",
    },
    footer: {
      tagline: 'AI-powered logistics solutions for modern businesses.',
      copyright: '© 2024 Dexpell AI. All rights reserved.',
    },
    chat: {
      new: 'New Chat',
      placeholder: "Ask about shipping costs (e.g. '5kg to Germany')...",
      wait: 'Please wait for the model to finish its response!',
      welcome: {
        title: 'Hello! I\'m Burcu |X| 😊',
        subtitle: 'I handle courier transportation pricing at Dexpell. Shall I calculate the most suitable price for you right away?',
      },
      suggestions: {
        quote: {
          title: 'Get shipping quote',
          label: 'for my package',
          action: 'I need a shipping quote',
        },
        calculate: {
          title: 'Calculate shipping cost',
          label: 'for electronics to USA',
          action: 'Calculate shipping cost',
        },
        whatCanShip: {
          title: 'What can I ship',
          label: 'with your service?',
          action: 'What items can I ship with your service?',
        },
        checkRates: {
          title: 'Check shipping rates',
          label: 'to European countries',
          action: 'What are the shipping rates to European countries?',
        },
      },
    },
    digitalTeam: {
      heading: 'Meet the Dexpell Digital Team',
      subtitle: 'Global logistics services are not delivered by humans, but our data-driven digital specialists. They provide instant quotes, speak multiple languages, and never miss the details.',
      clickPrompt: 'Click on any available team member to watch their introduction video',
      agents: {
        burcu: {
          name: 'Burcu |X|',
          title: 'Cargo Pricing Executive',
          description: 'Agile, precise, and street-smart. Burcu |X| handles e-commerce and courier delivery planning like no human ever could.',
          features: [
            'Last-mile cost optimization',
            'Courier service & speed analysis',
            'Nearest drop-off hub detection',
            'Marketplace integration',
            'Product-level shipping strategies'
          ]
        },
        selin: {
          name: 'Selin |X|',
          title: 'Global Customs Consultant',
          description: "When your goods are at the border, it's already too late. Selin |X| predicts taxes, identifies HS codes, and flags regulatory issues — before you even ship.",
          features: [
            'HS/HTS code prediction from product details',
            'Country-specific duty & import tax calculation',
            'Trade agreement compliance (FTA, ATR, GSP)',
            'Anti-dumping / Section 232 risk detection',
            'Usage-based classification logic'
          ]
        },
        asli: {
          name: 'Aslı |X|',
          title: 'Air Freight Specialist',
          description: "Speed is her language. Aslı |X| delivers urgent cargo solutions with the fastest air freight options and real-time tracking.",
          features: [
            'Express air cargo',
            'Flight schedule analysis',
            'Airport-to-door service',
            'Priority handling',
            'Time-critical solutions'
          ]
        },
        erkut: {
          name: 'Erkut |X|',
          title: 'Road Freight Specialist',
          description: 'Road warrior with data precision. Erkut |X| calculates optimal trucking routes and delivers competitive land transport quotes instantly.',
          features: [
            'Route optimization',
            'Cross-border transport',
            'Full/partial truck loads',
            'Delivery time estimation',
            'Cost-effective planning'
          ]
        },
        june: {
          name: 'June |X|',
          title: 'Ocean Freight Specialist',
          description: 'Master of the seas. June |X| navigates global trade routes with precision, delivering optimal ocean freight solutions for your cargo.',
          features: [
            'FCL / LCL quotations',
            'Port-to-port optimization',
            'Container load planning',
            'Shipping line selection',
            'Documentation expertise'
          ]
        }
      },
      modal: {
        videoComingSoon: 'Video Coming Soon',
        videoDescription: "'s introduction video will be available here. Ready for portrait video format (1280x720, 16:9 aspect ratio, MP4/H.264).",
        videoUrl: 'Video URL:',
        clickToWatch: 'Click to watch introduction'
      }
    },
  },
  tr: {
    nav: {
      brand: 'Dexpell AI',
      login: 'Giriş Yap',
      getStarted: 'Başla',
      instantQuotes: 'Anında Teklifler',
      aiConfiguration: 'Yapay Zeka Yapılandırması',
      apiAccess: 'API Erişimi',
      company: 'Şirket',
      aboutUs: 'Hakkımızda',
      contact: 'İletişim',
      careers: 'Kariyer',
      connect: 'Bağlantı Kurun',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      support: 'Destek',
    },
    popup: {
      title: 'Gönderilerinizi dönüştürmeye hazır mısınız?',
      subtitle:
        'Uluslararası gönderi ihtiyaçlarında Dexpell AI\'a güvenen binlerce işletmeye katılın.',
      cta: { try: 'Hemen Dene – Ücretsiz' },
      footnote: 'Kredi kartı gerekmez • Anında sonuç',
    },
    hero: {
      title: {
        prefix: "Dexpell'in",
        highlight: 'Dijital İkizi',
      },
      subtitle:
        'Bu site Dexpell şirketinin tamamen yapay zeka ile dönüştürülmüş dijital versiyonudur. Kurumsal hafızamız, süreçlerimiz ve uzmanlığımız güvenle işlenir; müşterilerimiz ekibimizin en iyi haliyle 7/24 konuşur, teklif alır ve çözüme ulaşır.',
      explainer:
        'geçmiş gönderi verilerini ve güncel piyasa bilgilerini analiz ederek size en uygun navlun fiyatlarını ve çözümleri sunar.',
      explainer2:
        'Lojistik uzmanları tarafından geliştirilen yapay zeka destekli sistemimiz, deniz taşımacılığından hava kargosuna kadar her süreci insan benzeri karar mekanizmaları ile yönetir.',
      cta: { quote: 'Anında Teklif Al', team: 'Dijital Ekibimizle Tanışın' },
      tagline: {
        prefix: 'Siz sadece talebi iletin —',
        suffix: 'Dexpell.ai gerisini halleder.',
      },
      badges: [
        'Gerçek ekip tonu & uzmanlığı',
        'Politika ve onay akışlarına uyum',
        'WhatsApp • Web • E-posta',
        'Navlun & transit & toplam maliyet'
      ],
    },
    features: {
      heading: {
        prefix: 'Akıllı Gönderi İçin',
        highlight: 'İhtiyacınız Olan Her Şey',
      },
      subheading:
        'Gelişmiş yapay zeka teknolojisi, onlarca yıllık lojistik deneyimiyle buluşuyor',
    },
    feature: {
      rtq: {
        title: 'Anlık Gönderi Teklifleri',
        desc: 'Türkiye\'den uluslararası gönderiler için anında UPS Express fiyatlandırması',
      },
      global: {
        title: 'Küresel Kapsama',
        desc: 'Bölge bazlı fiyatlandırma ile dünyanın her ülkesine gönderim',
      },
      calc: {
        title: 'Akıllı Hesaplamalar',
        desc: 'Otomatik hacimsel ağırlık hesaplaması ve en uygun fiyatlandırma',
      },
      compliance: {
        title: 'Uygunluk Kontrolü',
        desc: 'Yasaklı ürünler ve taşıma kuralları için entegre doğrulama sistemi',
      },
      team: {
        title: 'Yapay Zeka Destekli Ekip',
        desc: 'Kolay teklif alımı için sohbet tabanlı arayüz',
      },
      exp: {
        title: '10+ Yıllık Deneyim',
        desc: 'Güvenilir lojistik çözümleri için binlerce işletme tarafından tercih ediliyor',
      },
    },
    benefits: {
      heading: 'Neden Dexpell AI?',
      b1: 'Anlık navlun fiyat hesaplaması',
      b2: 'Anında gümrük ve GTİP kodu analizi',
      b3: 'Teslimat süresi ve rota optimizasyonu',
      b4: 'Her ülke ve her bölgede kapsama alanı',
      b5: 'WhatsApp, Web ve API entegrasyonu',
      b6: '7/24 yapay zeka destekli müşteri desteği',
    },
    about: {
      heading: { prefix: 'Hakkımızda', highlight: '' },
      p1: 'Dexpell olarak lojistik çözümlerinin geleceğini yeniden tanımlıyoruz.',
      p2: '2025\'te, iş modelimizi yapay zeka ve akıllı teknolojilerle geliştirerek cesur bir adım attık.',
      p3: 'Yapay zekayı talep tahmini, rota planlama ve operasyonel verimlilik gibi kritik süreçlere entegre ederek lojistiğin yolunu yeniden şekillendiriyoruz.',
      p4: 'Yenilikçilik temelimizde yer alırken, işletmeleri yapay zeka destekli karar verme, otomasyon ve dijital çeviklik ile geleneksel nakliye sınırlarının ötesine taşıyoruz.',
      p5: 'Dexpell AI sadece bir özellik değil — lojistikte yeni bir çağın motorudur.',
    },
    cta: {
      title: 'Gönderilerinizi dönüştürmeye hazır mısınız?',
      subtitle:
        'Uluslararası gönderi ihtiyaçlarında Dexpell AI\'a güvenen binlerce işletmeye katılın.',
      try: 'Hemen Dene – Ücretsiz',
    },
    footer: {
      tagline: 'Modern işletmeler için yapay zeka destekli lojistik çözümleri.',
      copyright: '© 2024 Dexpell AI. Tüm hakları saklıdır.',
    },
    chat: {
      new: 'Yeni Sohbet',
      placeholder: "Kargo maliyetlerini sorun (ör. '5kg Almanya')...",
      wait: 'Lütfen modelin yanıtını tamamlamasını bekleyin! ',
      welcome: {
        title: 'Selam! Ben Burcu |X| 😊',
        subtitle: 'Dexpell\'de kurye taşımacılığı fiyatlandırmasını ben yapıyorum. Hemen sizin için en uygun fiyatı hesaplayayım mı?',
      },
      suggestions: {
        quote: {
          title: 'Kargo teklifi al',
          label: 'paketim için',
          action: 'Kargo teklifi almak istiyorum',
        },
        calculate: {
          title: 'Kargo maliyeti hesapla',
          label: 'ABD\'ye elektronik için',
          action: 'Kargo maliyetini hesapla',
        },
        whatCanShip: {
          title: 'Ne gönderebilirim',
          label: 'hizmetinizle?',
          action: 'Hizmetinizle hangi ürünleri gönderebilirim?',
        },
        checkRates: {
          title: 'Kargo ücretlerini kontrol et',
          label: 'Avrupa ülkelerine',
          action: 'Avrupa ülkelerine kargo ücretleri nedir?',
        },
      },
    },
    digitalTeam: {
      heading: 'Dexpell Dijital Ekibi ile Tanışın',
      subtitle: 'Küresel lojistik hizmetleri insanlar tarafından değil, veri odaklı dijital uzmanlarımız tarafından sunuluyor. Anında teklifler veriyorlar, birden fazla dil konuşuyorlar ve hiçbir detayı kaçırmıyorlar.',
      clickPrompt: 'Tanıtım videosunu izlemek için herhangi bir mevcut ekip üyesine tıklayın',
      agents: {
        burcu: {
          name: 'Burcu |X|',
          title: 'Kargo Fiyatlandırma Uzmanı',
          description: 'Çevik, hassas ve sokak zekası olan. Burcu |X|, e-ticaret ve kurye teslimat planlamasını hiçbir insanın yapamayacağı şekilde yönetiyor.',
          features: [
            'Son kilometre maliyet optimizasyonu',
            'Kurye servisi ve hız analizi',
            'En yakın teslimat hub tespiti',
            'Marketplace entegrasyonu',
            'Ürün bazlı nakliye stratejileri'
          ]
        },
        selin: {
          name: 'Selin |X|',
          title: 'Uluslararası Gümrük Danışmanı',
          description: 'Mallarınız sınırda olduğunda, artık çok geç. Selin |X| vergileri tahmin ediyor, HS kodlarını belirliyor ve düzenleyici sorunları işaretliyor - siz daha göndermeden önce.',
          features: [
            'Ürün detaylarından HS/HTS kod tahmini',
            'Ülkeye özel gümrük vergisi ve ithalat vergisi hesaplaması',
            'Ticaret anlaşması uyumluluğu (FTA, ATR, GSP)',
            'Anti-damping / Bölüm 232 risk tespiti',
            'Kullanım bazlı sınıflandırma mantığı'
          ]
        },
        asli: {
          name: 'Aslı |X|',
          title: 'Havayolu Taşımacılığı Uzmanı',
          description: "Hız onun dili. Aslı |X|, en hızlı hava kargo seçenekleri ve gerçek zamanlı takip ile acil kargo çözümleri sunuyor.",
          features: [
            'Ekspres hava kargo',
            'Uçuş programı analizi',
            'Havaalanından kapıya servis',
            'Öncelikli elleçleme',
            'Zaman kritik çözümler'
          ]
        },
        erkut: {
          name: 'Erkut |X|',
          title: 'Karayolu Taşımacılığı Uzmanı',
          description: 'Veri hassasiyetiyle donanmış yol savaşçısı. Erkut |X|, optimal kamyon rotalarını hesaplıyor ve rekabetçi kara taşımacılığı teklifleri anında sunuyor.',
          features: [
            'Rota optimizasyonu',
            'Sınır ötesi taşımacılık',
            'Tam/parsiyel kamyon yükleri',
            'Teslimat süresi tahmini',
            'Maliyet etkin planlama'
          ]
        },
        june: {
          name: 'June |X|',
          title: 'Denizyolu Taşımacılığı Uzmanı',
          description: 'Denizlerin ustası. June |X|, küresel ticaret rotalarında hassasiyetle geziniyor ve kargonuz için en uygun deniz taşımacılığı çözümlerini sunuyor.',
          features: [
            'FCL / LCL teklifleri',
            'Liman-liman optimizasyonu',
            'Konteyner yük planlaması',
            'Nakliye hattı seçimi',
            'Dokümantasyon uzmanlığı'
          ]
        }
      },
      modal: {
        videoComingSoon: 'Video Yakında Geliyor',
        videoDescription: ' tanıtım videosu burada mevcut olacak. Dikey video formatı için hazır (1280x720, 16:9 en boy oranı, MP4/H.264).',
        videoUrl: 'Video URL:',
        clickToWatch: 'Tanıtımı izlemek için tıklayın'
      }
    },
  },
};

export function translate(lang: SupportedLanguage, key: string): string {
  const dict = messages[lang] || messages.en;
  const parts = key.split('.');
  let cur: any = dict;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p];
    } else {
      return key;
    }
  }
  return typeof cur === 'string' ? cur : key;
}