import { useParams, useNavigate } from "react-router-dom";
import { subclasses } from "../data/subclasses";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";

export default function ClassPage() {
  const { classId } = useParams();
  const nav = useNavigate();

  const filtered = subclasses.filter(s => s.classId === classId);

  return (
    <PageContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <Card key={s.id} onClick={() => nav(`/subclass/${s.id}`)}>
            {s.name}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}