import { useParams } from "react-router-dom";
import { builds } from "../data/builds";
import PageContainer from "../components/PageContainer";

export default function BuildDetail() {
  const { buildId } = useParams();

  const build = builds.find(b => b.id === buildId);

  if (!build) return <div>Not found</div>;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold">{build.title}</h1>
      <p className="text-zinc-400">{build.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {build.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl" />
        ))}
      </div>
    </PageContainer>
  );
}