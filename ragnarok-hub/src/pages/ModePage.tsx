import { useParams, useNavigate } from "react-router-dom";
import { modes } from "../data/modes";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";

export default function ModePage() {
  const { id, category } = useParams();
  const nav = useNavigate();

  const filtered = modes.filter(m => m.categoryId === category);

  return (
    <PageContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <Card
            key={m.id}
            onClick={() => nav(`/builds/${id}/${category}/${m.id}`)}
          >
            {m.name}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}