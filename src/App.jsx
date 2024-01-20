import { useState } from "react";
import "./App.css";
import Place from "./components/Place";
import { initialTravelPlan } from "./constants";

function App() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const childIds = root.childIds;

  const handleComplete = (parentId, childId) => {
    const parent = plan[parentId];

    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    };

    setPlan({
      ...plan,
      [parentId]: nextParent,
    });
  };

  return (
    <>
      <h1>Avoid deeply nested state</h1>
      <hr />
      <h1>Places to visit</h1>
      <ol>
        {childIds.map((id) => (
          <Place
            key={id}
            id={id}
            parentId={0}
            plan={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

export default App;
