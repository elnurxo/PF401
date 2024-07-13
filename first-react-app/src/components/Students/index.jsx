import { useState } from "react";
import AddStudent from "../AddStudent";
import SearchStudent from "../SearchStudent";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    age: "",
    grade: "",
  });

  const filteredStudents = students.filter((stu) =>
    stu.fullName.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <h3>Students List</h3>
      {/* <button onClick={()=>{
        setStudents((currentStudents)=>{
          return [...currentStudents.sort((x,y)=>x.age-y.age)]
        })
      }}>sort by age</button> */}
      <AddStudent
        newStudent={newStudent}
        setStudents={setStudents}
        students={students}
        setNewStudent={setNewStudent}
      />
      <SearchStudent setSearchQuery={setSearchQuery}/>
      <select name="" id="">
        <option value="">age increasing</option>
        <option value="">age decreasing</option>
      </select>
      <ul>
        {filteredStudents &&
          filteredStudents.map((student) => {
            const studentDate = new Date(student.createdAt);
            return (
              <li key={student.createdAt}>
                {student.fullName}, {student.age} | <i>{studentDate.toDateString()}</i> | {student.grade} GPA{" "}
                <button
                  onClick={() => {
                    if (window.confirm("are you sure to delete?")) {
                      setStudents((currentStudents) => {
                        // const idx = currentStudents.findIndex(
                        //   (x) => x.id == student.id
                        // );
                        // currentStudents.splice(idx, 1);
                        const updatedStudents = currentStudents.filter(
                          (x) => x.id != student.id
                        );
                        return [...updatedStudents];
                      });
                    }
                  }}
                >
                  delete
                </button>
              </li>
            );
          })}
      </ul>
      <button
        onClick={() => {
          setStudents([]);
        }}
      >
        clear all
      </button>
    </>
  );
};

export default Students;
