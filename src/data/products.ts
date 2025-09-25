export interface Product {
  id: string;
  businessName: string;
  productName: string;
  tags: string[];
  mainImage: string;
  secondaryImage: string;
  rating: number;
  description: string;
  arcColor: string;
  ratingCardColor: string;
}

export const products: Product[] = [
  {
    id: '1',
    businessName: "JENNY'S ORGANIC SPICES",
    productName: "ALL PURPOSE SPICE MIX",
    tags: ["STEWS", "SOUPS", "GRILLS"],
    mainImage: "/images/main_all_purpose_spice.png",
    secondaryImage: "/images/All_purpose_spice.png",
    rating: 5.0,
    description: "A versatile blend of carefully selected organic spices perfect for enhancing the flavor of your favorite dishes. This all-purpose mix combines traditional spices with modern culinary techniques.",
    arcColor: "spice-pink",
    ratingCardColor: "bg-pink-300"
  },
  {
    id: '2',
    businessName: "JENNY'S ORGANIC SPICES",
    productName: "CURRY POWDER SPICE MIX",
    tags: ["CURRY", "RICE", "VEGETABLES"],
    mainImage: "/images/main_curry-powder.png",
    secondaryImage: "/images/curry_powder.png",
    rating: 4.8,
    description: "Authentic curry powder blend with aromatic spices that bring depth and warmth to your curries. Perfect for both traditional and fusion dishes.",
    arcColor: "spice-red",
    ratingCardColor: "bg-red-300"
  },
  {
    id: '3',
    businessName: "JENNY'S ORGANIC SPICES",
    productName: "KELEWELE SPICE MIX",
    tags: ["FRYING", "STREET FOOD", "SNACKS"],
    mainImage: "/images/main_kelewele-spice.png",
    secondaryImage: "/images/kelewele_spice.png",
    rating: 4.9,
    description: "Traditional Ghanaian spice mix perfect for making delicious kelewele (spiced plantain). This blend captures the authentic street food experience.",
    arcColor: "spice-yellow",
    ratingCardColor: "bg-yellow-300"
  },
  {
    id: '4',
    businessName: "JENNY'S ORGANIC SPICES",
    productName: "CHICKEN SPICE MIX",
    tags: ["CHICKEN", "GRILLING", "ROASTING"],
    mainImage: "/images/main_chicken-spice.png",
    secondaryImage: "/images/chicken_spice.png",
    rating: 5.0,
    description: "Specially crafted spice blend designed to bring out the best in chicken dishes. Whether you're grilling, roasting, or pan-frying, this mix delivers exceptional flavor.",
    arcColor: "spice-purple",
    ratingCardColor: "bg-purple-300"
  }
];
