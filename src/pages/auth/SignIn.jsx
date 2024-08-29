import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);

      if (res.status === 200 && res.data?.msg === "success.") {
        const token = res.data.UserInfo?.token;
        if (token) {
          // Store the token in localStorage
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          console.error("Login Failed, Token not received.");
        }
      } else {
        console.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  return (
    <section className="flex flex-col lg:flex-row min-h-screen ">
      <div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center p-4">
            <img
              src="https://sigafair.com/fair/images/siga.png"
              alt="Logo"
              className={`h-12 w-96   `}
            />
          </Link>
        </div>
        <form
          onSubmit={handleSumbit}
          method="POST"
          className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
        >
          <div className="mb-6 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button type="sumbit" disabled={loading} className="mt-6" fullWidth>
            {loading ? "Checking..." : "Sign In"}
          </Button>
        </form>
      </div>
      <div className="w-full lg:w-2/5 h-auto lg:h-full hidden md:block lg:block">
        <img
          src="/img/pattern.png"
          className="h-full max-h-screen w-full object-cover  rounded-none"
          alt="Sign In Background"
        />
      </div>
    </section>
  );
};

export default SignIn;
