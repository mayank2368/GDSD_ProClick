export const CONSTANTS = {
  ROLES: { BUYER: "BUYER", SELLER: "SELLER", ADMIN: "admin" },
  APPROVED: "approved",
  PENDING: "pending",
};
export const PRODUCT_CATEGORY = {
  Animals: ["Pets", "Wild", "Exotic", "Other"],
  Birds: ["Domestic", "Wild", "Other"],
  Nature: ["Mountains", "Sea", "Desert", "Clouds", "Forests", "Other"],
  Portraits: [
    "Candid",
    "Lifestyle",
    "Conceptual",
    "Environmental",
    "Headshot",
    "Other",
  ],
  Instruments: [
    "Guitar",
    "Keyboard",
    "Bowed Strings",
    "Brass",
    "Piano",
    "Other",
  ],
  Sports: [
    "Football",
    "Basketball",
    "Ice Hockey",
    "Ice Skating",
    "Swimming",
    "Other",
  ],
};

export const localUserStorageHelper = {
  load(key = "user") {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : JSON.parse(stored);
  },
  store(key = "user", value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key = "user") {
    localStorage.removeItem(key);
  },
};

export function renderDashboards(userRole) {
  switch (userRole) {
    case CONSTANTS.ROLES.SELLER:
      return "/sellerdashboard";
    case CONSTANTS.ROLES.BUYER:
      return "/buyerdashboard";
    case CONSTANTS.ROLES.ADMIN:
      return "/admindashboard";
    default:
      return "/signin";
  }
}
