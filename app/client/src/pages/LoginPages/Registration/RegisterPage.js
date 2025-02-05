import { useContext} from "react";
import { RegisterContext } from "../../../utils/contexto/RegisterContext";
import { FirstRegister } from "./FirstRegister";
import { SecondRegister } from "./SecondRegister";
import "../../../styles/login/login.css";

export const RegisterPage = () => {
    const { page} = useContext(RegisterContext);

    return (
        <div className="Login__Form">
            {page === 0 &&
                (<FirstRegister />)
            }

            {page === 1 &&
                (<SecondRegister />)
            }
        </div>
    )
};