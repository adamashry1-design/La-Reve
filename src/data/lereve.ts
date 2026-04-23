export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Reserve", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "5★", label: "Loved for special evenings and date nights" },
  { value: "Italian", label: "Inspired menu with premium classics" },
  { value: "Alexandria", label: "Elegant destination for upscale dining" },
];

export const serviceHighlights = [
  "Professional, attentive service that feels personal without ever being intrusive.",
  "A calm, romantic atmosphere shaped by soft lighting, refined seating, and quiet confidence.",
  "Beautiful presentation across every course, from starters and steak to signature desserts.",
];

export const featuredDishes = [
  {
    name: "Carpaccio de Boeuf",
    description: "Paper-thin premium beef, parmesan snow, arugula, and a citrus olive oil finish.",
    image: "/images/bruschetta-le-reve.png",
    price: "EGP 420",
  },
  {
    name: "Signature Ribeye",
    description: "Perfectly seared ribeye with black pepper jus, truffle mash, and roasted vegetables.",
    image: "/images/interior-le-reve.png",
    price: "EGP 950",
  },
  {
    name: "Lemon Chicken Linguine",
    description: "Silky pasta with tender chicken, parmesan cream, basil, and a bright lemon finish.",
    image: "/images/pasta-le-reve.png",
    price: "EGP 520",
  },
  {
    name: "Le Rêve Dessert",
    description: "A refined layered pastry with vanilla cream and ice cream for a memorable finale.",
    image: "/images/dessert-le-reve.png",
    price: "EGP 260",
  },
];

export const menuCategories = [
  {
    id: "starters",
    title: "Starters",
    description: "Elegant openings designed to set the tone for an exceptional evening.",
    items: [
      {
        name: "Carpaccio de Boeuf",
        description: "Beef carpaccio, arugula, parmesan shards, capers, and lemon oil.",
        price: "EGP 420",
        image: "/images/bruschetta-le-reve.png",
      },
      {
        name: "Truffle Bruschetta",
        description: "Toasted artisan bread topped with tomatoes, herbs, and truffle glaze.",
        price: "EGP 260",
        image: "/images/bruschetta-le-reve.png",
      },
      {
        name: "Burrata Elegante",
        description: "Creamy burrata with basil pesto, cherry tomatoes, and aged balsamic.",
        price: "EGP 340",
        image: "/images/garden-day-le-reve.png",
      },
    ],
  },
  {
    id: "pizza",
    title: "Pizza Napoli Style",
    description: "Hand-stretched pizzas with delicate char, light dough, and premium toppings.",
    items: [
      {
        name: "Margherita al Forno",
        description: "San Marzano tomato, fior di latte, basil, and extra virgin olive oil.",
        price: "EGP 330",
        image: "/images/garden-day-le-reve.png",
      },
      {
        name: "Funghi Tartufo",
        description: "Mozzarella, mushrooms, truffle cream, parmesan, and fresh herbs.",
        price: "EGP 420",
        image: "/images/interior-le-reve.png",
      },
      {
        name: "Piccante Salame",
        description: "Spicy salami, smoked provolone, oregano, and roasted chili oil.",
        price: "EGP 440",
        image: "/images/patio-le-reve.png",
      },
    ],
  },
  {
    id: "steak",
    title: "Steak & Premium Cuts",
    description: "Confident classics for diners who want depth, richness, and flawless cooking.",
    items: [
      {
        name: "Signature Ribeye",
        description: "Charred ribeye, black pepper jus, truffle mash, and baby carrots.",
        price: "EGP 950",
        image: "/images/interior-le-reve.png",
      },
      {
        name: "Filetto al Pepe",
        description: "Tenderloin medallions with creamy peppercorn sauce and crisp potatoes.",
        price: "EGP 890",
        image: "/images/hero-le-reve.png",
      },
      {
        name: "Tomahawk for Two",
        description: "A dramatic shared cut with rosemary butter and roasted shallots.",
        price: "EGP 1,750",
        image: "/images/patio-le-reve.png",
      },
    ],
  },
  {
    id: "seafood",
    title: "Seafood",
    description: "Fresh, bright dishes finished with finesse and Mediterranean restraint.",
    items: [
      {
        name: "Sea Bass Mediterraneo",
        description: "Pan-seared sea bass with caper butter, lemon, and charred greens.",
        price: "EGP 760",
        image: "/images/garden-night-le-reve.png",
      },
      {
        name: "Garlic Butter Prawns",
        description: "Large prawns in garlic butter with parsley, chili, and lemon zest.",
        price: "EGP 690",
        image: "/images/pasta-le-reve.png",
      },
      {
        name: "Lobster Linguine",
        description: "Silky tomato cream, herbs, and tender lobster folded through pasta.",
        price: "EGP 980",
        image: "/images/pasta-le-reve.png",
      },
    ],
  },
  {
    id: "signatures",
    title: "Signature Dishes",
    description: "The plates guests remember long after the evening ends.",
    items: [
      {
        name: "Lemon Chicken",
        description: "Tender chicken in a velvety lemon-parmesan sauce with artisan pasta.",
        price: "EGP 520",
        image: "/images/pasta-le-reve.png",
      },
      {
        name: "Risotto Tartufo",
        description: "Creamy truffle risotto with parmesan, mushrooms, and herb oil.",
        price: "EGP 470",
        image: "/images/dessert-le-reve.png",
      },
      {
        name: "Le Rêve Dessert",
        description: "A refined pastry layered with cream and crowned with vanilla ice cream.",
        price: "EGP 260",
        image: "/images/dessert-le-reve.png",
      },
    ],
  },
];

