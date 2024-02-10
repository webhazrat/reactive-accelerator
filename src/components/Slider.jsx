import { useRef, useState } from "react";
import { flushSync } from "react-dom";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const itemsRef = useRef(new Map());

  const scrollToId = (itemId) => {
    flushSync(() => {
      setCurrentIndex(itemId);
    });
    const node = itemsRef.current.get(itemId);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <>
      <h1>Slider</h1>
      <div className="space-x-2">
        <button
          className="px-5 border rounded-md"
          disabled={currentIndex === 1}
          onClick={() => scrollToId(1)}
        >
          First
        </button>
        <button
          className="px-5 border rounded-md"
          disabled={currentIndex === 1}
          onClick={() => scrollToId(currentIndex - 1)}
        >
          Prev
        </button>
        <button
          className="px-5 border rounded-md"
          disabled={currentIndex === catList.length - 1}
          onClick={() => scrollToId(currentIndex + 1)}
        >
          Next
        </button>
        <button
          className="px-5 border rounded-md"
          disabled={currentIndex === catList.length - 1}
          onClick={() => scrollToId(catList.length - 1)}
        >
          Last
        </button>
      </div>
      <div className="w-full overflow-hidden">
        <ul className="inline whitespace-nowrap">
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                if (node) {
                  itemsRef.current.set(cat.id, node);
                } else {
                  itemsRef.current.delete(cat.id);
                }
              }}
              className="inline-block p-2"
            >
              <img src={cat.imageUrl} alt={`Cat #${cat.id}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}
