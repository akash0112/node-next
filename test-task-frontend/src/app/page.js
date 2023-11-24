"use client"
import { login } from '@/store/actions/authActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const Home = () => {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors }, reset } = useForm(); // Destructure formState from useForm
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(login(data));
      setIsLoading(false);
      router.push('/employee')
      toast.success('Successfully Logged In');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
    reset()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors && errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors && errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
