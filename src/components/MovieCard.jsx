import { getImgUrl } from "../utils";
import Rating from "./Rating";
import Tag from "../assets/tag.svg";
import MovieDetailModal from "./MovieDetailModal";
import { useState } from "react";
import { useCart } from "../context";
import { toast } from "react-toastify";
export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useCart();
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();
    const found = state.cart.find((item) => item.id === movie.id);
    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: movie,
      });
      toast.success(`${movie.title} added to cart successfully.`);
    } else {
      toast.error(`${movie.title} already added to cart.`);
    }
  };

  return (
    <>
      {showModal && (
        <MovieDetailModal
          movie={movie}
          onClose={handleCloseModal}
          onAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={handleOpenModal}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <Rating rating={movie.rating} />
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src={Tag} alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
