import * as Yup from "yup";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const { login: loginToContext } = useAuth();
  const { setLoading } = useUI();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginToContext(data.token, data.user);
    },
    onError: (error) => {
      const message = error?.response?.data || "Login failed.";
      setTimeout(() => {
        toast.error(message);
        setLoading(false);
      }, 1500);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    mutation.mutate(values);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
      <BaseForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#009c85] text-white rounded-md hover:bg-[#007e6d] transition cursor-pointer"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </BaseForm>
    </div>
  );
}
