import { toast } from 'react-toastify';
import { SubmitBtn, FormInput } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { authFetch } from '../utils';

const registerUrl = '/auth/local/register';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const resp = await authFetch.post(registerUrl, data);
    console.log(resp);
    toast.success('Registro exitoso');
    return redirect('/login');
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
const Register = () => {
  return (
    <section className="h-screen grid place-items-center capitalize">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 flex flex-col gap-y-4 shadow-lg"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Register" type="submit" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
