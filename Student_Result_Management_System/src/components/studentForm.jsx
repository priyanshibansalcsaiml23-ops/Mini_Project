
import React, { useState } from "react";

function StudentForm({ mode, initialStudent, onCancel, onSubmit }) {
  const [name, setName] = useState(initialStudent?.name || "");
  const [section, setSection] = useState(initialStudent?.section || "");
  const [marks, setMarks] = useState(initialStudent?.marks || "");
  const [grade, setGrade] = useState(initialStudent?.grade || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !section || !marks || !grade) {
      alert("Fill all fields.");
      return;
    }

    const studentData = {
      // for edit we keep the same id via initialStudent in App
      name,
      section,
      marks: Number(marks),
      grade,
    };

    onSubmit(studentData);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{mode === "edit" ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block" }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block" }}>
            Section:
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block" }}>
            Marks:
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block" }}>
            Grade:
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        <button type="submit" style={{ marginRight: "0.5rem" }}>
          {mode === "edit" ? "Save Changes" : "Add Student"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StudentForm;