function EmptyState() {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-2">
        No Events Found
      </h2>

      <p className="text-gray-500">
        Try changing your search or filter.
      </p>
    </div>
  );
}

export default EmptyState;