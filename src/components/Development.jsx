import { useEffect, useRef } from "react";

export default function Development() {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    console.log("Effect");
  });
  return (
    <dialog ref={dialog} className="max-w-5xl p-4 rounded-md">
      Hello
    </dialog>
  );
}
