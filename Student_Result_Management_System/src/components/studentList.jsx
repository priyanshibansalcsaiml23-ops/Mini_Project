import React from "react";

function StudentList({
  students,
  onLoadStudents,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onViewDetails,
}) {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Student List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button className="btn-success" onClick={onLoadStudents} style={{ marginRight: "0.5rem" }}>
          Load Students
        </button>
        <button className="btn-primary" onClick={onAddStudent}>Add Student</button>
      </div>

      {students.length === 0 ? (
        <p>No students loaded. Click "Load Students".</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.section}</td>
                <td>{s.marks}</td>
                <td>{s.grade}</td>
                <td>
                  <button
                    className="btn-secondary" onClick={() => onViewDetails(s)}
                    style={{ marginRight: "0.25rem" }}
                  >
                    View
                  </button>
                  <button
                    className="btn-primary" onClick={() => onEditStudent(s)}
                    style={{ marginRight: "0.25rem" }}
                  >
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => onDeleteStudent(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;