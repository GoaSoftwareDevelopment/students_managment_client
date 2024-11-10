import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
    const navigate = useNavigate();
    const { email } = useParams();

    const repeatClass = {
        input: "border p-3 rounded-md border-gray-300 focus:border-blue-500",
        label: "font-bold text-gray-700",
    }

    const inputs = [
        {
            name: "verificationCode",
            type: "text",
            label: "დამადასტურებელი კოდი",
            placeholder: "3424",
            required: true,
            className: repeatClass.input,
            id: "verificationCode"
        }
    ]

    const verify = async (data) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/verify/${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const info = await res.json();
            console.log(info)
            

            if(res.ok) {
                navigate('/login');
            }

        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { verificationCode } = e.target;
        const data = {
            verificationCode: verificationCode.value,
        };
        await verify(data);
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
            
            <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md">დადასტურება</button>

            <hr />
        </form>
    );
};

export default Verify;
