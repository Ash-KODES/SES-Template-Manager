import "@css/home.css";
import TemplateList from "@components/TemplateList";
import NoTemplate from "@components/NoTemplate";
import useListTemplate from "@/hooks/useListTemplate";

const Home = () => {
  const { data, isLoading } = useListTemplate();
  // console.log(data.value);
  console.log("rendered");

  if (isLoading.value) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="home-section">
      <div className="template-wrapper">
        {data.value.length ? (
          <TemplateList templateList={data} />
        ) : (
          <NoTemplate />
        )}
      </div>
    </div>
  );
};

export default Home;
