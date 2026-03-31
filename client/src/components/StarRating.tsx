import { useState } from "react";
import { Star } from "lucide-react";
import { useRatings } from "@/contexts/RatingContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface StarRatingProps {
  itemId: string;
}

const StarRating = ({ itemId }: StarRatingProps) => {
  const { getRating, addRating } = useRatings();
  const { user } = useAuth();
  const [hover, setHover] = useState(0);
  const { totalRatings, average, userRating } = getRating(itemId);

  const handleRate = async (star: number) => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Entre com Google para avaliar os pratos.",
        variant: "destructive",
      });
      return;
    }
    await addRating(itemId, star);
  };

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0 transition-colors"
            title={user ? `Avaliar ${star} estrela${star > 1 ? "s" : ""}` : "Faça login para avaliar"}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                star <= (hover || userRating || Math.round(average))
                  ? "fill-accent text-accent"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
      {totalRatings > 0 && (
        <span className="text-[10px] text-muted-foreground font-body">
          {average.toFixed(1)} ({totalRatings})
        </span>
      )}
    </div>
  );
};

export default StarRating;
