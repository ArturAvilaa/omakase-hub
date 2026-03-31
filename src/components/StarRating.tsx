import { useState } from "react";
import { Star } from "lucide-react";
import { useRatings } from "@/contexts/RatingContext";

interface StarRatingProps {
  itemId: string;
}

const StarRating = ({ itemId }: StarRatingProps) => {
  const { getRating, addRating } = useRatings();
  const [hover, setHover] = useState(0);
  const { ratings, average } = getRating(itemId);

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => addRating(itemId, star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0 transition-colors"
          >
            <Star
              className={`h-3.5 w-3.5 ${
                star <= (hover || Math.round(average))
                  ? "fill-accent text-accent"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
      {ratings.length > 0 && (
        <span className="text-[10px] text-muted-foreground font-body">
          {average.toFixed(1)} ({ratings.length})
        </span>
      )}
    </div>
  );
};

export default StarRating;
