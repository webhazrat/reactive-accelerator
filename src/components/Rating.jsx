import Star from "../assets/star.svg";
export default function Rating({ rating }) {
  const stars = Array(rating).fill(Star);
  return (
    <div className="flex items-center space-x-1 mb-5">
      {stars.map((star, index) => (
        <img key={index} src={star} width="14" height="14" alt="star" />
      ))}
    </div>
  );
}
