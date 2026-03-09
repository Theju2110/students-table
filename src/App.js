import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load students from localStorage
  useEffect(() => {

    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }

    setLoading(false);

  }, []);

  // Save students to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add student
  const addStudent = (student) => {

    student.id = Date.now();

    setStudents([...students, student]);

  };

  // Update student
  const updateStudent = (updatedStudent) => {

    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );

    setEditingStudent(null);

  };

  // Delete student
  const deleteStudent = (id) => {

    if (window.confirm("Are you sure you want to delete?")) {

      setStudents(students.filter((s) => s.id !== id));

    }

  };

  // Sort students
  const sortStudents = () => {

    const sorted = [...students].sort((a, b) => {

      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }

    });

    setStudents(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  };

  // Search filter
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="container">

    <div className="header">
      <h1>Students Dashboard</h1>
      <p>Total Students: {students.length}</p>
    </div>

    {/* Search + Sort Controls */}
    <div className="controls">

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={sortStudents}>
        Sort by Name
      </button>

    </div>

    {/* Student Form Card */}
    <div className="card">
      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />
    </div>

    {/* Student Table Card */}
    <div className="card">

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentTable
          students={filteredStudents}
          deleteStudent={deleteStudent}
          setEditingStudent={setEditingStudent}
        />
      )}

    </div>

  </div>
);}

export default App;