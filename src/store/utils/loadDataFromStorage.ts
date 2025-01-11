const loadDataFromStorage = (key: string): Record<string, boolean> => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error("Failed to load data from localStorage:", error);
    return {};
  }
};

export default loadDataFromStorage;
