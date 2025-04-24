export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-8 bg-emerald-600 animate-[wave_1s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
      `}</style>
    </div>
  );
}
