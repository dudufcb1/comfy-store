import { SubmitBtn, FormInput } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { authFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const loginUrl = '/auth/local';
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const resp = await authFetch.post(loginUrl, data);
      store.dispatch(loginUser(resp.data));
      console.log(JSON.stringify(resp, null, 2));

      toast.success('Bienvenido');
      return redirect('/');
    } catch (error) {
      //console.log(error.response.data.msg);
      //Este data viene así de strapi
      toast.error(
        error?.response?.data?.error?.message ||
          'please double check your credentials'
      );
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuest = async () => {
    try {
      // const response = await authFetch.post(loginUrl, {
      //   identifier: 'machikotherabbit@gmail.com',
      //   password: 'm3lomelo',
      // });
      const response = await authFetch.post(loginUrl, {
        identifier: 'test@test.com',
        password: 'secret',
      });
      console.log(response);
      dispatch(loginUser(response.data));
      toast.success('Welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Error try again');
    }
  };
  return (
    <section className="h-screen grid place-items-center capitalize">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 "
      >
        <h4 className="text-center  text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />

        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block capitalize"
          onClick={loginAsGuest}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
