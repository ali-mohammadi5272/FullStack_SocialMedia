import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const FontAwesomeIcon = ({ className, icon }) => {
  return <Icon className={className} icon={icons[icon]} />;
};

export default FontAwesomeIcon;
