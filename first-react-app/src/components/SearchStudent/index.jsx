const SearchStudent = ({setSearchQuery}) => {
  return (
    <input
      onChange={(e) => {
        setSearchQuery(e.target.value.trim());
      }}
      type="text"
      placeholder="search for student"
    />
  );
};

export default SearchStudent;
