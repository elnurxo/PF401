const AddStudent = ({newStudent, setNewStudent, students, setStudents}) => {

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          newStudent.fullName.trim() == "" ||
          newStudent.age.trim() == "" ||
          newStudent.grade.trim() == ""
        ) {
          window.alert("inputs cannot be empty!");
        } else {
          const newData = { ...newStudent };
          newData.createdAt = Date.now();
          setStudents([...students, newData]);
          setNewStudent({ fullName: "", age: "", grade: "" });
        }
      }}
    >
      <input
        value={newStudent.fullName}
        onChange={(e) => {
          setNewStudent({ ...newStudent, fullName: e.target.value });
        }}
        type="text"
        placeholder="student full name"
      />
      <input
        value={newStudent.age}
        onChange={(e) => {
          setNewStudent({ ...newStudent, age: e.target.value });
        }}
        type="number"
        min={0}
        placeholder="student age"
      />
      <input
        value={newStudent.grade}
        onChange={(e) => {
          setNewStudent({ ...newStudent, grade: e.target.value });
        }}
        type="number"
        min={0}
        max={100}
        placeholder="student grade"
      />
      <button type="submit">add</button>
    </form>
  );
};

export default AddStudent;
