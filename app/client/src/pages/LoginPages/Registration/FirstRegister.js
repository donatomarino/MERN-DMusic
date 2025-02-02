import { useState, useContext } from "react";
import Label from "../../../components/GeneralComponents/Label";
import Input from "../../../components/GeneralComponents/Input";
import Button from "../../../components/LoginComponents/Button";
import { useNavigation } from "../../../utils/hooks/useNavigation";
import { RegisterContext } from "../../../utils/contexto/RegisterContext";
import { MessageContext } from "../../../utils/contexto/MessageContext";
import { DataContext } from "../../../utils/contexto/DataContext";
import "../../../styles/login/login.css";

export const FirstRegister = () => {
    const navigate = useNavigation();
    const { datos, toggleDatos } = useContext(DataContext);
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistred, setIsRegistred] = useState(false);
    const { toggleMessage } = useContext(MessageContext);
    const { page, nextPage } = useContext(RegisterContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (datos.password !== confirmPass) {
            toggleMessage('Las contraseñas no coinciden');
            return;
        } else {
            nextPage(1);
            toggleMessage('');
        }
    }

    return (
        <form onSubmit={handleSubmit} method='POST'>
            <div className='Login__HeaderContainer'>
                <h1 className='Login__HeaderContainer--Title'>DMusic</h1>
                <h2 id='Login_HeaderContainer--Description'>Únete ahora y disfruta de todo el contenido</h2>
            </div>

            <div className='Login__InputContainer--Register'>

                <div className='Login__FieldContainer'>
                    <Label htmlFor={'full_name'}>Nombre completo</Label>

                    <Input
                        type={'text'}
                        id={'full_name'}
                        placeholder={'Introduce tu nombre completo'}
                        value={datos.full_name}
                        onChange={(e) => toggleDatos({ ...datos, full_name: e.target.value })}
                        required
                    />
                </div>

                <div className='Login__FieldContainer'>
                    <Label htmlFor={'password'}>Contraseña</Label>

                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id={'password'}
                        placeholder={'Introduce tu contraseña'}
                        value={datos.password}
                        onChange={(e) => toggleDatos({ ...datos, password: e.target.value })}
                        required
                    />

                    <Button
                        onClick={() => setShowPassword(!showPassword)}
                        className="Login__Button--togglePasswordVisibility--Register"
                    >
                        <img src={showPassword ? '/images/ojo.png' : '/images/ojo2.png'} className="Login__InputContainer--icon" alt="Toggle visibility" />
                    </Button>
                </div>

                <div className='Login__FieldContainer'>
                    <Label htmlFor={'confirm-password'}>Confirma contraseña</Label>

                    <Input
                        type={'password'}
                        id={'confirm-password'}
                        placeholder={'Introduce tu contraseña'}
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Button type='submit' className='Login__Button--Submit'>Siguiente</Button>
                </div>
            </div>
        </form>
    )
}