export default function MobileMenuSection({ title, children }) {
  return (
    <div>
      <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
