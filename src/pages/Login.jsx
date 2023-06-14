import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  const isLoggedIn = localStorage.getItem("loggedin");
  if (isLoggedIn) {
    const response = redirect("/host");
    response.body = true;
    return response;
  }
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {message && <h3 className="red">{message}</h3>}
      <Form replace method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
        <div className="testing">
          <h3 className="helping-info">
            For testing purposes, try these credentials:
          </h3>
          <p>
            Email: <span>user@com</span>
          </p>
          <p>
            Password: <span>pass123</span>
          </p>
          {/* <span>Email: user@com</span><span>Password: pass123</span></h3> */}
        </div>
      </Form>
    </div>
  );
}
