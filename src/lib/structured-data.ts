import { RESTAURANT_DATA } from "@/data/menu";

export function getRestaurantStructuredData() {
  const allItems = RESTAURANT_DATA.categories.flatMap((c) => c.items);
  const minPrice = Math.min(...allItems.map((i) => i.price));
  const maxPrice = Math.max(...allItems.map((i) => i.price));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT_DATA.restaurant,
    alternateName: RESTAURANT_DATA.restaurantAm,
    telephone: RESTAURANT_DATA.phone,
    servesCuisine: ["Ethiopian", "Fast Food", "Coffee"],
    priceRange: `${minPrice}-${maxPrice} ETB`,
    menu: {
      "@type": "Menu",
      hasMenuSection: RESTAURANT_DATA.categories.map((cat) => ({
        "@type": "MenuSection",
        name: cat.category,
        hasMenuItem: cat.items.map((item) => ({
          "@type": "MenuItem",
          name: `${item.name_ao} (${item.name_am})`,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "ETB",
          },
        })),
      })),
    },
  };
}