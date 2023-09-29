import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import InputField from '../components/InputAuthField'
import { useLoginMutation } from '../services/api';
import { setAuthenticated } from '../redux/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginUser, { isLoading, isError, data, error, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated({
        isLoggedIn: true,
        token: data.data.token
      }));
      navigate('/');
    }
  }, [isLoading]);


  const onSubmit = (data) => {
    loginUser(data);
  };
  return (
    <div className='lg:max-w-md min-h-screen flex flex-col justify-center m-auto'>

      <form method='post' action='' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-8">
          {isError && (
            <div className='relative w-full'>
              <div className='px-4 py-2 rounded border border-red-300'>
                <span className='text-sm text-red-400'>{error.data.message}</span>
              </div>
            </div>
          )}
          <InputField
            type="text"
            name="username"
            label="Username"
            icon='mdi:user'
            errors={errors}
            register={register}
            validationSchema={{
              required: "username harus diisi",
            }}
          />
          <InputField
            type="password"
            name="password"
            label="Password"
            icon='material-symbols:password'
            errors={errors}
            register={register}
            validationSchema={{
              required: "password harus diisi",
            }}
          />
          <div className='mt-4'>
            <button type='submit' className="w-full rounded text-white font-semibold px-5 py-2 bg-slate-400">Masuk Sekarang</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
