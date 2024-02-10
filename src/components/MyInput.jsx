import { forwardRef, useImperativeHandle, useRef } from "react";

const MyInput = function (porps, ref) {
  const ownInutRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      ownInutRef.current.focus();
    },
  }));
  return (
    <input type="text" className="border rounded-md py-2" ref={ownInutRef} />
  );
};

const forwardInput = forwardRef(MyInput);

export default forwardInput;
