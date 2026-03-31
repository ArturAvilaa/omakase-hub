import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface RatingData {
  totalRatings: number;
  average: number;
  userRating: number | null;
}

interface RatingContextType {
  getRating: (itemId: string) => RatingData;
  addRating: (itemId: string, rating: number) => Promise<void>;
  loading: boolean;
}

const RatingContext = createContext<RatingContextType | null>(null);

export const useRatings = () => {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRatings must be inside RatingProvider");
  return ctx;
};

interface RatingRow {
  item_id: string;
  user_id: string;
  rating: number;
}

export const RatingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [allRatings, setAllRatings] = useState<RatingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = useCallback(async () => {
    const { data } = await supabase
      .from("ratings")
      .select("item_id, user_id, rating");
    if (data) setAllRatings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const getRating = useCallback(
    (itemId: string): RatingData => {
      const itemRatings = allRatings.filter((r) => r.item_id === itemId);
      const totalRatings = itemRatings.length;
      const average =
        totalRatings > 0
          ? itemRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : 0;
      const userRating = user
        ? itemRatings.find((r) => r.user_id === user.id)?.rating ?? null
        : null;
      return { totalRatings, average, userRating };
    },
    [allRatings, user]
  );

  const addRating = useCallback(
    async (itemId: string, rating: number) => {
      if (!user) return;

      const { error } = await supabase.from("ratings").upsert(
        {
          item_id: itemId,
          user_id: user.id,
          rating,
        },
        { onConflict: "item_id,user_id" }
      );

      if (!error) {
        setAllRatings((prev) => {
          const filtered = prev.filter(
            (r) => !(r.item_id === itemId && r.user_id === user.id)
          );
          return [...filtered, { item_id: itemId, user_id: user.id, rating }];
        });
      }
    },
    [user]
  );

  return (
    <RatingContext.Provider value={{ getRating, addRating, loading }}>
      {children}
    </RatingContext.Provider>
  );
};
