import "@css/home.css";
import { listTemplates, setupSesClient } from "@api/ses";
import { useEffect, useState } from "preact/hooks";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import TemplateList from "@components/TemplateList";
import NoTemplate from "@components/NoTemplate";
import useTemplateList from "@/hooks/useListTemplate";

const Home = () => {
  const { data, isLoading, isError } = useTemplateList();
  console.log({ data, isLoading, isError });

  return (
    <div className="home-section">
      <div className="template-wrapper">
        {data.length ? <TemplateList templateList={data} /> : <NoTemplate />}
      </div>
    </div>
  );
};

export default Home;
