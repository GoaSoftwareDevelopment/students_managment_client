import { useInfo } from "../context/InfoContext";

const StudentForm = () => {
    const { addStudent } = useInfo();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e.target.email.value);

        const student = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            age: parseInt(e.target.age.value),
            email: e.target.email.value,
            speed: parseInt(e.target.speed.value),
            facebook: e.target.facebook.value,
            parentFacebook: e.target.parentFacebook.value,
        };

        addStudent(student);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg flex flex-col gap-6 max-w-lg mx-auto container p-4">
            <h2 className="text-2xl font-bold text-center mb-4">დაამატე მოსწავლე</h2>
            <input
                type="text"
                placeholder="მოსწავლის სახელი"
                name="firstname"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="მოსწავლის გვარი"
                name="lastname"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="number"
                placeholder="მოსწავლის ასაკი"
                name="age"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="მოსწავლის იმეილი"
                name="email"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                name="group"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="10" selected>ჯგუფი 10</option>
                <option value="11">ჯგუფი 11</option>
                <option value="0">ჯგუფი 0</option>
                <option value="58">ჯგუფი 58</option>
                <option value="57">ჯგუფი 57</option>
                <option value="55">ჯგუფი 55</option>
            </select>
            <select
                name="speed"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="1" selected>კვირაში 1_ხელ</option>
                <option value="2">კვირაში 2_ჯერ</option>
                <option value="3">კვირაში 3_ჯერ</option>
                <option value="4">კვირაში 4_ჯერ</option>
            </select>
            <input
                type="url"
                placeholder="მოსწავლის ფბ"
                name="facebook"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="url"
                placeholder="მშობლის ფბ"
                name="parentFacebook"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
                დამატება
            </button>
        </form>
    );
};

export default StudentForm;