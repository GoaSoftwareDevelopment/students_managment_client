import { createContext, useContext, useEffect, useState } from "react";


const infoContext = createContext();

const InfoProvider = ({children}) => {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/student/');
            const data = await response.json();
            setStudents(data);
        }
        fetchData();
    }, []);

    const addStudent = async (student) => {
        console.log('Adding student:', student);
        const response = await fetch('http://localhost:3000/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        const data = await response.json();
        setStudents([...students, data]);
    }

    const updateStudent = async (student) => {
        const response = await fetch(`http://localhost:3000/api/student/${student._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        const data = await response.json();
        setStudents(students.map(s => s._id === student._id? data : s));
    }

    const deleteStudent = async (id) => {
        const response = await fetch(`http://localhost:3000/api/student/${id}`, {
            method: 'DELETE',
        });
        setStudents(students.filter(s => s._id!== id));
    }

    return (
        <infoContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
            {children}
        </infoContext.Provider>
    )
}

export default InfoProvider;

export const useInfo = () => useContext(infoContext);