export default function Card({
  children,
  onClick,
  className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 
                 hover:scale-105 transition-all duration-300
                 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:border-blue-500 ${className || ''}`}
    >
      {children}
    </div>
  );
}