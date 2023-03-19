import { useRef, useState } from "preact/hooks";
import "./Auth.css";
import { ChangeEvent } from "preact/compat";
import { listTemplates, setupSesClient } from "../../api/ses";
import { route } from "preact-router";

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
        <div className="aws-key-wrapper">
          <label htmlFor="accessKeyId">AWS Access Key Id</label>
          <input type="text" className="aws-key-input" name="accessKeyId" />
        </div>
        <div className="aws-key-wrapper">
          <label htmlFor="secretAccessKey">AWS Secret Access Key</label>
          <input type="text" className="aws-key-input" name="secretAccessKey" />
        </div>
        <div className="save-credential-wrapper">
          <input
            type="checkbox"
            name="save-credential-checkbox"
            className="save-crendential-checkbox"
            defaultChecked
          />
          <label>Save credentials locally</label>
        </div>
        <div className="button-wrapper">
          <button
            type="submit"
            className="primary-button"
            disabled={authText === "Authenticating"}
            style={{ opacity: authText === "Authenticating" ? "0.7" : "" }}
          >
            {authText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
