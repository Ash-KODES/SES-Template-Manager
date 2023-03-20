import { useRef, useState } from "preact/hooks";
import "@css/Auth.css";
import { ChangeEvent } from "preact/compat";
import { listTemplates, setupSesClient } from "../../api/ses";
import { route } from "preact-router";
import Button from "@components/Button";
import Input from "@components/Input";

const Auth = () => {
  const [authText, setAuthText] = useState("Authenticate");
  const formRef = useRef<HTMLFormElement>(null);

  const handleAuth = async (e: ChangeEvent) => {
    e.preventDefault();
    try {
      setAuthText("Authenticating");
      if (formRef.current) {
        const data = new FormData(formRef.current);
        const checkbox = data.get("save-credential-checkbox");
        const accessKeyId = data.get("accessKeyId") as string;
        const secretAccessKey = data.get("secretAccessKey") as string;
        setupSesClient({ accessKeyId, secretAccessKey });
        await listTemplates();
        if (checkbox) {
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
        <label htmlFor="access-key">AWS Access Key Id</label>
        <Input
          type="text"
          className="aws-key-input"
          inputName="accessKeyId"
          id="access-key"
          required
        />

        <label htmlFor="secret-access">AWS Secret Access Key</label>
        <Input
          type="text"
          className="aws-key-input"
          inputName="secretAccessKey"
          id="secret-access"
          required
        />

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
            type={"submit"}
            className={"primary-button"}
            isDisabled={authText === "Authenticating"}
            value={authText}
            opacity={authText === "Authenticating" ? "0.7" : ""}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
