import { useParams } from "react-router-dom";
import { builds } from "../data/builds";

export default function BuildList() {
  const { subclass, category, mode } = useParams();

  const filtered = builds.filter(
    (b) =>
      b.subclassId === subclass &&
      b.categoryId === category &&
      b.modeId === mode
  );

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {filtered.map((b) => (
        <a
          key={b.id}
          href={`/build/${b.id}`}
          className="p-4 bg-zinc-900 rounded-xl"
        >
          {b.title}
        </a>
      ))}
    </div>
  );
}