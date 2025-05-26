import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button className="menu-btn" onClick={() => navigate("/")}>
      <TiArrowBackOutline /> Back to Home
    </button>
  );
}
