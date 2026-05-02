import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";

export default function SubclassPage() {
  const { id } = useParams();
  const nav = useNavigate();

  return (
    <PageContainer>
      <div className="grid grid-cols-2 gap-6">
        <Card onClick={() => nav(`/mode/${id}/pvp`)}>PvP</Card>
        <Card onClick={() => nav(`/mode/${id}/pve`)}>PvE</Card>
      </div>
    </PageContainer>
  );
}