import React from 'react'
import { handleError, handleSuccess } from '../../components/Layout/utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const CreateMenu = ()=> {
  const navigate = useNavigate();

  const handleMenuForm = async (formInput) =>{
     const formInputData = Object.fromEntries(formInput.entries());
     console.log(formInputData);

     try {
       const token = localStorage.getItem('token');
       const category = localStorage.getItem('category');
       if(!token || category !== 'manager'){
         handleError('You are not authorized!');
         return;
       }
       
       const url = `${URL}/root/menu/create`;
       const response = await fetch(url, {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json',
            'Authorization':`${token}`
         },
         body: JSON.stringify(formInputData)
       })

       const data = await response.json();
       const{success, message} = data;
       console.log(message);

       if(success){
        handleSuccess(message);
       }else{
        handleError(message);
       }

       setTimeout(()=>{
            navigate('/menu/show');
        },1000)
     } catch (error) {
        handleError('Something went wrong!');
     }
  }


  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["breadfast", "lunch", "dinner"];
  return (
    <section className='section-container'>
      <h2 className="container-title">Create Menu</h2>

      <div className="items-container container container-wrapper">
          <form action={handleMenuForm}>
            {days.map((day) =>(
              <div>
                <h3>{day}</h3>
                {meals.map((meal) =>(
                  <div>
                    <label htmlFor={`${day}-${meal}`}>{`${meal.charAt(0).toUpperCase() + meal.slice(1)}:`}</label>
                    <input 
                      type="text"
                      placeholder={`Enter ${meal} items`} 
                      name={`${day}-${meal}`}
                      className='form-control'/>
                  </div>
                ))}
              </div>
            ))}

            <button type='submit'>Submit</button>
          </form>
      </div>
      <ToastContainer/>
    </section>
  )
}
