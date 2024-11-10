import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const repeatClass = {
        input: "border p-3 rounded-md border-gray-300 focus:border-blue-500",
        label: "font-bold text-gray-700",
    }

    const inputs = [
        {
            name: "email",
            type: "email",
            label: "იმეილი",
            placeholder: "exmaple@gmail.com",
            required: true,
            className: repeatClass.input,
            id: "email"
        }, 
        {
            name: "fullname",
            type: "fullname",
            label: "სრული სახელი",
            placeholder: "ნიკა კეშელავა",
            required: true,
            className: repeatClass.input,
            id: "fullname"
        }, 
        {
            name: "password",
            type: "password",
            label: "პაროლი",
            placeholder: "pass1234",
            required: true,
            className: repeatClass.input,
            id: "password"
        }
    ]

    const register = async (data) => {
        try {
            // Fetch API call to register user
            const response = await fetch('http://localhost:3000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log(response);

            if(response.ok) {
                navigate('/verify/' + encodeURIComponent(data.email)); 
            }

        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, fullname } = e.target;

        const data = {
            email: email.value,
            password: password.value,
            fullname: fullname.value,
        };
        
        await register(data);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="inline-flex flex-col gap-8 sm:w-96 w-60 p-8  bg-white rounded-md shadow-xl">
            <div className="flex flex-col gap-5">
                {inputs.map((input) => {
                    return (
                        <div key={input.name} className="flex flex-col gap-3">
                            <label htmlFor={input.name} className={repeatClass.label}>{input.label}</label>
                            <input type={input.type} name={input.name} id={input.name} className={input.className + " focus:outline-none"} placeholder={input.placeholder} required />
                        </div>
                    )
                })}
            </div>
            
            <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md">ავტორიზაცია</button>

            <hr />
        </form>
    );
};

export default Register;