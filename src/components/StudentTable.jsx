import { useState } from 'react';
import { useInfo } from '../context/InfoContext';

const StudentTable = () => {
    const { students, deleteStudent, updateStudent } = useInfo();
    const [editing, setEditing] = useState(null);
    const [editedStudents, setEditedStudents] = useState({});
    const speedOptions = ["1", "2", "3", "4"];

    const handleEditClick = (obj) => {
        setEditing(obj._id);
        setEditedStudents({ ...obj });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStudents((prevStudents) => ({ ...prevStudents, [name]: value }));
    };

    const handleSave = () => {
        const { createdAt, updatedAt, ...dataToUpdate } = editedStudents; // Exclude non-editable fields
        updateStudent(dataToUpdate);
        setEditing(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1>მოსწავლეების ცხრილი</h1>
            {students?.length === 0 ? (
                <p className="text-center text-gray-500">No students found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                {Object.keys(students[0]).map((key) => (
                                    <th key={key} className="px-4 py-2 border-b text-left">{key}</th>
                                ))}
                                <th className="px-4 py-2 border-b text-left">Edit</th>
                                <th className="px-4 py-2 border-b text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((obj) => (
                                <tr key={obj._id} className={`hover:bg-gray-100 ${editing === obj._id ? 'bg-yellow-50' : 'bg-white'}`}>
                                    {editing === obj._id ? (
                                        <>
                                            {Object.keys(obj).map((key) => (
                                                key !== '_id' ? (
                                                    <td key={key} className="px-4 py-2 border-b">
                                                        {key === 'createdAt' || key === 'updatedAt' ? (
                                                            <input
                                                                name={key}
                                                                value={editedStudents[key]}
                                                                readOnly
                                                                className="w-full px-2 py-1 border rounded-md bg-gray-100 cursor-not-allowed"
                                                            />
                                                        ) : key === 'speed' ? (
                                                            <select
                                                                name="speed"
                                                                value={editedStudents.speed}
                                                                onChange={handleInputChange}
                                                                className="w-full px-2 py-1 border rounded-md focus:outline-none"
                                                            >
                                                                <option value="" disabled>Select Speed</option>
                                                                {speedOptions.map((speed) => (
                                                                    <option key={speed} value={speed}>{speed}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <input
                                                                name={key}
                                                                value={editedStudents[key]}
                                                                onChange={handleInputChange}
                                                                className="w-full px-2 py-1 border rounded-md focus:outline-none"
                                                            />
                                                        )}
                                                    </td>
                                                ) : (
                                                    <td key={key} className="px-4 py-2 border-b">{obj[key]}</td>
                                                )
                                            ))}
                                            <td className="px-4 py-2 border-b">
                                                <button onClick={handleSave} className="text-blue-500">Save</button>
                                            </td>
                                            <td className="px-4 py-2 border-b">
                                                <button onClick={() => setEditing(null)} className="text-red-500">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            {Object.entries(obj).map(([key, value], index) => {
                                                return (
                                                    (key === 'createdAt' || key === 'updatedAt') ? 
                                                    (
                                                        <td key={index} className="px-4 py-2 border-b">{new Date(value).toDateString()}</td>
                                                    )
                                                    : 
                                                    (
                                                        <td key={index} className="px-4 py-2 border-b">{value}</td>
                                                    )
                                                );
                                            })}

                                            <td className="px-4 py-2 border-b">
                                                <button onClick={() => handleEditClick(obj)} className="text-blue-500">Edit</button>
                                            </td>
                                            <td className="px-4 py-2 border-b">
                                                <button onClick={() => deleteStudent(obj._id)} className="text-red-500">Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentTable;
