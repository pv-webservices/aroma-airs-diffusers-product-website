export const business = {
  name: "Aroma airs",
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
    ? `Hello Aroma airs, I am interested in ${subject}. Please share more details.`
    : "Hello Aroma airs, I would like to know more about your fragrance diffuser solutions.";
  return `https://wa.me/${business.internationalPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
export const callUrl = `tel:${business.internationalPhone}`;
export type Product = {
  slug: string;
  name: string;
  category: "compact" | "wall" | "tower";
  label: string;
  image: string;
  gallery: string[];
  description: string;
  colors: string[];
  features: string[];
  specs: Record<string, string>;
  applications: string[];
};
export const products: Product[] = [
  {
    slug: "compact",
    name: "Compact",
    category: "compact",
    label: "A little space. A lasting impression.",
    image: "compact",
    gallery: ["compact", "hero-trio", "table-lifestyle"],
    description:
      "A compact black diffuser for a welcoming, consistent fragrance experience. Designed to sit neatly on a tabletop or mount on a wall.",
    colors: ["Black"],
    features: [
      "Compact, considered design",
      "Wall mounted or tabletop",
      "Ideal for smaller spaces",
    ],
    specs: {
      "Coverage area": "Up to 1,000 sq. ft.",
      "Oil capacity": "150 ml",
      "Power supply": "DC 12V / 5W",
      "Noise level": "Under 35 dB",
      Material: "Premium ABS",
      Installation: "Wall mounted / tabletop",
      Dimensions: "170 × 85 × 220 mm",
    },
    applications: [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts",
    ],
  },
  {
    slug: "compact-white",
    name: "Compact White",
    category: "compact",
    label: "Quietly elegant. Beautifully compact.",
    image: "compact-white",
    gallery: ["compact-white", "hero-trio"],
    description:
      "A white finish with a distinctive front panel, designed to complement lighter interiors. A discreet fragrance solution for smaller spaces.",
    colors: ["White"],
    features: [
      "Compact, elegant design",
      "Wall mountable",
      "Ideal for smaller spaces",
    ],
    specs: { Colour: "White", Installation: "Wall mounted" },
    applications: [
      "Homes & Apartments",
      "Offices & Workspaces",
      "Hotels & Resorts",
    ],
  },
  {
    slug: "wall-pro-black",
    name: "Wall Pro Black",
    category: "wall",
    label: "More atmosphere. Less footprint.",
    image: "wall-pro-black",
    gallery: [
      "wall-pro-black",
      "wall-interior-black",
      "wall-back",
      "wall-lifestyle",
    ],
    description:
      "A wall-mounted scenting solution with a confident black finish. Bring fragrance into commercial spaces while keeping floors and surfaces clear.",
    colors: ["Black"],
    features: [
      "Wall-mounted design",
      "For larger spaces",
      "Easy-access oil compartment",
    ],
    specs: {
      Colour: "Black",
      Installation: "Wall mounted",
      Technology: "Cold-air diffusion",
    },
    applications: ["Retail Stores", "Hotels & Resorts", "Restaurants & Cafés"],
  },
  {
    slug: "wall-pro-white",
    name: "Wall Pro White",
    category: "wall",
    label: "Blends into your space. Stands out in experience.",
    image: "wall-pro-white-product",
    gallery: ["wall-pro-white-product", "wall-interior-white"],
    description:
      "A clean white wall diffuser that sits comfortably in modern interiors. A practical way to introduce a consistent scent to shared spaces.",
    colors: ["White"],
    features: [
      "Clean, white finish",
      "Wall-mounted design",
      "For larger spaces",
    ],
    specs: {
      Colour: "White",
      Installation: "Wall mounted",
      Technology: "Cold-air diffusion",
    },
    applications: [
      "Offices & Workspaces",
      "Hotels & Resorts",
      "Homes & Apartments",
    ],
  },
  {
    slug: "tower-series",
    name: "Tower Series",
    category: "tower",
    label: "A statement in design. A signature in scent.",
    image: "tower-product",
    gallery: [
      "tower-product",
      "tower-pair",
      "tower-controls",
      "hotel-lifestyle",
    ],
    description:
      "A refined, floor-standing diffuser for lobbies, lounges and open interiors. Choose Classic Black or Simple Silver to complement your space.",
    colors: ["Classic Black", "Simple Silver"],
    features: [
      "Floor-standing silhouette",
      "800 ml oil capacity",
      "Touch / Bluetooth controls",
    ],
    specs: {
      "Oil capacity": "800 ml",
      Colours: "Classic Black / Simple Silver",
      Installation: "Floor standing",
      "Control methods": "Touch / Bluetooth",
    },
    applications: [
      "Hotels & Resorts",
      "Offices & Workspaces",
      "Restaurants & Cafés",
      "Spas & Wellness",
    ],
  },
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
    slug: "gucci-flora",
    name: "Gucci Flora",
    family: "Floral",
    mood: "Delicate & inviting",
    image: "scent-flora",
    description: "A delicate floral bouquet for an inviting atmosphere.",
    collection: "oil",
  },
  {
    slug: "lavender",
    name: "Lavender",
    family: "Floral",
    mood: "Calming & soothing",
    image: "scent-lavender",
    description:
      "A soothing lavender profile that brings a softer character to your space.",
    collection: "oil",
  },
  {
    slug: "trishya",
    name: "Trishya",
    family: "Signature",
    mood: "Exotic & enchanting",
    image: "scent-trishya",
    description:
      "An exotic, enchanting fragrance with a distinctive personality.",
    collection: "oil",
  },
  {
    slug: "tea-rose",
    name: "Tea Rose",
    family: "Floral",
    mood: "Romantic & timeless",
    image: "scent-tea-rose",
    description: "A romantic rose fragrance with a timeless floral character.",
    collection: "oil",
  },
  {
    slug: "modern-oud",
    name: "Modern Oud",
    family: "Woody",
    mood: "Rich & sophisticated",
    image: "scent-modern-oud",
    description: "Rich, woody and sophisticated, with a warm oud character.",
    collection: "oil",
  },
  {
    slug: "lemongrass",
    name: "Lemongrass",
    family: "Citrus",
    mood: "Zesty & uplifting",
    image: "scent-lemongrass",
    description:
      "A fresh, zesty fragrance for a bright and uplifting atmosphere.",
    collection: "oil",
  },
  {
    slug: "oud-arabia",
    name: "Oud Arabia",
    family: "Woody",
    mood: "Deep & warm",
    image: "scent-oud-arabia",
    description:
      "A deep, warm oud fragrance for a rich and welcoming ambience.",
    collection: "oil",
  },
  {
    slug: "shangria-white",
    name: "Shangria White",
    family: "Fresh",
    mood: "Soft & elegant",
    image: "scent-shangria",
    description:
      "Soft, clean and elegant. A subtle fragrance for contemporary spaces.",
    collection: "oil",
  },
  {
    slug: "ocean-breeze",
    name: "Ocean Breeze",
    family: "Fresh",
    mood: "Fresh & revitalizing",
    image: "scent-ocean",
    description: "A cool, refreshing fragrance with an invigorating character.",
    collection: "oil",
  },
  {
    slug: "citrus-fresh",
    name: "Citrus Fresh",
    family: "Citrus",
    mood: "Uplifting & energizing",
    image: "scent-citrus",
    description:
      "A bright citrus scent for a fresh, welcoming atmosphere. Contact us for availability in the signature range.",
    collection: "signature",
  },
  {
    slug: "white-blossom",
    name: "White Blossom",
    family: "Floral",
    mood: "Elegant & romantic",
    image: "scent-white-blossom",
    description:
      "A gentle floral character that lends elegance to your surroundings. Contact us for signature range availability.",
    collection: "signature",
  },
  {
    slug: "sandalwood",
    name: "Sandalwood",
    family: "Woody",
    mood: "Warm & relaxing",
    image: "scent-sandalwood",
    description:
      "A warm, woody fragrance for an inviting space. Contact us for signature range availability.",
    collection: "signature",
  },
];
export const signatureFragrances = [
  "lavender",
  "citrus-fresh",
  "white-blossom",
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
];
export const applications = [
  {
    slug: "hotels-resorts",
    name: "Hotels & Resorts",
    image: "hotel-lifestyle",
    icon: "hotel",
    description:
      "Set a welcoming tone from the lobby to the lounge. Match your fragrance to the atmosphere you want guests to remember.",
    suggestion: "Tower Series for lobbies; Compact for smaller spaces.",
  },
  {
    slug: "offices-workspaces",
    name: "Offices & Workspaces",
    image: "office",
    icon: "building",
    description:
      "Add a fresh, considered finishing touch to reception areas, meeting rooms and shared workspaces.",
    suggestion: "Compact or Wall Pro, according to room size.",
  },
  {
    slug: "retail-stores",
    name: "Retail Stores",
    image: "retail",
    icon: "store",
    description:
      "Create a distinctive atmosphere that complements your store, your interiors and your brand.",
    suggestion: "Wall Pro for a discreet, mounted solution.",
  },
  {
    slug: "hospitals-clinics",
    name: "Hospitals & Clinics",
    image: "hospital",
    icon: "hospital",
    description:
      "Explore subtle scenting for suitable non-clinical reception and waiting spaces. Consult your facility team about fragrance sensitivity and local policies.",
    suggestion: "Discuss suitability and low-intensity settings with our team.",
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafés",
    image: "cafe",
    icon: "coffee",
    description:
      "Give entrance areas and lounges a welcoming character. Choose placement and intensity with your dining experience in mind.",
    suggestion: "Compact or Wall Pro for entrances and waiting areas.",
  },
  {
    slug: "homes-apartments",
    name: "Homes & Apartments",
    image: "home-lifestyle",
    icon: "home",
    description:
      "Make everyday spaces feel more personal. Choose a fragrance and a finish that complement the way you live.",
    suggestion: "Compact for living spaces; Tower Series for open interiors.",
  },
  {
    slug: "spas-wellness",
    name: "Spas & Wellness",
    image: "spa",
    icon: "leaf",
    description:
      "Introduce a gentle fragrance into reception and relaxation areas to complement a thoughtfully designed space.",
    suggestion: "Compact or Tower Series, matched to the space.",
  },
];
