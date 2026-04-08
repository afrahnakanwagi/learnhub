import { Star } from "lucide-react";

export default function StarRating({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-200"}
        />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
      {reviews && <span className="text-xs text-gray-400">({reviews.toLocaleString()})</span>}
    </div>
  );
}