import { useParams, useNavigate } from "react-router-dom";
import { loadEvents } from "../utils/dataLoader";
import Card from "../components/Card";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const { classId, category } = useParams();
  const nav = useNavigate();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadEvents().then((allEvents) => {
      const filtered = allEvents.filter((e) => e.categoryId === category);
      setEvents(filtered);
    });
  }, [category]);

  return (
    <PageContainer>
      <button
        onClick={() => nav(`/class/${classId}`)}
        className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-sm"
      >
        ← Back to Class
      </button>
      <h1 className="text-3xl font-bold mb-6">Select Event</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            onClick={() => nav(`/class/${classId}/${category}/${event.id}`)}
          >
            {event.name}
            {event.hasSeasons && <span className="block text-sm text-gray-400 mt-2">Has Seasons</span>}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
