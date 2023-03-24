import SearchInput from "@components/SearchInput";
import searchIcon from "@assets/search.svg";
import downloadIcon from "@assets/download.svg";
import removeIcon from "@assets/remove.svg";
import editIcon from "@assets/edit.svg";
import menuIcon from "@assets/menu.svg";
import "@css/templateList.css";
import CheckBoxInput from "@components/CheckBoxInput";
import IconButton from "./IconButton";

const TemplateList = () => {
  return (
    <div className="template-list-wrapper">
      <div className="top-navigation-wrapper">
        <form className="search-form">
          <SearchInput
            type="search"
            className="search-input"
            src={searchIcon}
            alt="searchIcon"
            placeholder="Search for  your templates"
          />
        </form>
        <IconButton
          type="button"
          label="Download"
          src={downloadIcon}
          alt="download"
        />
        <IconButton
          type="button"
          label="Delete"
          src={removeIcon}
          alt="delete"
        />
      </div>
      <div className="template-data-container">
        <table className="tabel">
          <tr>
            <th className="checkbox-data">
              <CheckBoxInput type="checkbox" label="Template Name" />
            </th>
            <th>Creation date</th>
          </tr>

          {Array(5)
            .fill(1)
            .map((val, index) => (
              <tr key={index}>
                <td className="checkbox-data">
                  <CheckBoxInput type="checkbox" label="Email verification" />
                </td>
                <td>06 Feb 2023</td>
                <td className="edit-wrapper">
                  <IconButton
                    type="button"
                    label="Edit"
                    src={editIcon}
                    alt="edit"
                  />
                </td>
                <td className="menue-wrapper">
                  <img src={menuIcon} alt="menue" />
                  <div className="popup-menue"></div>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default TemplateList;
