export default function Place({ id, parentId, plan, onComplete }) {
  const place = plan[id];
  const childIds = place.childIds;
  return (
    <>
      <li style={{ padding: "5px 0" }}>
        {place.title}{" "}
        <button onClick={() => onComplete(parentId, id)}>Complete</button>
        {childIds.length > 0 && (
          <ol>
            {childIds.map((childId) => (
              <Place
                key={childId}
                id={childId}
                parentId={id}
                plan={plan}
                onComplete={onComplete}
              />
            ))}
          </ol>
        )}
      </li>
    </>
  );
}
