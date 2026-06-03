interface Props {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

function FilterPanel({ category, setCategory }: Props) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="All">All Categories</option>
      <option value="Technology">Technology</option>
      <option value="Music">Music</option>
      <option value="Sports">Sports</option>
    </select>
  );
}

export default FilterPanel;