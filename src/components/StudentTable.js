import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students, deleteStudent, setEditingStudent }) {
const exportExcel = () => {

  const data = students.map((s) => ({
    "Student Name": s.name,
    "Email Address": s.email,
    "Age": s.age
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(file, "students.xlsx");

};
 return (
  <div className="table-container">

    <div className="table-header">
      <h2>Students List</h2>
      <button className="export-btn" onClick={exportExcel}>
        Export Excel
      </button>
    </div>

    <table className="student-table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="4">No students found</td>
          </tr>
        ) : (
          students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditingStudent(s)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>

    </table>

  </div>
);
}

export default StudentTable;