import type { RestaurantMenu } from "@/types/menu";

export const RESTAURANT_DATA: RestaurantMenu = {
  restaurant: "Choche Takeaway",
  restaurantAm: "ጮጮ ኮፈ ሀዉስ",
  phone: "0917363738",
  tagline: "Scan. Explore. Order.",
  categories: [
    {
      id: "fastfood",
      category: "Fast Food | ፋስት ፉድ",
      icon: "🍔",
      color: "text-category-fastfood",
      colorHex: "#E8612A",
      items: [
        { name_ao: "Bargarii Isipeshalii",   name_am: "ስፔሻል በርገር",       price: 350 },
        { name_ao: "Bargarii Normalii",      name_am: "ኖርማል በርገር",       price: 280 },
        { name_ao: "Bargarii Chiizii",       name_am: "ቺዝ በርገር",          price: 300 },
        { name_ao: "Bargarii Filafilii",     name_am: "ፍላፍል በርገር",        price: 250 },
        { name_ao: "Bargarii Chickinii",     name_am: "ቺክን በርገር",         price: 400, featured: true },
        { name_ao: "Pizzaa Cocee Ispeshali", name_am: "ጮጮ ስፔሻል ፒዛ",      price: 400, featured: true },
        { name_ao: "Pizzaa Normalii",        name_am: "ኖርማል ፒዛ",          price: 350 },
        { name_ao: "Pizzaa Tuunaa",          name_am: "ቱና ፒዛ",            price: 500, featured: true },
        { name_ao: "Pizzaa Chiizii",         name_am: "ቺዝ ፒዛ",            price: 320 },
        { name_ao: "Pizzaa Beefii",          name_am: "ቢፍ ፒዛ",            price: 400 },
        { name_ao: "Pizzaa Chickinii",       name_am: "ቺክን ፒዛ",           price: 400 },
        { name_ao: "Pizzaa Margariitaa",     name_am: "ማርጋሪታ ፒዛ",        price: 450 },
        { name_ao: "Pizzaa Kuduraa",         name_am: "አትክልት ፒዛ",         price: 450 },
        { name_ao: "Rappii Ispeshalii",      name_am: "ስፔሻል ራፕ",          price: 200 },
        { name_ao: "Rappii Normalii",        name_am: "ኖርማል ራፕ",          price: 150 },
        { name_ao: "Irxibii Ispeshalii",     name_am: "ስፔሻል እርጥብ",        price: 100 },
        { name_ao: "Irxibii Normalii",       name_am: "ኖርማል እርጥብ",        price: 70  },
        { name_ao: "Chipsii",                name_am: "ቺፕስ",               price: 70  },
        { name_ao: "Sanduchii Hanqaaquu",    name_am: "እንቁላል ሳንድዊች",      price: 140 },
        { name_ao: "Sanduchii Beefii",       name_am: "ቢፍ ሳንድዊች",         price: 200 },
        { name_ao: "Sanduchii Chickinii",    name_am: "ቺክን ሳንድዊች",        price: 270 },
        { name_ao: "Sanduchii Tunaa",        name_am: "ቱና ሳንድዊች",         price: 250 },
        { name_ao: "Sanduchii Kuduraa",      name_am: "አትክልት ሳንድዊች",      price: 120 },
      ],
    },
    {
      id: "cold",
      category: "Cold Drinks | ቀዝቃዛ መጠጥ",
      icon: "🧊",
      color: "text-category-cold",
      colorHex: "#3BA8C4",
      items: [
        { name_ao: "Lallaafaa",      name_am: "ለስላሳ",       price: 50 },
        { name_ao: "Bishaan 1/2L",   name_am: "ውሃ 1/2 ሊትር", price: 30 },
        { name_ao: "Bishaan 1L",     name_am: "ውሃ 1 ሊትር",   price: 40 },
        { name_ao: "Bishaan 2L",     name_am: "ውሃ 2 ሊትር",   price: 50 },
      ],
    },
    {
      id: "hot",
      category: "Hot Drinks | ትኩስ መጠጥ",
      icon: "☕",
      color: "text-category-hot",
      colorHex: "#C4703B",
      items: [
        { name_ao: "Shaayii",      name_am: "ሻይ",     price: 20 },
        { name_ao: "Buna",         name_am: "ቡና",     price: 30, featured: true },
        { name_ao: "Maakiyaatoo",  name_am: "ማኪያቶ",  price: 50 },
        { name_ao: "Aannan",       name_am: "ወተት",    price: 50 },
        { name_ao: "Ispirisii",    name_am: "እስፕሬሶ", price: 25 },
      ],
    },
    {
      id: "juice",
      category: "Juice | ጁስ",
      icon: "🥤",
      color: "text-category-juice",
      colorHex: "#5CB85C",
      items: [
        { name_ao: "Jusii Isipeshali",  name_am: "ስፔሻል ጁስ",       price: 130, featured: true },
        { name_ao: "Jusii Ispirisii",   name_am: "እስፕሬሶ ጁስ",      price: 100 },
        { name_ao: "Jusii Avokaadoo",   name_am: "አቮካዶ ጁስ",        price: 120 },
        { name_ao: "Jusii Paapayyaa",   name_am: "ፓፓያ ጁስ",         price: 120 },
        { name_ao: "Jusii Zaytunaa",    name_am: "ዘይቱና ጁስ",        price: 120 },
        { name_ao: "Jusii Maangoo",     name_am: "ማንጎ ጁስ",         price: 120 },
        { name_ao: "Aannan Qabbana'aa", name_am: "የቀዘቀዘ ወተት",      price: 100 },
      ],
    },
    {
      id: "breakfast",
      category: "Breakfast | ቁርስ",
      icon: "🍳",
      color: "text-category-breakfast",
      colorHex: "#C4A83B",
      items: [
        { name_ao: "Ispeshal Caccabsaa",  name_am: "ስፔሻል ጨጨብሳ",    price: 170, featured: true },
        { name_ao: "Normal Caccabsaa",    name_am: "ኖርማል ጨጨብሳ",    price: 130 },
        { name_ao: "Faxiiraa Ispeshalii", name_am: "ስፔሻል ፋጢራ",     price: 160 },
        { name_ao: "Faxiiraa Normalii",   name_am: "ኖርማል ፋጢራ",     price: 130 },
        { name_ao: "Hanqaaquu Silsii",    name_am: "እንቁላል ስልስ",     price: 140 },
        { name_ao: "Hanqaaquu Firfirii",  name_am: "እንቁላል ፍርፍር",    price: 120 },
        { name_ao: "Hanqaaquu Fooniin",   name_am: "እንቁላል በስጋ",     price: 180 },
        { name_ao: "Firfirii Normalii",   name_am: "ኖርማል ፍርፍር",     price: 120 },
        { name_ao: "Firfirii Fooniin",    name_am: "ፍርፍር በስጋ",      price: 190 },
        { name_ao: "Firfirii Hanqaaquun", name_am: "ፍርፍር በእንቁላል",   price: 170 },
        { name_ao: "Firfirii Kuduraan",   name_am: "ፍርፍር በአትክልት",   price: 140 },
        { name_ao: "Marqaa Furnoo",       name_am: "የፋርኖ ገንፎ",      price: 140 },
        { name_ao: "Marqaa Garbuu",       name_am: "የገብስ ገንፎ",      price: 140 },
        { name_ao: "Marqaa Bullaa",       name_am: "የቡላ ገንፎ",       price: 150 },
        { name_ao: "Marqaa Boqqoloo",     name_am: "የበቆሎ ገንፎ",      price: 120 },
        { name_ao: "Paastaa Sugoon",      name_am: "ፓስታ በሶስ",       price: 130 },
        { name_ao: "Paastaa Fooniin",     name_am: "ፓስታ በስጋ",       price: 190 },
        { name_ao: "Ayinatii",            name_am: "በያይነት",          price: 130 },
        { name_ao: "Firfirii Sufii",      name_am: "ሱፍ ፍትፍት",       price: 120 },
      ],
    },
    {
      id: "main",
      category: "Main Dishes | ምግብ ዝርዝር",
      icon: "🍽️",
      color: "text-category-main",
      colorHex: "#C43B3B",
      items: [
        { name_ao: "Faxiiraa Choche Ispeshalii", name_am: "ጮጮ ስፔሻል ፋጢራ",   price: 200, featured: true },
        { name_ao: "Saladii Kuduraa",            name_am: "ሰላጣ",             price: 120 },
        { name_ao: "Ispeshalii Choche Shiro",    name_am: "ስፔሻል ጮጮ ሽሮ",     price: 130, featured: true },
        { name_ao: "Paastaa Hanqaaquun",         name_am: "ፓስታ በእንቁላል",      price: 160 },
        { name_ao: "Paastaa Kuduraan",           name_am: "ፓስታ በአትክልት",      price: 130 },
        { name_ao: "Paastaa Sugoon",             name_am: "ፓስታ በሶስ",         price: 130 },
        { name_ao: "Ruuzii Sugoon",              name_am: "ሩዝ በሶስ",           price: 130 },
        { name_ao: "Ruuzii Hanqaaquun",          name_am: "ሩዝ በእንቁላል",        price: 160 },
        { name_ao: "Ruuzii Kuduraan",            name_am: "ሩዝ በአትክልት",        price: 130 },
        { name_ao: "Ruzii Fooniin",              name_am: "ሩዝ በስጋ",           price: 190 },
        { name_ao: "Coomboo Ispeshalii",         name_am: "ስፔሻል ኮምቦ",        price: 320, featured: true },
        { name_ao: "Coomboo Normalii",           name_am: "ኖርማል ኮምቦ",        price: 270 },
        { name_ao: "Shiroo Fasasii",             name_am: "ሽሮ ፈሳሽ",           price: 120 },
        { name_ao: "Tagabinoo",                  name_am: "ተጋቢኖ",             price: 160 },
        { name_ao: "Bozonaa",                    name_am: "ቦዘና",              price: 190 },
        { name_ao: "Cocee Shiroo",               name_am: "ጮጮ ሽሮ",           price: 140 },
        { name_ao: "Cocee Shiroo Ispeshalii",    name_am: "ስፔሻል ጮጮ ሽሮ",     price: 170 },
        { name_ao: "Shiroo Dhadhaatin",          name_am: "ሽሮ በቅቤ",           price: 130 },
        { name_ao: "Kuduraa Waadamaa",           name_am: "የተጠበሰ አትክልት",      price: 120 },
      ],
    },
  ],
};

/* --- Helper: get category by id ------------------------- */
export function getCategoryById(id: string) {
  return RESTAURANT_DATA.categories.find((c) => c.id === id);
}

/* --- Helper: get all items flat -------------------------- */
export function getAllItems() {
  return RESTAURANT_DATA.categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryData: c }))
  );
}

/* --- Helper: get featured items -------------------------- */
export function getFeaturedItems() {
  return getAllItems().filter((item) => item.featured);
}

/* --- Format price ---------------------------------------- */
export function formatPrice(price: number): string {
  return `${price} ETB`;
}
