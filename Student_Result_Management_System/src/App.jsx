// src/App.jsx
import React, { useState } from "react";
import StudentList from "./components/studentList";
import StudentForm from "./components/studentForm";
import StudentDetails from "./components/studentDetails";
import "./App.css"

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

function App() {
  const [students, setStudents] = useState([]);
  const [mode, setMode] = useState("list"); // 'list' | 'add' | 'edit' | 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleLoadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      alert(err.message || "Error loading students");
    }
  };

  const handleAddStudentClick = () => {
    setSelectedStudent(null);
    setMode("add");
  };

  const handleEditStudentClick = (student) => {
    setSelectedStudent(student);
    setMode("edit");
  };

  const handleViewDetailsClick = (student) => {
    setSelectedStudent(student);
    setMode("details");
  };

  const handleDeleteStudentClick = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this student?");
    if (!ok) return;

    try {
      await deleteStudent(id);
      alert("Student deleted. Click 'Load Students' to refresh the list.");
      // we DO NOT auto-refresh list, as per spec
    } catch (err) {
      alert(err.message || "Error deleting student");
    }
  };

  const handleCancelForm = () => {
    setMode("list");
  };

  const handleSubmitAdd = async (studentData) => {
    try {
      await createStudent(studentData);
      alert("Student added successfully. Click 'Load Students' to see it in the list.");
      setMode("list");
    } catch (err) {
      alert(err.message || "Error adding student");
    }
  };

  const handleSubmitEdit = async (studentData) => {
    if (!selectedStudent) return;

    try {
      await updateStudent(selectedStudent.id, {
        ...selectedStudent,
        ...studentData,
      });
      alert("Student updated. Click 'Load Students' to see updated data.");
      setMode("list");
      setSelectedStudent(null);
    } catch (err) {
      alert(err.message || "Error updating student");
    }
  };

  const handleBackToList = () => {
    setMode("list");
    setSelectedStudent(null);
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: "center" }}>Student Result App</h1>

      {mode === "list" && (
        <StudentList
          students={students}
          onLoadStudents={handleLoadStudents}
          onAddStudent={handleAddStudentClick}
          onEditStudent={handleEditStudentClick}
          onDeleteStudent={handleDeleteStudentClick}
          onViewDetails={handleViewDetailsClick}
        />
      )}

      {mode === "add" && (
        <StudentForm
          mode="add"
          initialStudent={null}
          onCancel={handleCancelForm}
          onSubmit={handleSubmitAdd}
        />
      )}

      {mode === "edit" && (
        <StudentForm
          mode="edit"
          initialStudent={selectedStudent}
          onCancel={handleCancelForm}
          onSubmit={handleSubmitEdit}
        />
      )}

      {mode === "details" && (
        <StudentDetails student={selectedStudent} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default App;
