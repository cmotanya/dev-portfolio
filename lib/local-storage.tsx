import { SUBMISSION_STORAGE_KEY } from "./types";

export const getLocalStorageData = () => {
  const submissionData = localStorage.getItem(SUBMISSION_STORAGE_KEY);

  if (!submissionData) {
    return { count: 0, date: null };
  }
  try {
    const { count, date } = JSON.parse(submissionData);
    // Validate retrieved data structure and types
    if (typeof count === "number" && typeof date === "string") {
      return { count, date: new Date(date) };
    }
    // Data is corrupt, remove it
    console.error("Invalid data structure in localStorage");
    return { count: 0, date: null };
  } catch (error) {
    // Handle parsing errors
    console.error("Error parsing localStorage data:", error);
    localStorage.removeItem(SUBMISSION_STORAGE_KEY);
    return { count: 0, date: null };
  }
};

// Helper function to update localStorage data
export const updateLocalStorage = (count: number) => {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(
    SUBMISSION_STORAGE_KEY,
    JSON.stringify({ count, date: today }),
  );
};
