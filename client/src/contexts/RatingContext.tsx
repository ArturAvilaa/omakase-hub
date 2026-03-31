import { createContext, useContext, useState, ReactNode } from "react";

interface RatingData {
  ratings: number[];
  average: number;
}

interface RatingContextType {
  getRating: (itemId: string) => RatingData;
  addRating: (itemId: string, rating: number) => void;
}

const RatingContext = createContext<RatingContextType | null>(null);

export const useRatings = () => {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRatings must be inside RatingProvider");
  return ctx;
};

export const RatingProvider = ({ children }: { children: ReactNode }) => {
  const [ratingsMap, setRatingsMap] = useState<Record<string, number[]>>({});

  const getRating = (itemId: string): RatingData => {
    const ratings = ratingsMap[itemId] || [];
    const average = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    return { ratings, average };
  };

  const addRating = (itemId: string, rating: number) => {
    setRatingsMap((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), rating],
    }));
  };

  return (
    <RatingContext.Provider value={{ getRating, addRating }}>
      {children}
    </RatingContext.Provider>
  );
};
