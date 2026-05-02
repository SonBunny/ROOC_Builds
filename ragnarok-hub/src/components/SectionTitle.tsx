export default function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
      {title}
    </h1>
  );
}