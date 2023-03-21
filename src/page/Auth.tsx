import { useRef, useState } from "preact/hooks";
import "@css/auth.css";
import { ChangeEvent } from "preact/compat";
import { listTemplates, setupSesClient } from "../api/ses";
import { route } from "preact-router";
import Button from "@components/Button";
import Input from "@components/Input";
import { AuthSchema } from "@/schema/forms-schema";

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
        console.log("checkbox", formDataObj["save-credential-checkbox"]);
        const parsedFormVal = AuthSchema.parse(formDataObj);
        const { accessKeyId, secretAccessKey } = parsedFormVal;
        setupSesClient({ accessKeyId, secretAccessKey });

        await listTemplates();
        if (parsedFormVal["save-credential-checkbox"]) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ accessKeyId, secretAccessKey })
          );
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
        <div className="aws-key-wrapper">
          <label htmlFor="access-key" className="input-label">
            AWS Access Key Id
          </label>
          <Input
            type="text"
            className="aws-key-input"
            inputName="accessKeyId"
            id="access-key"
            placeholder="Enter access key"
            required
          />
        </div>
        <div className="aws-key-wrapper">
          <label htmlFor="secret-access" className="input-label">
            AWS Secret Access Key
          </label>
          <Input
            type="password"
            className="aws-key-input"
            inputName="secretAccessKey"
            id="secret-access"
            placeholder="Enter secret key"
            required
            autoComplete="on"
          />
        </div>
        <div className="save-credential-wrapper">
          <Input
            type="checkbox"
            inputName="save-credential-checkbox"
            className="save-crendential-checkbox"
            id="crendential-checkbox"
            defaultChecked
          />
          <label htmlFor="crendential-checkbox">Save credentials locally</label>
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
