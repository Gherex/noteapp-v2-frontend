import { useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { FaRegListAlt } from "react-icons/fa";
import { RiArchiveDrawerLine } from "react-icons/ri";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1>Note App</h1>
      <div className="menu-container">
        <button className="menu-btn" onClick={() => navigate("/create")}>
          <TfiWrite />
          Create a new note
        </button>
        <button className="menu-btn" onClick={() => navigate("/active")}>
          <FaRegListAlt />
          View active notes
        </button>
        <button className="menu-btn" onClick={() => navigate("/archived")}>
          <RiArchiveDrawerLine />
          View archived notes
        </button>
      </div>
    </div>
  );
}

export default Home;
