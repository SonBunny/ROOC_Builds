import { useParams, useNavigate } from "react-router-dom";
import { loadBuildTypes, loadBuilds } from "../utils/dataLoader";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";

export default function BuildTypePage() {
  const { classId, category, event } = useParams();
  const nav = useNavigate();
  const [buildTypes, setBuildTypes] = useState<any[]>([]);
  const [builds, setBuilds] = useState<any[]>([]);

  useEffect(() => {
    loadBuildTypes().then((allTypes) => {
      const filtered = allTypes.filter((t) => t.eventId === event);
      console.log('Build types for event', event, ':', filtered);
      setBuildTypes(filtered);
    });
    loadBuilds().then((allBuilds) => {
      const filtered = allBuilds.filter(
        (b) => b.classId === classId && b.categoryId === category && b.eventId === event
      );
      console.log('Builds for', { classId, category, event }, ':', filtered);
      setBuilds(filtered);
    });
  }, [classId, category, event]);

  const getBuildsForType = (typeId: string) => {
    return builds.filter((b) => b.buildTypeId === typeId);
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Select Build Type</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {buildTypes.map((buildType) => {
          const typeBuilds = getBuildsForType(buildType.id);
          return (
            <Card
              key={buildType.id}
              onClick={() => {
                if (typeBuilds.length > 0) {
                  nav(`/build/${typeBuilds[0].id}`);
                }
              }}
            >
              {buildType.name}
              <span className="block text-sm text-gray-400 mt-2">
                {typeBuilds.length} build{typeBuilds.length !== 1 ? 's' : ''}
              </span>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
