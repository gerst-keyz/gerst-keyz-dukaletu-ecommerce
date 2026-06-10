import { Product, Testimonial, FAQItem } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Smartphone ya Kisasa (Samsung Galaxy A54)",
    price: 850000,
    description: "Simu yenye kioo kikubwa cha Super AMOLED, uwezo mkubwa wa betri ya 5000mAh na kamera ya kiwango cha juu 50MP.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 145,
    rating: 4.8,
    stock: 25
  },
  {
    id: "2",
    name: "Laptop ya Kazi (HP ProBook G9)",
    price: 1450000,
    description: "Laptop imara na yenye kasi kwa ajili ya ofisi, masomo au biashara yako. Core i5, 8GB RAM na SSD ya 256GB.",
    image: "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 88,
    rating: 4.7,
    stock: 12
  },
  {
    id: "3",
    name: "Smart TV Inch 43 (Hisense Android TV)",
    price: 750000,
    description: "Furahia picha angavu ya 4K Ultra HD. Inakuja na mifumo ya YouTube, Netflix na Android iliyojengewa ndani.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 92,
    rating: 4.6,
    stock: 15
  },
  {
    id: "4",
    name: "Friji ya Milango Miwili (Samsung No-Frost)",
    price: 1200000,
    description: "Friji ya kisasa isiyogandisha barafu (no-frost) na isiyotumia umeme mwingi (energy saver). Inahifadhi vyakula vyako safi kwa muda mrefu.",
    image: "https://images.unsplash.com/photo-1571175432250-0196677aa4d8?auto=format&fit=crop&w=500&q=80",
    category: "Vifaa vya Nyumbani",
    salesCount: 34,
    rating: 4.9,
    stock: 8
  },
  {
    id: "5",
    name: "Mashine ya Kufulia (Front-Load 8Kg)",
    price: 1100000,
    description: "Kuosha nguo sasa ni rahisi sana! Mashine ya kufulia ya kujiendesha yenyewe (fully automatic) yenye uwezo wa kilo 8.",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebd01?auto=format&fit=crop&w=500&q=80",
    category: "Vifaa vya Nyumbani",
    salesCount: 41,
    rating: 4.5,
    stock: 6
  },
  {
    id: "6",
    name: "Viatu vya Michezo (Sports Runners)",
    price: 950000 / 10, // 95,000 Shilling
    description: "Viatu vyepesi, imara na vyenye faraja ya juu kwa ajili ya mazoezi au matembezi ya kawaida ya kila siku.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 210,
    rating: 4.9,
    stock: 50
  },
  {
    id: "7",
    name: "Nguo za Kijadidi (Premium Cotton T-Shirt)",
    price: 35000,
    description: "T-shati za pamba 100% zilizoshonwa kwa ubora wa kipekee kwa ajili ya kupendeza katika mazingira yoyote ya burudani au kazi.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 340,
    rating: 4.4,
    stock: 100
  },
  {
    id: "8",
    name: "Saa ya Mkononi (Minimalist Leather Watch)",
    price: 125000,
    description: "Saa ya kifahari yenye mkanda wa ngozi halisi na kioo kisichokwaruzika kirahisi. Inafaa kwa mtindo wowote wa mavazi rasmi na yasiyo rasmi.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 156,
    rating: 4.8,
    stock: 30
  },
  {
    id: "9",
    name: "Wireless Headphones (Bluetooth Bass Boost)",
    price: 150000,
    description: "Sikia kila mlio kwa usahihi wa kipekee na bass nzito. Inatoa uwezo wa kudumu na betri hadi masaa 40 mfululizo.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    category: "Burudani na Muziki",
    salesCount: 189,
    rating: 4.7,
    stock: 40
  },
  {
    id: "10",
    name: "Speaker Inayobebeka (JBL Flip 6)",
    price: 320000,
    description: "Spika isiyoingiliwa na maji (waterproof) yenye sauti kubwa na wazi sana. Rahisi kubeba unapoenda ufukweni au safarini.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
    category: "Burudani na Muziki",
    salesCount: 110,
    rating: 4.8,
    stock: 22
  },
  {
    id: "11",
    name: "Power Bank ya Haraka (20,000mAh Power Delivery)",
    price: 65000,
    description: "Chaji simu yako haraka popote ulipo kwa kutumia nguvu ya 22.5W Fast Charging. Ina milango mitatu ya USB.",
    image: "https://images.unsplash.com/photo-1609592424109-dd77be7163c4?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 228,
    rating: 4.6,
    stock: 60
  },
  {
    id: "12",
    name: "Kamera ya Kidijitali (Canon EOS Rebel)",
    price: 1650000,
    description: "Anza safari yako ya upigaji picha wa kitaalamu kwa kamera hii yenye sensor ya 24.1 megapixel na lenzi ya 18-55mm.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 29,
    rating: 4.9,
    stock: 5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Juma Hamisi",
    role: "Mjasiriamali",
    location: "Dar es Salaam",
    comment: "Huduma yao ni ya haraka sana! Niliagiza saa ya mkononi na mashine ya kufulia, nikapokea bidhaa zangu siku hiyo hiyo. Kuagiza kwa WhatsApp kunarahisisha mazungumzo.",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    id: "t2",
    name: "Amina Salum",
    role: "Mwalimu wa Sekondari",
    location: "Arusha",
    comment: "Bidhaa zao ni orijino na bei ziko chini ukilinganisha na maduka mengine. Laptop ninayoitumia sasa niliagiza hapa na inafanya kazi nzuri.",
    rating: 5,
    avatar: "👩‍🏫"
  },
  {
    id: "t3",
    name: "Emmanuel John",
    role: "Mpiga Picha",
    location: "Mwanza",
    comment: "Kamera niliyoinunua imebadilisha kabisa biashara yangu. Msaada kwa wateja ulikuwa bora sana tangu uagizaji hadi kufika kwa bidhaa mkoani.",
    rating: 5,
    avatar: "📸"
  },
  {
    id: "t4",
    name: "Zuwena Omar",
    role: "Mwanafunzi wa Chuo",
    location: "Dodoma",
    comment: "Napenda sana sneakers nilizozinunua hapa, zinadumu na zinavutia. Bei ni rafiki sana kwa wanafunzi!",
    rating: 4,
    avatar: "👩‍🎓"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Je, mnasafirisha bidhaa mikoani?",
    answer: "Ndiyo, tunasafirisha bidhaa mikoa yote ya Tanzania (ikiwemo Zanzibar) kupitia mabasi ya uhakika au mashirika ya usafirishaji kama DHL. Gharama za usafirishaji hutegemea uzito na umbali wa mkoa wako."
  },
  {
    question: "Je, mna duka la kimwili (Physical Store)?",
    answer: "Ndiyo, ofisi zetu kuu zipo Kariakoo, mtaa wa Msimbazi, Dar es Salaam. Unakaribishwa kufika na kujionea bidhaa kabla ya kufanya maamuzi ya kununua."
  },
  {
    question: "Njia gani za malipo mnakubali?",
    answer: "Tunapokea malipo kwa njia za simu (M-Pesa, Tigo Pesa, Airtel Money, Halopesa) na malipo ya benki (NMB, CRDB). Pia kwa wateja wa Dar es Salaam tunakubali malipo wakati wa kupokea bidhaa (Cash on Delivery)."
  },
  {
    question: "Inachukua muda gani kupata mzigo wangu?",
    answer: "Kwa wateja wa Dar es Salaam, utafikishiwa mzigo wako ndani ya masaa 2 hadi 6. Kwa mikoa mingine, mzigo utafika ndani ya masaa 24 hadi 48 tangu kufanikiwa kwa malipo au oda."
  },
  {
    question: "Je, bidhaa zenu zina dhamana (Warranty)?",
    answer: "Ndiyo! Bidhaa zote za elektroniki na vifaa vya nyumbani (friji, runinga, laptop) zina warranty ya miezi 12 kutoka kwa watengenezaji."
  }
];
