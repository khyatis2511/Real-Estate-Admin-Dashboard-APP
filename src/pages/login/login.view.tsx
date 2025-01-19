/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC } from 'react';
import { Controller, type Control, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form';
import { LoginSchemaInputs } from '../../utils/schema/login.schema';
import { Link } from 'react-router-dom';

interface LoginViewProps {
  handleSubmit: UseFormHandleSubmit<LoginSchemaInputs>;
  onSubmit: SubmitHandler<LoginSchemaInputs>;
  errors: FieldErrors<LoginSchemaInputs>;
  control: Control<LoginSchemaInputs>;
  submitLoading: boolean;
}

const LoginView: FC<LoginViewProps> = (props) => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    control,
    submitLoading
  } = props;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-8 text-2xl font-semibold text-center text-gray-700">Login to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-600">Email Address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  id="email"
                  {...field}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                />
              )}
            />
            {errors.email && (
              <span className="mt-2 text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-600">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  id="password"
                  type="password"
                  {...field}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                />
              )}
            />
            {errors.password && (
              <span className="mt-2 text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-gray-700">Forgot Password?</Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitLoading}
              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${submitLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-600'}`}
            >
              {submitLoading ? 'Submitting...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don’t have an account? <Link to="/register" className="text-blue-700 hover:text-blue-900">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
