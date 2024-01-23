
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

const ThemeButton = () => {
    return (
        <label className="flex cursor-pointer gap-2">

            <div className="flex items-center justify-center text-xl">
                <FaMoon />
            </div>

            <input type="checkbox" value="light" className="toggle theme-controller"/>

            <div className="flex items-center justify-center text-2xl">
                <FaSun />
            </div>

        </label>
    );
}
 
export default ThemeButton;