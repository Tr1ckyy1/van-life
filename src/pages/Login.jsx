import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";
import { useLog } from "../Context";

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
  const { dispatch } = useLog();
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {message && <h3 className="red">{message}</h3>}
      <Form replace method="post" className="login-form">
        <input
          value="user@com"
          name="email"
          type="email"
          placeholder="Email address"
        />
        <input
          value="pass123"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={() => dispatch({ type: "logIn" })}
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
