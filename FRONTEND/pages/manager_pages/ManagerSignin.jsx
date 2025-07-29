import React from 'react'
import { ToastContainer } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../components/Layout/utils';

export const ManagerSignin = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (FormData) =>{
        const formInputData = Object.fromEntries(FormData.entries());
        console.log(formInputData);

        try {
            const url = "http://localhost:8080/root/manager/manager-signin"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formInputData)
            })

            const data = await response.json();
            const {success, message, token, name, category} = data;

            if(success){
                localStorage.setItem('token',token);
                localStorage.setItem('name',name);
                localStorage.setItem('category', category);

                handleSuccess(data.message);
                setTimeout(()=>{
                    navigate('/');
                },1000)
                
            }else{
                handleError(message);
            }
        } catch (error) {
            console.error("Signin Failed! ", error);
            handleError('Login Failed, Try again later.');
        }
    }
  return (
    <section className='section-container'>
        <h2 className='container-title'>Manager Signin</h2>

        <div className="container container-wrapper">
            <form action={handleFormSubmit}>
                <input 
                    type="text" 
                    className="form-control"
                    required
                    placeholder='Enter your mobile number or email'
                    name="identifier"
                 />
                <input 
                    type="password" 
                    className="form-control"
                    required
                    placeholder='Enter your password'
                    name="password"
                 />

                 <button type='submit'>Login</button>
            </form>
        </div>

        <ToastContainer/>
    </section>
  )
}
