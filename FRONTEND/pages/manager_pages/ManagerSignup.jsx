import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../components/Layout/utils";
import { useNavigate } from "react-router-dom";

export const ManagerSignup = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async(formData) =>{
        const formInputData = Object.fromEntries(formData.entries());
        console.log(formInputData);

        try {
            const url = "http://localhost:8080/root/manager/manager-signup";
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formInputData)
            });

            const data = await response.json();
            const {success, message, token, name} = data;

            if(success){
                localStorage.setItem('token',token);
                localStorage.setItem('name',name);

                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/');
                },1000)
            }else{
                handleError(message);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            handleError('Signup failed, Try again later.');
        }
    }

  return (
    <section className="section-container">
        <h2 className="container-title">Manager Signup</h2>

        <div className="container container-wrapper">
            <form action={handleFormSubmit}>
                <input 
                    type="text" 
                    className="form-control" 
                    required
                    autoComplete="false"
                    placeholder="Enter your name"
                    name="name"
                />
                <input 
                    type="text" 
                    className="form-control" 
                    required
                    autoComplete="false"
                    placeholder="Enter your email"
                    name="email"
                />
                <input 
                    type="text" 
                    className="form-control" 
                    required
                    autoComplete="false"
                    placeholder="Enter your contact number"
                    name="contact"
                />
                <input 
                    type="text" 
                    className="form-control" 
                    required
                    autoComplete="false"
                    placeholder="Enter your institute name"
                    name="institute"
                />
                <input 
                    type="password" 
                    className="form-control" 
                    required
                    autoComplete="false"
                    placeholder="Enter your password"
                    name="password"
                />

                <button type="submit" value="send">Submit</button>
            </form>
        </div>

        <ToastContainer/>
    </section>
  )
}