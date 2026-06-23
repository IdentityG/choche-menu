import type { RestaurantMenu } from "@/types/menu";

/* ─── Image Base URLs (Unsplash — replace with real photos later) ── */
const IMG = {
  // Burgers
  burgerSpecial:    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
  burgerNormal:     "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&q=80",
  burgerCheese:     "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?w=600&h=400&fit=crop&q=80",
  burgerFalafel:    "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&h=400&fit=crop&q=80",
  burgerChicken:    "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=600&h=400&fit=crop&q=80",

  // Pizza
  pizzaSpecial:     "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&q=80",
  pizzaNormal:      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&q=80",
  pizzaTuna:        "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&h=400&fit=crop&q=80",
  pizzaCheese:      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&q=80",
  pizzaBeef:        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop&q=80",
  pizzaChicken:     "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?w=600&h=400&fit=crop&q=80",
  pizzaMargherita:  "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=400&fit=crop&q=80",
  pizzaVeggie:      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=600&h=400&fit=crop&q=80",

  // Wraps & Sandwiches
  wrapSpecial:      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&q=80",
  wrapNormal:       "https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=600&h=400&fit=crop&q=80",
  irtib:            "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
  chips:            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop&q=80",
  sandwichEgg:      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop&q=80",
  sandwichBeef:     "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&h=400&fit=crop&q=80",
  sandwichChicken:  "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=600&h=400&fit=crop&q=80",
  sandwichTuna:     "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=600&h=400&fit=crop&q=80",
  sandwichVeggie:   "https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=400&fit=crop&q=80",

  // Cold Drinks
  softDrink:        "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&h=400&fit=crop&q=80",
  waterSmall:       "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop&q=80",
  waterMedium:      "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600&h=400&fit=crop&q=80",
  waterLarge:       "https://images.unsplash.com/photo-1564419320461-6eb9f6e3c0f1?w=600&h=400&fit=crop&q=80",

  // Hot Drinks
  tea:              "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop&q=80",
  coffee:           "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=400&fit=crop&q=80",
  macchiato:        "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=400&fit=crop&q=80",
  milk:             "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=400&fit=crop&q=80",
  espresso:         "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop&q=80",

  // Juice
  juiceSpecial:     "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=400&fit=crop&q=80",
  juiceEspresso:    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&q=80",
  juiceAvocado:     "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=400&fit=crop&q=80",
  juicePapaya:      "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=400&fit=crop&q=80",
  juiceOlive:       "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop&q=80",
  juiceMango:       "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=400&fit=crop&q=80",
  coldMilk:         "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop&q=80",

  // Breakfast
  chechebsa:        "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop&q=80",
  fatira:           "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop&q=80",
  eggSauce:         "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop&q=80",
  eggFirfir:        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop&q=80",
  eggMeat:          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80",
  firfirNormal:     "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&q=80",
  firfirMeat:       "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&q=80",
  firfirEgg:        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop&q=80",
  firfirVeggie:     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80",
  genfo:            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop&q=80",
  pastaSauce:       "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop&q=80",
  pastaMeat:        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&q=80",
  bayainetu:        "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop&q=80",
  sufFitfit:        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&q=80",

  // Main Dishes
  fatiraSpecial:    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop&q=80",
  salad:            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80",
  shiro:            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&q=80",
  pastaEgg:         "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop&q=80",
  pastaVeggie:      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&q=80",
  riceSauce:        "https://images.unsplash.com/photo-1536304929831-ee1ca9d44726?w=600&h=400&fit=crop&q=80",
  riceEgg:          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&q=80",
  riceVeggie:       "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&h=400&fit=crop&q=80",
  riceMeat:         "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&q=80",
  comboSpecial:     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80",
  comboNormal:      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&q=80",
  shiroLiquid:      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&q=80",
  tegabino:         "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop&q=80",
  bozena:           "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&q=80",
  shiroQibe:        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&q=80",
  veggieStir:       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&q=80",
};

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
        { name_ao: "Bargarii Isipeshalii",   name_am: "ስፔሻል በርገር",       price: 350, image: IMG.burgerSpecial },
        { name_ao: "Bargarii Normalii",      name_am: "ኖርማል በርገር",       price: 280, image: IMG.burgerNormal },
        { name_ao: "Bargarii Chiizii",       name_am: "ቺዝ በርገር",          price: 300, image: IMG.burgerCheese },
        { name_ao: "Bargarii Filafilii",     name_am: "ፍላፍል በርገር",        price: 250, image: IMG.burgerFalafel },
        { name_ao: "Bargarii Chickinii",     name_am: "ቺክን በርገር",         price: 400, image: IMG.burgerChicken, featured: true },
        { name_ao: "Pizzaa Cocee Ispeshali", name_am: "ጮጮ ስፔሻል ፒዛ",      price: 400, image: IMG.pizzaSpecial, featured: true },
        { name_ao: "Pizzaa Normalii",        name_am: "ኖርማል ፒዛ",          price: 350, image: IMG.pizzaNormal },
        { name_ao: "Pizzaa Tuunaa",          name_am: "ቱና ፒዛ",            price: 500, image: IMG.pizzaTuna, featured: true },
        { name_ao: "Pizzaa Chiizii",         name_am: "ቺዝ ፒዛ",            price: 320, image: IMG.pizzaCheese },
        { name_ao: "Pizzaa Beefii",          name_am: "ቢፍ ፒዛ",            price: 400, image: IMG.pizzaBeef },
        { name_ao: "Pizzaa Chickinii",       name_am: "ቺክን ፒዛ",           price: 400, image: IMG.pizzaChicken },
        { name_ao: "Pizzaa Margariitaa",     name_am: "ማርጋሪታ ፒዛ",        price: 450, image: IMG.pizzaMargherita },
        { name_ao: "Pizzaa Kuduraa",         name_am: "አትክልት ፒዛ",         price: 450, image: IMG.pizzaVeggie },
        { name_ao: "Rappii Ispeshalii",      name_am: "ስፔሻል ራፕ",          price: 200, image: IMG.wrapSpecial },
        { name_ao: "Rappii Normalii",        name_am: "ኖርማል ራፕ",          price: 150, image: IMG.wrapNormal },
        { name_ao: "Irxibii Ispeshalii",     name_am: "ስፔሻል እርጥብ",        price: 100, image: IMG.irtib },
        { name_ao: "Irxibii Normalii",       name_am: "ኖርማል እርጥብ",        price: 70,  image: IMG.irtib },
        { name_ao: "Chipsii",                name_am: "ቺፕስ",               price: 70,  image: IMG.chips },
        { name_ao: "Sanduchii Hanqaaquu",    name_am: "እንቁላል ሳንድዊች",      price: 140, image: IMG.sandwichEgg },
        { name_ao: "Sanduchii Beefii",       name_am: "ቢፍ ሳንድዊች",         price: 200, image: IMG.sandwichBeef },
        { name_ao: "Sanduchii Chickinii",    name_am: "ቺክን ሳንድዊች",        price: 270, image: IMG.sandwichChicken },
        { name_ao: "Sanduchii Tunaa",        name_am: "ቱና ሳንድዊች",         price: 250, image: IMG.sandwichTuna },
        { name_ao: "Sanduchii Kuduraa",      name_am: "አትክልት ሳንድዊች",      price: 120, image: IMG.sandwichVeggie },
      ],
    },
    {
      id: "cold",
      category: "Cold Drinks | ቀዝቃዛ መጠጥ",
      icon: "🧊",
      color: "text-category-cold",
      colorHex: "#3BA8C4",
      items: [
        { name_ao: "Lallaafaa",      name_am: "ለስላሳ",       price: 50, image: IMG.softDrink },
        { name_ao: "Bishaan 1/2L",   name_am: "ውሃ 1/2 ሊትር", price: 30, image: IMG.waterSmall },
        { name_ao: "Bishaan 1L",     name_am: "ውሃ 1 ሊትር",   price: 40, image: IMG.waterMedium },
        { name_ao: "Bishaan 2L",     name_am: "ውሃ 2 ሊትር",   price: 50, image: IMG.waterLarge },
      ],
    },
    {
      id: "hot",
      category: "Hot Drinks | ትኩስ መጠጥ",
      icon: "☕",
      color: "text-category-hot",
      colorHex: "#C4703B",
      items: [
        { name_ao: "Shaayii",      name_am: "ሻይ",     price: 20, image: IMG.tea },
        { name_ao: "Buna",         name_am: "ቡና",     price: 30, image: IMG.coffee, featured: true },
        { name_ao: "Maakiyaatoo",  name_am: "ማኪያቶ",  price: 50, image: IMG.macchiato },
        { name_ao: "Aannan",       name_am: "ወተት",    price: 50, image: IMG.milk },
        { name_ao: "Ispirisii",    name_am: "እስፕሬሶ", price: 25, image: IMG.espresso },
      ],
    },
    {
      id: "juice",
      category: "Juice | ጁስ",
      icon: "🥤",
      color: "text-category-juice",
      colorHex: "#5CB85C",
      items: [
        { name_ao: "Jusii Isipeshali",  name_am: "ስፔሻል ጁስ",       price: 130, image: IMG.juiceSpecial, featured: true },
        { name_ao: "Jusii Ispirisii",   name_am: "እስፕሬሶ ጁስ",      price: 100, image: IMG.juiceEspresso },
        { name_ao: "Jusii Avokaadoo",   name_am: "አቮካዶ ጁስ",        price: 120, image: IMG.juiceAvocado },
        { name_ao: "Jusii Paapayyaa",   name_am: "ፓፓያ ጁስ",         price: 120, image: IMG.juicePapaya },
        { name_ao: "Jusii Zaytunaa",    name_am: "ዘይቱና ጁስ",        price: 120, image: IMG.juiceOlive },
        { name_ao: "Jusii Maangoo",     name_am: "ማንጎ ጁስ",         price: 120, image: IMG.juiceMango },
        { name_ao: "Aannan Qabbana'aa", name_am: "የቀዘቀዘ ወተት",      price: 100, image: IMG.coldMilk },
      ],
    },
    {
      id: "breakfast",
      category: "Breakfast | ቁርስ",
      icon: "🍳",
      color: "text-category-breakfast",
      colorHex: "#C4A83B",
      items: [
        { name_ao: "Ispeshal Caccabsaa",  name_am: "ስፔሻል ጨጨብሳ",    price: 170, image: IMG.chechebsa, featured: true },
        { name_ao: "Normal Caccabsaa",    name_am: "ኖርማል ጨጨብሳ",    price: 130, image: IMG.chechebsa },
        { name_ao: "Faxiiraa Ispeshalii", name_am: "ስፔሻል ፋጢራ",     price: 160, image: IMG.fatira },
        { name_ao: "Faxiiraa Normalii",   name_am: "ኖርማል ፋጢራ",     price: 130, image: IMG.fatira },
        { name_ao: "Hanqaaquu Silsii",    name_am: "እንቁላል ስልስ",     price: 140, image: IMG.eggSauce },
        { name_ao: "Hanqaaquu Firfirii",  name_am: "እንቁላል ፍርፍር",    price: 120, image: IMG.eggFirfir },
        { name_ao: "Hanqaaquu Fooniin",   name_am: "እንቁላል በስጋ",     price: 180, image: IMG.eggMeat },
        { name_ao: "Firfirii Normalii",   name_am: "ኖርማል ፍርፍር",     price: 120, image: IMG.firfirNormal },
        { name_ao: "Firfirii Fooniin",    name_am: "ፍርፍር በስጋ",      price: 190, image: IMG.firfirMeat },
        { name_ao: "Firfirii Hanqaaquun", name_am: "ፍርፍር በእንቁላል",   price: 170, image: IMG.firfirEgg },
        { name_ao: "Firfirii Kuduraan",   name_am: "ፍርፍር በአትክልት",   price: 140, image: IMG.firfirVeggie },
        { name_ao: "Marqaa Furnoo",       name_am: "የፋርኖ ገንፎ",      price: 140, image: IMG.genfo },
        { name_ao: "Marqaa Garbuu",       name_am: "የገብስ ገንፎ",      price: 140, image: IMG.genfo },
        { name_ao: "Marqaa Bullaa",       name_am: "የቡላ ገንፎ",       price: 150, image: IMG.genfo },
        { name_ao: "Marqaa Boqqoloo",     name_am: "የበቆሎ ገንፎ",      price: 120, image: IMG.genfo },
        { name_ao: "Paastaa Sugoon",      name_am: "ፓስታ በሶስ",       price: 130, image: IMG.pastaSauce },
        { name_ao: "Paastaa Fooniin",     name_am: "ፓስታ በስጋ",       price: 190, image: IMG.pastaMeat },
        { name_ao: "Ayinatii",            name_am: "በያይነት",          price: 130, image: IMG.bayainetu },
        { name_ao: "Firfirii Sufii",      name_am: "ሱፍ ፍትፍት",       price: 120, image: IMG.sufFitfit },
      ],
    },
    {
      id: "main",
      category: "Main Dishes | ምግብ ዝርዝር",
      icon: "🍽️",
      color: "text-category-main",
      colorHex: "#C43B3B",
      items: [
        { name_ao: "Faxiiraa Choche Ispeshalii", name_am: "ጮጮ ስፔሻል ፋጢራ",   price: 200, image: IMG.fatiraSpecial, featured: true },
        { name_ao: "Saladii Kuduraa",            name_am: "ሰላጣ",             price: 120, image: IMG.salad },
        { name_ao: "Ispeshalii Choche Shiro",    name_am: "ስፔሻል ጮጮ ሽሮ",     price: 130, image: IMG.shiro, featured: true },
        { name_ao: "Paastaa Hanqaaquun",         name_am: "ፓስታ በእንቁላል",      price: 160, image: IMG.pastaEgg },
        { name_ao: "Paastaa Kuduraan",           name_am: "ፓስታ በአትክልት",      price: 130, image: IMG.pastaVeggie },
        { name_ao: "Paastaa Sugoon",             name_am: "ፓስታ በሶስ",         price: 130, image: IMG.pastaSauce },
        { name_ao: "Ruuzii Sugoon",              name_am: "ሩዝ በሶስ",           price: 130, image: IMG.riceSauce },
        { name_ao: "Ruuzii Hanqaaquun",          name_am: "ሩዝ በእንቁላል",        price: 160, image: IMG.riceEgg },
        { name_ao: "Ruuzii Kuduraan",            name_am: "ሩዝ በአትክልት",        price: 130, image: IMG.riceVeggie },
        { name_ao: "Ruzii Fooniin",              name_am: "ሩዝ በስጋ",           price: 190, image: IMG.riceMeat },
        { name_ao: "Coomboo Ispeshalii",         name_am: "ስፔሻል ኮምቦ",        price: 320, image: IMG.comboSpecial, featured: true },
        { name_ao: "Coomboo Normalii",           name_am: "ኖርማል ኮምቦ",        price: 270, image: IMG.comboNormal },
        { name_ao: "Shiroo Fasasii",             name_am: "ሽሮ ፈሳሽ",           price: 120, image: IMG.shiroLiquid },
        { name_ao: "Tagabinoo",                  name_am: "ተጋቢኖ",             price: 160, image: IMG.tegabino },
        { name_ao: "Bozonaa",                    name_am: "ቦዘና",              price: 190, image: IMG.bozena },
        { name_ao: "Cocee Shiroo",               name_am: "ጮጮ ሽሮ",           price: 140, image: IMG.shiro },
        { name_ao: "Cocee Shiroo Ispeshalii",    name_am: "ስፔሻል ጮጮ ሽሮ",     price: 170, image: IMG.shiro },
        { name_ao: "Shiroo Dhadhaatin",          name_am: "ሽሮ በቅቤ",           price: 130, image: IMG.shiroQibe },
        { name_ao: "Kuduraa Waadamaa",           name_am: "የተጠበሰ አትክልት",      price: 120, image: IMG.veggieStir },
      ],
    },
  ],
};

/* ─── Helper: get category by id ───────────────────────── */
export function getCategoryById(id: string) {
  return RESTAURANT_DATA.categories.find((c) => c.id === id);
}

/* ─── Helper: get all items flat ────────────────────────── */
export function getAllItems() {
  return RESTAURANT_DATA.categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryData: c }))
  );
}

/* ─── Helper: get featured items ────────────────────────── */
export function getFeaturedItems() {
  return getAllItems().filter((item) => item.featured);
}

/* ─── Format price ──────────────────────────────────────── */
export function formatPrice(price: number): string {
  return `${price.toLocaleString()} ETB`;
}