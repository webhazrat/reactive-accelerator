import { useRef } from "react";
import MyInput from "./MyInput";
import Slider from "./Slider";

export default function RefCallback() {
  const itemsRef = useRef(null);
  const inputRef = useRef(null);
  const list = [1, 2, 3];

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  const handleButton = (item) => {
    const map = getMap();
    const node = map.get(item);
    node.style.backgroundColor = "green";
    node.style.color = "white";
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="max-w-5xl m-auto p-10 mt-10">
      <h1>useRef</h1>
      <hr className="my-4" />
      <div className="space-y-4">
        <div>
          <h2 className="mb-3">Ref Callback</h2>
          <ul className="space-y-2">
            {list.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleButton(item)}
                  className="py-2 px-5 border border-gray-600 rounded-md"
                  ref={(node) => {
                    const map = getMap();
                    if (node) {
                      map.set(item, node);
                    } else {
                      map.delete(item);
                    }
                  }}
                >
                  Item {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3">Accessing ref another component</h2>
          <div>
            <MyInput ref={inputRef} />
            <br />
            <br />
            <button
              onClick={handleFocus}
              className="py-2 px-5 border border-gray-600 rounded-md"
            >
              Focus the input
            </button>
          </div>
        </div>

        <Slider />
      </div>
    </div>
  );
}
