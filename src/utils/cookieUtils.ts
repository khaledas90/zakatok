export const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string) => {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const saveToCookie = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    setCookie(key, serializedData);
  } catch (error) {
    console.error("Error saving to cookie:", error);
    try {
      setCookie(key, String(data));
    } catch (fallbackError) {
      console.error("Fallback save also failed:", fallbackError);
    }
  }
};

export const loadFromCookie = (key: string, defaultValue: any = null) => {
  try {
    const cookieData = getCookie(key);
    if (!cookieData) return defaultValue;

    try {
      return JSON.parse(cookieData);
    } catch (parseError) {
      console.warn(
        "Failed to parse cookie as JSON, returning raw value:",
        parseError
      );
      return cookieData;
    }
  } catch (error) {
    console.error("Error loading from cookie:", error);
    return defaultValue;
  }
};

export const COOKIE_KEYS = {
  FAVORITES: "medlinks_favorites",
  COMPARE: "medlinks_compare",
  CART: "medlinks_cart",
} as const;

export const clearAllAppCookies = () => {
  Object.values(COOKIE_KEYS).forEach((key) => {
    removeCookie(key);
  });
};

export const areCookiesSupported = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "test_cookie_support";
    setCookie(testKey, "test", 1);
    const supported = getCookie(testKey) === "test";
    removeCookie(testKey);
    return supported;
  } catch (error) {
    return false;
  }
};
