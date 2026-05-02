import { useParams, useNavigate } from "react-router-dom";
import { loadBuildsByClass } from "../utils/dataLoader";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";

export default function EventPage() {
  const { classId, category, event } = useParams();
  const nav = useNavigate();
  const [builds, setBuilds] = useState<any[]>([]);

  useEffect(() => {
    loadBuildsByClass(classId || '').then((allBuilds) => {
      const filtered = allBuilds.filter(
        (b) => b.categoryId === category && b.eventId === event
      );
      console.log('Builds for', { classId, category, event }, ':', filtered);
      setBuilds(filtered);
    });
  }, [classId, category, event]);

  return (
    <PageContainer>
      <button
        onClick={() => nav(`/class/${classId}/${category}`)}
        className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-sm"
      >
        ← Back to Events
      </button>
      <h1 className="text-3xl font-bold mb-6">Available Builds</h1>
      {builds.length === 0 ? (
        <p className="text-gray-400">No builds available for this event.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {builds.map((build) => (
            <Card
              key={build.id}
              onClick={() => nav(`/build/${build.id}`)}
            >
              <h3 className="text-xl font-bold mb-2">{build.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{build.description}</p>
              <div className="flex flex-wrap gap-2">
                {build.tags?.map((tag: string) => (
                  <span key={tag} className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
