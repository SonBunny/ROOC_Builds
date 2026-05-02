import { useParams, useNavigate } from "react-router-dom";
import { loadClasses, loadCategories } from "../utils/dataLoader";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";

export default function ClassPage() {
  const { classId } = useParams();
  const nav = useNavigate();
  const [classData, setClassData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadClasses().then((classes) => {
      const found = classes.find((c) => c.id === classId);
      setClassData(found);
    });
    loadCategories().then(setCategories);
  }, [classId]);

  if (!classData) return <div>Loading...</div>;

  return (
    <PageContainer>
      <button
        onClick={() => nav('/')}
        className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-sm"
      >
        ← Back to Home
      </button>
      <div className="mb-8">
        <img
          src={classData.image}
          alt={classData.name}
          className="w-48 h-48 mx-auto rounded-xl mb-4"
        />
        <h1 className="text-4xl font-bold text-center mb-2">{classData.name}</h1>
        <p className="text-gray-400 text-center">Select a category to explore builds</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            onClick={() => nav(`/class/${classId}/${category.id}`)}
          >
            {category.name}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}