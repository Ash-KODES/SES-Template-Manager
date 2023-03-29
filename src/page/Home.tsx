import "@css/home.css";
import { listTemplates, setupSesClient } from "@api/ses";
import { useEffect, useState } from "preact/hooks";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import TemplateList from "@components/TemplateList";
import NoTemplate from "@components/NoTemplate";

const Home = () => {
  const localData = JSON.parse(localStorage.getItem("auth") as string);

  const [templateList, setTemplateList] = useState<EmailTemplateMetadata[]>([]);

  const getTemplateList = async () => {
    if (localData !== null) {
      const { accessKeyId, secretAccessKey } = localData;
      setupSesClient({ accessKeyId, secretAccessKey });
    }
    const response = await listTemplates();
    // console.log(response);
    setTemplateList(response.TemplatesMetadata!);
  };

  useEffect(() => {
    getTemplateList();
  }, []);
  console.log(templateList);
  return (
    <div className="home-section">
      <div className="template-wrapper">
        {templateList.length ? (
          <TemplateList templateList={templateList} />
        ) : (
          <NoTemplate />
        )}
      </div>
    </div>
  );
};

export default Home;
