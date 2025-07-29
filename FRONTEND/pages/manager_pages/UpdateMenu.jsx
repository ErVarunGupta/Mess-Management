import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../components/Layout/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateMenu = () =>{
    const [menu, setMenu] = useState();
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchMenu = async() =>{
            const token = localStorage.getItem('token');

            if(!token){
                handleError('You are not authorized!');
                return;
            }

            try {
                const url = 'http://localhost:8080/root/menu/view';
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `${token}`
                    }
                })

                const data = await response.json();

                const {success, message} = data;

                if(success){
                    setMenu(data.menu || {})
                }else{
                    handleError(message);
                }
            } catch (error) {
                handleError('Something went wrong!')
            }
        }

        fetchMenu();
    },[])
    
    const handleMenuForm = async(formData) =>{
        const category = localStorage.getItem('category');
        const token = localStorage.getItem('token');

        if(category === 'student' || !token){
            handleError('You are not authorized!');
            return;
        }

        const formInputData = Object.fromEntries(formData.entries());
        console.log(formInputData);

        try {
            const url = 'http://localhost:8080/root/menu/update';
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                },
                body: JSON.stringify(menu)
            })

            const data = await response.json();

            const {success, message} = data;

            if(success){
                handleSuccess(message);
            }else{
                handleError(message)
            }

            setTimeout(()=>{
                navigate('/menu/show');
            },1000)
        } catch (error) {
            handleError('Something went wrong!')
        }
    }

    const handleChange = (day, meal) =>(e) =>{
        setMenu((prevMenu) =>({
            ...prevMenu,
            [day]:{
                ...prevMenu[day],
                [meal]: e.target.value
            }
        }));
    };


    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["breakfast", "lunch", "dinner"];


    return (
        <>
            <section className="section-container">
                <h2 className="container-title">Update Menu</h2>

                <div className="items-container container container-wrapper">
                    <form action={handleMenuForm}>
                        {days.map((day) =>(
                            <div key={day}>
                                <h3>{day}</h3>
                                {meals.map((meal) =>(
                                    <div key={meal}>
                                        <label htmlFor={`${day}-${meal}`}>{`${meal.charAt(0).toUpperCase()+meal.slice(1)}:`}</label>
                                        <input
                                            type="text"
                                            id={`${day}-${meal}`}
                                            name={`${day}-${meal}`}
                                            placeholder={`Enter ${meal} items`}
                                            className="form-control"
                                            value={menu?.[day]?.[meal] || ""}
                                            onChange={handleChange(day, meal)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button type="submit" value="send">Submit</button>
                    </form>
                </div>

                <ToastContainer/>
            </section>
        </>
    )
}