import { useRef, useState } from "preact/hooks";
import "@css/auth.css";
import { ChangeEvent } from "preact/compat";
import { listTemplates, setupSesClient } from "@api/ses";
import { route } from "preact-router";
import Button from "@components/Button";
import Input from "@components/Input";
import { AuthSchema } from "@/schema/forms-schema";
import CheckBoxInput from "@components/CheckBoxInput";
import ls from "localstorage-slim";

const Auth = () => {
  const [authText, setAuthText] = useState("Authenticate");
  const formRef = useRef<HTMLFormElement>(null);

  const handleAuth = async (e: ChangeEvent) => {
    e.preventDefault();
    try {
      setAuthText("Authenticating");
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        // you will have all the values here
        const formDataObj = Object.fromEntries(formData.entries());

        const parsedFormVal = AuthSchema.parse(formDataObj);
        const { accessKeyId, secretAccessKey } = parsedFormVal;
        setupSesClient({ accessKeyId, secretAccessKey });

        await listTemplates();
        if (parsedFormVal["save-credential-checkbox"]) {
          ls.set("auth", JSON.stringify({ accessKeyId, secretAccessKey }), {
            ttl: 1000,
          });
        }
        console.log("auth success");
        route("/");
      }
    } catch (error) {
      console.log(error);
      setAuthText("Authenticate");
    }
  };

  return (
    <div className="auth-section">
      <form className="auth-wrapper" onSubmit={handleAuth} ref={formRef}>
        <Input
          label="AWS Access Key Id"
          type="text"
          name="accessKeyId"
          placeholder="Enter access key"
        />
        <Input
          label="AWS Secret Access Key"
          type="password"
          name="secretAccessKey"
          placeholder="Enter secret key"
          autoComplete="on"
        />
        <div className="save-credential-wrapper">
          <CheckBoxInput
            type="checkbox"
            name="save-credential-checkbox"
            defaultChecked
            label="Save credentials locally"
          />
        </div>
        <div className="button-wrapper">
          <Button
            type="submit"
            disabled={authText === "Authenticating"}
            label={authText}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
