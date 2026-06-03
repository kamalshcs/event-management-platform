interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search events..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
}

export default SearchBar;