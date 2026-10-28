export const business = {
  name: "Aroma Airs",
  legalName: "VS Incorporation",
  phone: "9015759321",
  internationalPhone: "+919015759321",
  email: "aromaairs@gmail.com",
  gstin: "07HYAPS2737D1ZD",
  address:
    "Ground Floor, KH No. 867/2, K2 Block, Defence Enclave, Mahipalpur, New Delhi, South West Delhi, Delhi 110037",
  city: "New Delhi",
};
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
export function whatsapp(subject?: string) {
  const message = subject
    ? `Hello Aroma Airs, I am interested in ${subject}. Please share more details.`
    : "Hello Aroma Airs, I would like to know more about your fragrance diffuser solutions.";
  return `https://wa.me/${business.internationalPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
export const callUrl = `tel:${business.internationalPhone}`;
export type Product = {
  slug: string;
  name: string;
  category: "compact" | "wall" | "tower" | "hvac" | "dispenser";
  technology?: "Cold-air diffusion" | "Automatic aerosol spray";
  label: string;
  image: string;
  gallery: string[];
  showFinish?: boolean;
  finishGalleries?: Record<string, string[]>;
  description: string;
  colors: string[];
  features: string[];
  specs: Record<string, string>;
  applications: string[];
};
export const products: Product[] = [
  {
    "slug": "compact",
    "name": "Compact Black",
    "category": "compact",
    "label": "A little space. A lasting impression.",
    "image": "s-compact",
    "gallery": [
      "s-compact",
      "new-compact-black-wave-3",
      "new-compact-black-wave-4"
    ],
    "description": "A compact cold-air fragrance diffuser in a discreet black finish. Place it on a tabletop or mount it on a wall to bring a consistent scent to reception desks, private offices and smaller interiors. Choose placement and settings with our team to suit your space.",
    "colors": [
      "Black"
    ],
    "features": [
      "Compact, considered design",
      "Wall mounted or tabletop",
      "Ideal for smaller spaces"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts"
    ],
    "showFinish": true
  },
  {
    "slug": "compact-white",
    "name": "Compact White",
    "category": "compact",
    "label": "Quietly elegant. Beautifully compact.",
    "image": "new-compact-white-img-1",
    "gallery": [
      "new-compact-white-img-1",
      "new-compact-white-img-2",
      "new-compact-white-img-3"
    ],
    "description": "A compact cold-air fragrance diffuser with a clean white body and a refillable oil bottle. Designed for wall-mounted or tabletop placement, it brings a considered fragrance experience to homes, offices and reception areas. The accessible bottle compartment makes routine refilling straightforward.",
    "colors": [
      "White"
    ],
    "features": [
      "Cold-air fragrance diffusion",
      "Wall mounted or tabletop",
      "Refillable oil bottle"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts"
    ]
  },
  {
    "slug": "compact-black-wave",
    "name": "Compact Black Wave",
    "category": "compact",
    "label": "Bold lines. Lasting fragrance.",
    "image": "new-compact-black-wave-1",
    "gallery": [
      "new-compact-black-wave-1",
      "new-compact-black-wave-2",
      "new-compact-black-wave-3",
      "new-compact-black-wave-4"
    ],
    "description": "A compact cold-air fragrance diffuser in a black finish with a distinctive wave-pattern front panel. Its wall-mounted format keeps surfaces clear, while the 400 ml refillable oil bottle sits behind a hinged cover for straightforward refilling. Intelligent PCB and Bluetooth control make it easy to set scenting around your space.",
    "colors": [
      "Black"
    ],
    "features": [
      "Wave-pattern front panel",
      "400 ml refillable oil bottle",
      "Intelligent PCB + Bluetooth control"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts"
    ]
  },
  {
    "slug": "compact-white-wave",
    "name": "Compact White Wave",
    "category": "compact",
    "label": "A soft wave of fragrance.",
    "image": "new-compact-white-wave-1",
    "gallery": [
      "new-compact-white-wave-1",
      "new-compact-white-wave-2",
      "new-compact-white-wave-3"
    ],
    "description": "A compact cold-air fragrance diffuser in a white finish with a distinctive wave-pattern front panel. Its wall-mounted format keeps surfaces clear, while the 400 ml refillable oil bottle sits behind a hinged cover for straightforward refilling. Intelligent PCB and Bluetooth control make it easy to set scenting around your space.",
    "colors": [
      "White"
    ],
    "features": [
      "Wave-pattern front panel",
      "400 ml refillable oil bottle",
      "Intelligent PCB + Bluetooth control"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts"
    ]
  },
  {
    "slug": "wall-pro-black",
    "name": "Wall Pro Black",
    "category": "wall",
    "label": "More atmosphere. Less footprint.",
    "image": "new-wall-pro-black-img-1",
    "gallery": [
      "new-wall-pro-black-img-1",
      "new-wall-pro-black-img-2",
      "new-wall-pro-black-img-3",
      "new-wall-pro-black-img-4",
      "new-wall-pro-black-img-5"
    ],
    "description": "A cold-air scenting diffuser in a black finish, designed to bring a consistent fragrance to reception areas, retail interiors and hospitality spaces. Its wall-mounted format keeps surfaces clear, while an accessible internal oil bottle makes refilling convenient. Speak to our team about placement and the right setup for your room.",
    "colors": [
      "Black"
    ],
    "features": [
      "Cold-air fragrance diffusion",
      "Wall-mounted design",
      "Accessible refillable oil bottle"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Retail Stores",
      "Hotels & Resorts",
      "Restaurants & Cafés"
    ]
  },
  {
    "slug": "wall-pro-white",
    "name": "Wall Pro White",
    "category": "wall",
    "label": "Blends into your space. Stands out in experience.",
    "image": "new-wall-pro-white-img-1",
    "gallery": [
      "new-wall-pro-white-img-1",
      "new-wall-pro-white-img-2",
      "new-wall-pro-white-img-3",
      "new-wall-pro-white-img-4",
      "new-wall-pro-white-img-5",
      "new-wall-pro-white-img-6",
      "new-wall-pro-white-img-7",
      "new-wall-pro-white-img-8"
    ],
    "description": "A cold-air scenting diffuser in a white finish, designed to bring a consistent fragrance to reception areas, retail interiors and hospitality spaces. Its wall-mounted format keeps surfaces clear, while an accessible internal oil bottle makes refilling convenient. Speak to our team about placement and the right setup for your room.",
    "colors": [
      "White"
    ],
    "features": [
      "Cold-air fragrance diffusion",
      "Wall-mounted design",
      "Accessible refillable oil bottle"
    ],
    "specs": {
      "Coverage area": "1,000 sq. ft.",
      "Oil capacity": "400 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "115 × 70 × 215 mm",
      "Weight": "1.5 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Offices & Workspaces",
      "Hotels & Resorts",
      "Homes & Apartments"
    ]
  },
  {
    "slug": "tower-series",
    "name": "Tower Series",
    "category": "tower",
    "label": "A statement in design. A signature in scent.",
    "image": "s-tower-product",
    "gallery": [
      "s-tower-product",
      "tower-pair",
      "new-tower-series-black-1",
      "new-tower-series-black-2",
      "new-tower-series-black-3",
      "new-tower-series-black-4"
    ],
    "description": "A floor-standing cold-air diffuser with a refined tower silhouette for lobbies, lounges and open interiors. The 800 ml oil bottle lifts out for convenient refilling, while Bluetooth control helps you shape the scenting experience around your space. Choose Classic Black or Simple Silver to complement your interior.",
    "colors": [
      "Classic Black",
      "Simple Silver"
    ],
    "features": [
      "Floor-standing silhouette",
      "800 ml oil capacity",
      "Bluetooth control"
    ],
    "specs": {
      "Coverage area": "4,000 sq. ft.",
      "Oil capacity": "800 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Metal alloy",
      "Installation type": "Freestanding",
      "Dimensions": "30 × 30 × 70 cm",
      "Weight": "8 kg",
      "Warranty": "1 Year",
      "Operation method": "Bluetooth"
    },
    "applications": [
      "Hotels & Resorts",
      "Offices & Workspaces",
      "Restaurants & Cafés",
      "Spas & Wellness"
    ],
    "finishGalleries": {
      "Classic Black": [
        "s-tower-product",
        "tower-pair",
        "new-tower-series-black-1",
        "new-tower-series-black-2",
        "new-tower-series-black-3",
        "new-tower-series-black-4"
      ],
      "Simple Silver": [
        "new-tower-series-silver-1",
        "tower-pair",
        "new-tower-series-silver-2",
        "new-tower-series-silver-3",
        "new-tower-series-silver-4",
        "new-tower-series-silver-5"
      ]
    }
  },
  {
    "slug": "square-tower",
    "name": "Square Tower",
    "category": "tower",
    "label": "Simple design. Pure atmosphere.",
    "image": "p-square-tower",
    "gallery": [
      "p-square-tower",
      "square-tower",
      "latest-catalogue-1"
    ],
    "description": "A floor-standing square tower with a clean architectural silhouette in Classic Black for homes, lobbies and hospitality interiors.",
    "colors": [
      "Classic Black"
    ],
    "features": [
      "Floor-standing design",
      "800 ml oil capacity",
      "Cold-air nebulizing technology"
    ],
    "specs": {
      "Coverage area": "4,000 sq. ft.",
      "Oil capacity": "800 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Metal alloy",
      "Installation type": "Freestanding",
      "Dimensions": "30 × 30 × 70 cm",
      "Weight": "8 kg",
      "Warranty": "1 Year",
      "Operation method": "Bluetooth"
    },
    "applications": [
      "Hotels & Resorts",
      "Offices & Workspaces",
      "Restaurants & Cafés",
      "Spas & Wellness",
      "Homes & Apartments"
    ]
  },
  {
    "slug": "hvac-power",
    "name": "HVAC Power",
    "category": "hvac",
    "label": "Pure scent. A considered environment.",
    "image": "p-hvac-power",
    "gallery": [
      "p-hvac-power",
      "new-hvac-power-2",
      "latest-catalogue-2"
    ],
    "description": "A cold-air fragrance diffuser for larger interiors, designed for an HVAC scenting setup. Its 800 ml oil bottle supports a practical refill routine for hotels, workplaces and shared commercial spaces. Our team can help match the installation and fragrance settings to your ventilation system, room layout and opening hours.",
    "colors": [
      "Black"
    ],
    "features": [
      "HVAC scenting solution",
      "800 ml oil capacity",
      "Intelligent PCB + Bluetooth control"
    ],
    "specs": {
      "Coverage area": "3,000 sq. ft.",
      "Oil capacity": "800 ml",
      "Power supply": "DC 12V",
      "Noise level": "Silent",
      "Material": "Plastic",
      "Installation type": "Wall-mounted",
      "Dimensions": "35 × 20 × 32 cm",
      "Weight": "3.52 kg",
      "Warranty": "1 Year",
      "Operation method": "Intelligent PCB + Bluetooth"
    },
    "applications": [
      "Hotels & Resorts",
      "Offices & Workspaces",
      "Restaurants & Cafés",
      "Spas & Wellness",
      "Homes & Apartments"
    ]
  },
  {
    "slug": "automatic-dispenser",
    "name": "Automatic Dispenser",
    "category": "dispenser",
    "technology": "Automatic aerosol spray",
    "label": "A fresh welcome, every time.",
    "image": "p-automatic-dispenser",
    "gallery": [
      "p-automatic-dispenser",
      "new-automatic-air-dispenser-img-2",
      "latest-catalogue-3"
    ],
    "description": "The YK3180 automatic aerosol fragrance dispenser offers timed spray intervals and day, night or 24-hour operation. A refillable option for washrooms and small spaces.",
    "colors": [
      "White"
    ],
    "features": [
      "5 / 10 / 20 minute intervals",
      "Day / night / 24-hour modes",
      "Powered by two AA batteries"
    ],
    "specs": {
      "Model": "YK3180",
      "Spray interval": "5 / 10 / 20 minutes",
      "Operating modes": "Day / night / 24H",
      "Battery type": "Two AA batteries",
      "Refill format": "300 ml perfume can",
      "Dimensions": "74 × 78 × 200 mm",
      "Weight": "301 g"
    },
    "applications": [
      "Hotels & Resorts",
      "Offices & Workspaces",
      "Restaurants & Cafés",
      "Spas & Wellness",
      "Homes & Apartments"
    ]
  }
];
export type Fragrance = {
  slug: string;
  name: string;
  family: string;
  mood: string;
  image: string;
  description: string;
  collection: "oil" | "signature";
};
export const fragrances: Fragrance[] = [
  {
    "slug": "agarwood",
    "name": "Agarwood",
    "family": "Woody",
    "mood": "Deep & woody",
    "image": "fragrance-agarwood-product-img",
    "description": "Explore Agarwood in the Aroma Airs fragrance oil collection. Deep & woody in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "amber",
    "name": "Amber",
    "family": "Signature",
    "mood": "Warm & inviting",
    "image": "fragrance-amber-product-img",
    "description": "Explore Amber in the Aroma Airs fragrance oil collection. Warm & inviting in character, it offers a signature direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "amber-leather",
    "name": "Amber Leather",
    "family": "Signature",
    "mood": "Warm & distinctive",
    "image": "fragrance-amberleather-product-img",
    "description": "Explore Amber Leather in the Aroma Airs fragrance oil collection. Warm & distinctive in character, it offers a signature direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "camphor",
    "name": "Camphor",
    "family": "Fresh",
    "mood": "Crisp & aromatic",
    "image": "fragrance-camphor-product-img",
    "description": "Explore Camphor in the Aroma Airs fragrance oil collection. Crisp & aromatic in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "citrus-blend",
    "name": "Citrus Blend",
    "family": "Citrus",
    "mood": "Bright & zesty",
    "image": "fragrance-citrusblend-product-img",
    "description": "Explore Citrus Blend in the Aroma Airs fragrance oil collection. Bright & zesty in character, it offers a citrus direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "dark-forest",
    "name": "Dark Forest",
    "family": "Woody",
    "mood": "Deep & atmospheric",
    "image": "fragrance-darkforest-product-img",
    "description": "Explore Dark Forest in the Aroma Airs fragrance oil collection. Deep & atmospheric in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "fresh-earth",
    "name": "Fresh Earth",
    "family": "Woody",
    "mood": "Earthy & grounded",
    "image": "fragrance-freshearth-product-img",
    "description": "Explore Fresh Earth in the Aroma Airs fragrance oil collection. Earthy & grounded in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "green-apple",
    "name": "Green Apple",
    "family": "Fruity",
    "mood": "Crisp & fruity",
    "image": "fragrance-greenapple-product-img",
    "description": "Explore Green Apple in the Aroma Airs fragrance oil collection. Crisp & fruity in character, it offers a fruity direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "green-tea",
    "name": "Green Tea",
    "family": "Fresh",
    "mood": "Light & refreshing",
    "image": "fragrance-greentea-product-img",
    "description": "Explore Green Tea in the Aroma Airs fragrance oil collection. Light & refreshing in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "lavender",
    "name": "Lavender Calm",
    "family": "Floral",
    "mood": "Soft & floral",
    "image": "fragrance-lavendercalm-product-img",
    "description": "Explore Lavender Calm in the Aroma Airs fragrance oil collection. Soft & floral in character, it offers a floral direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "lemongrass",
    "name": "Lemongrass",
    "family": "Citrus",
    "mood": "Fresh & zesty",
    "image": "fragrance-lemongrass-product-img",
    "description": "Explore Lemongrass in the Aroma Airs fragrance oil collection. Fresh & zesty in character, it offers a citrus direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "mogra-jasmine",
    "name": "Mogra Jasmine",
    "family": "Floral",
    "mood": "Rich & floral",
    "image": "fragrance-mograjasmine-product-img",
    "description": "Explore Mogra Jasmine in the Aroma Airs fragrance oil collection. Rich & floral in character, it offers a floral direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "mountain-fresh",
    "name": "Mountain Fresh",
    "family": "Fresh",
    "mood": "Cool & refreshing",
    "image": "fragrance-mountfresh-product-img",
    "description": "Explore Mountain Fresh in the Aroma Airs fragrance oil collection. Cool & refreshing in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "neroli",
    "name": "Neroli",
    "family": "Floral",
    "mood": "Bright & floral",
    "image": "fragrance-neroli-product-img",
    "description": "Explore Neroli in the Aroma Airs fragrance oil collection. Bright & floral in character, it offers a floral direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "nilgiri",
    "name": "Nilgiri",
    "family": "Fresh",
    "mood": "Fresh & aromatic",
    "image": "fragrance-nilgiri-product-img",
    "description": "Explore Nilgiri in the Aroma Airs fragrance oil collection. Fresh & aromatic in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "ocean-blue",
    "name": "Ocean Blue",
    "family": "Fresh",
    "mood": "Cool & clean",
    "image": "fragrance-oceanblue-product-img",
    "description": "Explore Ocean Blue in the Aroma Airs fragrance oil collection. Cool & clean in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "ocean-breeze",
    "name": "Ocean Breeze",
    "family": "Fresh",
    "mood": "Fresh & airy",
    "image": "fragrance-oceanbreeze-product-img",
    "description": "Explore Ocean Breeze in the Aroma Airs fragrance oil collection. Fresh & airy in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "orange",
    "name": "Orange",
    "family": "Citrus",
    "mood": "Bright & cheerful",
    "image": "fragrance-orange-product-img",
    "description": "Explore Orange in the Aroma Airs fragrance oil collection. Bright & cheerful in character, it offers a citrus direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "oud-arabia",
    "name": "Arabian Oud",
    "family": "Woody",
    "mood": "Deep & warm",
    "image": "fragrance-oudarabian-product-img",
    "description": "Explore Arabian Oud in the Aroma Airs fragrance oil collection. Deep & warm in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "pineapple",
    "name": "Pineapple",
    "family": "Fruity",
    "mood": "Tropical & fruity",
    "image": "fragrance-pineapple-product-img",
    "description": "Explore Pineapple in the Aroma Airs fragrance oil collection. Tropical & fruity in character, it offers a fruity direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "rose-imperial",
    "name": "Rose Imperial",
    "family": "Floral",
    "mood": "Elegant & floral",
    "image": "fragrance-roseimperial-product-img",
    "description": "Explore Rose Imperial in the Aroma Airs fragrance oil collection. Elegant & floral in character, it offers a floral direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "sandalwood",
    "name": "Sandalwood",
    "family": "Woody",
    "mood": "Warm & woody",
    "image": "fragrance-sandalwood-product-img",
    "description": "Explore Sandalwood in the Aroma Airs fragrance oil collection. Warm & woody in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "sangariya-white",
    "name": "Sangariya White",
    "family": "Floral",
    "mood": "Soft & inviting",
    "image": "fragrance-sangariyawhite-product-img",
    "description": "Explore Sangariya White in the Aroma Airs fragrance oil collection. Soft & inviting in character, it offers a floral direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "strawberry",
    "name": "Strawberry",
    "family": "Fruity",
    "mood": "Sweet & fruity",
    "image": "fragrance-strawberry-product-img",
    "description": "Explore Strawberry in the Aroma Airs fragrance oil collection. Sweet & fruity in character, it offers a fruity direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "vanilla",
    "name": "Vanilla",
    "family": "Signature",
    "mood": "Soft & warm",
    "image": "fragrance-vanilla-product-img",
    "description": "Explore Vanilla in the Aroma Airs fragrance oil collection. Soft & warm in character, it offers a signature direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "vanilla-amber",
    "name": "Vanilla Amber",
    "family": "Signature",
    "mood": "Warm & enveloping",
    "image": "fragrance-vanillaamber-product-img",
    "description": "Explore Vanilla Amber in the Aroma Airs fragrance oil collection. Warm & enveloping in character, it offers a signature direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "warm-musk",
    "name": "Warm Musk",
    "family": "Signature",
    "mood": "Soft & comforting",
    "image": "fragrance-warmmusk-product-img",
    "description": "Explore Warm Musk in the Aroma Airs fragrance oil collection. Soft & comforting in character, it offers a signature direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "white-oud",
    "name": "White Oud",
    "family": "Woody",
    "mood": "Refined & woody",
    "image": "fragrance-white-oud-product-img",
    "description": "Explore White Oud in the Aroma Airs fragrance oil collection. Refined & woody in character, it offers a woody direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  },
  {
    "slug": "white-tea",
    "name": "White Tea",
    "family": "Fresh",
    "mood": "Delicate & fresh",
    "image": "fragrance-whitetea-product-img",
    "description": "Explore White Tea in the Aroma Airs fragrance oil collection. Delicate & fresh in character, it offers a fresh direction for your space. Ask our team about bottle sizes, availability and compatible cold-air diffusers.",
    "collection": "oil"
  }
];
export const signatureFragrances = [
  "lavender",
  "citrus-blend",
  "white-tea",
  "sandalwood",
  "ocean-breeze",
].map((slug) => fragrances.find((f) => f.slug === slug)!);
export const oilFragrances = fragrances.filter((f) => f.collection === "oil");
export const categories = [
  {
    slug: "fragrance-diffusers",
    name: "Fragrance Diffusers",
    description:
      "Considered design. Consistent fragrance. Discover a diffuser for your space.",
    key: "all",
  },
  {
    slug: "compact-diffusers",
    name: "Compact Diffusers",
    description:
      "Discreet scenting for smaller interiors, reception desks and living spaces.",
    key: "compact",
  },
  {
    slug: "wall-mounted-diffusers",
    name: "Wall Mounted Diffusers",
    description:
      "A practical scenting solution that keeps your floors and surfaces clear.",
    key: "wall",
  },
  {
    slug: "fragrance-oils",
    name: "Fragrance Oils",
    description:
      "Find your signature scent in our collection of floral, fresh, citrus and woody fragrances.",
    key: "oil",
  },
  {
    slug: "tower-diffusers",
    name: "Tower Diffusers",
    description:
      "Floor-standing scenting with an architectural presence. Explore the Tower Series and Square Tower.",
    key: "tower",
  },
  {
    slug: "hvac-diffusers",
    name: "HVAC Scenting",
    description:
      "Explore HVAC Power and talk to our team about an installation for your space.",
    key: "hvac",
  },
  {
    slug: "automatic-dispensers",
    name: "Automatic Dispensers",
    description:
      "Timed aerosol fragrance spray for washrooms and small spaces.",
    key: "dispenser",
  },
];
export const applications = [
  {
    slug: "hotels-resorts",
    name: "Hotels & Resorts",
    image: "gallery-gallery-image-9",
    icon: "hotel",
    description:
      "Set a welcoming tone from the lobby to the lounge. Match your fragrance to the atmosphere you want guests to remember.",
    suggestion: "Tower Series for lobbies; Compact for smaller spaces.",
  },
  {
    slug: "offices-workspaces",
    name: "Offices & Workspaces",
    image: "gallery-gallery-image-1",
    icon: "building",
    description:
      "Add a fresh, considered finishing touch to reception areas, meeting rooms and shared workspaces.",
    suggestion: "Compact or Wall Pro, according to room size.",
  },
  {
    slug: "retail-stores",
    name: "Retail Stores",
    image: "gallery-gallery-image-17",
    icon: "store",
    description:
      "Create a distinctive atmosphere that complements your store, your interiors and your brand.",
    suggestion: "Wall Pro for a discreet, mounted solution.",
  },
  {
    slug: "hospitals-clinics",
    name: "Hospitals & Clinics",
    image: "gallery-gallery-image-2",
    icon: "hospital",
    description:
      "Explore subtle scenting for suitable non-clinical reception and waiting spaces. Consult your facility team about fragrance sensitivity and local policies.",
    suggestion: "Discuss suitability and low-intensity settings with our team.",
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafés",
    image: "gallery-gallery-image-6",
    icon: "coffee",
    description:
      "Give entrance areas and lounges a welcoming character. Choose placement and intensity with your dining experience in mind.",
    suggestion: "Compact or Wall Pro for entrances and waiting areas.",
  },
  {
    slug: "homes-apartments",
    name: "Homes & Apartments",
    image: "gallery-gallery-image-12",
    icon: "home",
    description:
      "Make everyday spaces feel more personal. Choose a fragrance and a finish that complement the way you live.",
    suggestion: "Compact for living spaces; Tower Series for open interiors.",
  },
  {
    slug: "spas-wellness",
    name: "Spas & Wellness",
    image: "gallery-gallery-image-15",
    icon: "leaf",
    description:
      "Introduce a gentle fragrance into reception and relaxation areas to complement a thoughtfully designed space.",
    suggestion: "Compact or Tower Series, matched to the space.",
  },
];
