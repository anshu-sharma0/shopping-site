export const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    const stars = [];
  
    const starPath =
      "M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z";
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-3 h-3 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
          stroke="gray"
          strokeWidth="0.5"
        >
          <path d={starPath} />
        </svg>
      );
    }
  
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-3 h-3 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
          stroke="gray"
          strokeWidth="0.5"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d={starPath} />
        </svg>
      );
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-3 h-3 text-white fill-current"
          viewBox="0 0 20 20"
          stroke="gray"
          strokeWidth="0.5"
        >
          <path d={starPath} />
        </svg>
      );
    }
  
    return <div className="flex items-center gap-1">{stars}</div>;
  };
  