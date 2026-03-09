import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(student.email)) {
      alert("Invalid email format");
      return;
    }

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({ name: "", email: "", age: "" });
  };

  return (
    <div className="form-card">

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
        />

        <button type="submit">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>

      </form>

    </div>
  );
}

export default StudentForm;