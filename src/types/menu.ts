/* --- Menu Item ------------------------------------------ */
export interface MenuItem {
  /** Afaan Oromoo name */
  name_ao: string;
  /** Amharic name */
  name_am: string;
  /** Price in Ethiopian Birr */
  price: number;
  /** Optional: path to dish image */
  image?: string;
  /** Optional: AR model URL (MyWebAR / ARCode) */
  arUrl?: string;
  /** Optional: short description */
  description?: string;
  /** Is item featured/popular? */
  featured?: boolean;
}

/* --- Category IDs ---------------------------------------- */
export type CategoryId =
  | "fastfood"
  | "cold"
  | "hot"
  | "juice"
  | "breakfast"
  | "main";

/* --- Menu Category --------------------------------------- */
export interface MenuCategory {
  /** Display name (bilingual) */
  category: string;
  /** Unique slug for filtering */
  id: CategoryId;
  /** Icon identifier */
  icon: string;
  /** Tailwind color class for accent */
  color: string;
  /** Hex value for dynamic styling */
  colorHex: string;
  /** All items in this category */
  items: MenuItem[];
}

/* --- Full Menu ------------------------------------------- */
export interface RestaurantMenu {
  restaurant: string;
  restaurantAm: string;
  phone: string;
  tagline: string;
  categories: MenuCategory[];
}

/* --- Filter State ---------------------------------------- */
export type FilterState = CategoryId | "all";

/* --- Modal State ----------------------------------------- */
export interface ModalState {
  isOpen: boolean;
  item: MenuItem | null;
  category: MenuCategory | null;
}