export const galleryImages = [
  {
    title: "Arrival & Identity",
    subtitle: "An unforgettable first impression",
    image: "/images/hero-le-reve.png",
  },
  {
    title: "Dessert Moment",
    subtitle: "Soft light, precise plating",
    image: "/images/dessert-le-reve.png",
  },
  {
    title: "Garden Evenings",
    subtitle: "Romantic outdoor calm",
    image: "/images/garden-night-le-reve.png",
  },
  {
    title: "Daytime Terrace",
    subtitle: "Lush, relaxed, and refined",
    image: "/images/garden-day-le-reve.png",
  },
  {
    title: "Table Light",
    subtitle: "Gold warmth and elegant details",
    image: "/images/bruschetta-le-reve.png",
  },
  {
    title: "Interior Ambience",
    subtitle: "Deep tones and premium finishes",
    image: "/images/interior-le-reve.png",
  },
  {
    title: "Patio Architecture",
    subtitle: "Stone, arches, and open air",
    image: "/images/patio-le-reve.png",
  },
  {
    title: "Signature Pasta",
    subtitle: "Comfort elevated",
    image: "/images/pasta-le-reve.png",
  },
];

export const reviews = [
  {
    name: "Lamis",
    quote: "The food was outstanding and the steak was incredible.",
  },
  {
    name: "Samar",
    quote: "Perfect for a date and truly unforgettable.",
  },
  {
    name: "Nada",
    quote: "Elegant, cozy and highly recommended.",
  },
  {
    name: "Karim",
    quote: "Exceptional service and attention to detail.",
  },
  {
    name: "Nadine",
    quote: "One of the best fine dining experiences in Alexandria.",
  },
];

export const contactCards = [
  {
    title: "Location",
    description: "Alexandria, Egypt — a destination for elegant dinners, intimate celebrations, and special occasions.",
  },
  {
    title: "Opening Hours",
    description: "Daily from 1:00 PM to 1:00 AM, with evenings designed for long conversations and memorable courses.",
  },
  {
    title: "Parking",
    description: "Free parking available with plenty of space, making the arrival as smooth as the experience itself.",
  },
  {
    title: "Phone",
    description: "Call us to reserve your table or ask any questions about your visit.",
    phone: "+201101234407",
  },
];
