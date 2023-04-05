import "@css/home.css";
import TemplateList from "@components/TemplateList";
import NoTemplate from "@components/NoTemplate";
import useListTemplate from "@/hooks/useListTemplate";

const Home = () => {
  const data = useListTemplate();
  console.log(data);

  return (
    <div className="home-section">
      <div className="template-wrapper">
        {data ? <TemplateList templateList={data} /> : <NoTemplate />}
      </div>
    </div>
  );
};

export default Home;
