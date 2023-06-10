import "@css/home.css";
import TemplateList from "@components/TemplateList";
import NoTemplate from "@components/NoTemplate";
import useListTemplate from "@/hooks/useListTemplate";

const Home = () => {
  const { data, isLoading } = useListTemplate();
  // console.log(data.value);
  console.log("rendered");

  return (
    <div className="home-section">
      <div className="template-wrapper">
        {isLoading.value || data.value.length ? (
          <TemplateList isLoading={isLoading} templateList={data} />
        ) : (
          <NoTemplate />
        )}
      </div>
    </div>
  );
};

export default Home;
