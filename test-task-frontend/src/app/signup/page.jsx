"use client"
import { signupUser } from '@/store/api/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch,reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      toast.success('Signup successful!');
    } catch (error) {
      toast.error('Something went wrong');
    }
    reset()
  };


  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              {...register('username', { required: true })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.username && <p className="text-red-500">Username is required</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500">Password is required</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                validate: (value) => value === password || 'The passwords do not match'
              })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <input
              type="text"
              {...register('location', { required: true })}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.location && <p className="text-red-500">Location is required</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <select {...register('role', { required: true })} className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
