import loadDataFromStorage from "@/utils/loadDataFromStorage";

jest.spyOn(console, "error").mockImplementation(() => {});

describe("loadDataFromStorage", () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    jest.clearAllMocks();
  });

  it("returns parsed data when valid JSON exists in localStorage", () => {
    const key = "favorites";
    const mockData = ["item1", "item2"];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));

    const result = loadDataFromStorage(key);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(mockData);
  });

  it("returns an empty array when localStorage has no data for the key", () => {
    const key = "emptyKey";
    localStorageMock.getItem.mockReturnValueOnce(null);

    const result = loadDataFromStorage(key);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual([]);
  });

  it("returns an empty array and logs an error when JSON parsing fails", () => {
    const key = "corruptKey";
    localStorageMock.getItem.mockReturnValueOnce("not-valid-json");

    const result = loadDataFromStorage(key);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(console.error).toHaveBeenCalledWith(
      "Failed to load data from localStorage:",
      expect.any(SyntaxError)
    );
    expect(result).toEqual([]);
  });

  it("returns an empty array and logs an error when localStorage throws an error", () => {
    const key = "errorKey";
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error("Storage failure");
    });

    const result = loadDataFromStorage(key);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(console.error).toHaveBeenCalledWith(
      "Failed to load data from localStorage:",
      expect.any(Error)
    );
    expect(result).toEqual([]);
  });
});
