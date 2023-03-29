import { Link } from "preact-router";
import "@css/noTemplate.css";
import noMessageSvg from "@assets/no_messages.svg";

const NoTemplate = () => {
  return (
    <div className="no-template-wrapper">
      <div className="create-template-wrapper">
        <div className="create-message-wrapper">
          <h2>It's lonely out here.</h2>
          <p>Make your emails talk. Start by creating your first template!</p>
        </div>
        <Link href={"/new"}>Create Template</Link>
      </div>
      <div className="vector-wrapper">
        <img src={noMessageSvg} alt="noMessageSvg" />
      </div>
    </div>
  );
};

export default NoTemplate;
