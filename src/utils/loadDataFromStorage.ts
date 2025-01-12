const loadDataFromStorage = (key: string): string[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Failed to load data from localStorage:", error);
    return [];
  }
};

export default loadDataFromStorage;
