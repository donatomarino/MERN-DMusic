import { useState, useContext } from "react";
import Button from "../../../components/LoginComponents/Button";
import { useNavigation } from "../../../utils/hooks/useNavigation";
import { RegisterContext } from "../../../utils/contexto/RegisterContext";
import "../../../styles/login/login.css";
import { FirstRegister } from "./FirstRegister";
import { SecondRegister } from "./SecondRegister";
import { MessageContext } from "../../../utils/contexto/MessageContext";

export const RegisterPage = () => {
    const navigate = useNavigation();
    const [datos, setDatos] = useState({
        full_name: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
    });
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistred, setIsRegistred] = useState(false);
    const {message, toggleMessage} = useContext(MessageContext);
    const { page, nextPage } = useContext(RegisterContext);

    return (
        <div className="Login__Form">
            {page % 2 === 0 ?
                (<FirstRegister />)
                :
                (<SecondRegister />)}

            {isRegistred &&
                <div>
                    <Button type='submit' className='Login__Button--Submit'>Empezamos!</Button>
                </div>}

            {message &&
                <div className='Login__Error-Confirma'>
                    <p className="Login__Error-Confirma">{message}</p>
                </div>
            }
        </div>
    )
};