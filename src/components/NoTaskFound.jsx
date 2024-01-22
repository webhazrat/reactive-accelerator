export default function NoTaskFound() {
  return (
    <tr className="[&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td colSpan={6} style={{ textAlign: "center" }}>
        No Task Found!
      </td>
    </tr>
  );
}
