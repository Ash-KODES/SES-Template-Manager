import { route } from "preact-router";
import "@css/zeroTemplate.css";
import Button from "./Button";
import noMessageSvg from "@assets/no_messages.svg";

const ZeroTemplate = () => {
  const handleRedirect = () => {
    route("/new");
  };

  return (
    <div className="zero-template-wrapper">
      <div className="create-template-wrapper">
        <div className="create-message-wrapper">
          <h2>It's lonely out here.</h2>
          <p>Make your emails talk. Start by creating your first template!</p>
        </div>
        <Button
          type="button"
          label="Create Template"
          onClick={handleRedirect}
        />
      </div>
      <div className="vector-wrapper">
        <img src={noMessageSvg} alt="noMessageSvg" />
      </div>
    </div>
  );
};

export default ZeroTemplate;
