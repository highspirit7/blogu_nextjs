import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggle = ({ onChange }) => (
  <Toggle
    className="day-night-toggle"
    icons={{
      checked: <FontAwesomeIcon inverse icon="sun" />,
      unchecked: <FontAwesomeIcon inverse icon="moon" />,
    }}
    onChange={onChange}
  />
);

export default ThemeToggle;
