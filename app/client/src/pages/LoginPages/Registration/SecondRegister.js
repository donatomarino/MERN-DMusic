import { useState, useContext } from "react";
import Label from "../../../components/GeneralComponents/Label";
import Input from "../../../components/GeneralComponents/Input";
import Button from "../../../components/LoginComponents/Button";
import { useNavigation } from "../../../utils/hooks/useNavigation";
import { RegisterContext } from "../../../utils/contexto/RegisterContext";
import Checkbox from "../../../components/LoginComponents/Checkbox";
import { MessageContext } from "../../../utils/contexto/MessageContext";
import { DataContext } from "../../../utils/contexto/DataContext";
import "../../../styles/login/login.css";

export const SecondRegister = () => {
    const navigate = useNavigation();
    const {datos, toggleDatos} = useContext(DataContext);
    const [isRegistred, setIsRegistred] = useState(false);
    const [toggleMessage] = useContext(MessageContext);
    const { page, nextPage } = useContext(RegisterContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const register = {
            "full_name": datos.full_name,
            "email": datos.email,
            "password": datos.password,
            "birthdate": datos.birthdate,
            "gender": datos.gender
        }

        console.log(datos);

        try {
            const response = await fetch('http://localhost:5001/dmusic/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(register)
            })

            if (response.ok) {
                toggleMessage("Usuario registrado correctamente.")
                setIsRegistred(!isRegistred)
                nextPage(2)
            } else {
                toggleMessage("El correo electrónico ya está registrado.")
            }
        } catch (e) {
            toggleMessage("Ha habido un problema en el registro: ", e);
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
                    <Label htmlFor={'email'}>Dirección de correo electrónico</Label>

                    <Input
                        type={'email'}
                        id={'email'}
                        placeholder={'Introduce tu correo electrónico'}
                        value={datos.email}
                        onChange={(e) => toggleDatos({ ...datos, email: e.target.value })}
                        required
                    />
                </div>

                <div className='Login__FieldContainer'>
                    <Label htmlFor={'birthdate'}>Fecha de nacimiento</Label>

                    <Input
                        type={'date'}
                        id={'birthdate'}
                        placeholder={'Introduce tu fecha de nacimiento'}
                        value={datos.birthdate}
                        onChange={(e) => toggleDatos({ ...datos, birthdate: e.target.value })}
                        required
                    />
                </div>

                <div className='Login__FieldContainer'>
                    <Label htmlFor={'gender'}>Genero</Label>

                    <div className="Login__RadioContainer">
                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                checked={datos.gender === "man"}
                                onChange={() => toggleDatos({ ...datos, gender: "man" })}
                            />

                            <Label htmlFor="man">Hombre</Label>
                        </div>

                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                checked={datos.gender === "man"}
                                onChange={() => toggleDatos({ ...datos, gender: "woman" })}
                            />

                            <Label htmlFor="woman">Mujer</Label>
                        </div>

                        <div className="Login__RadioOption">
                            <Input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                checked={datos.gender === "man"}
                                onChange={() => toggleDatos({ ...datos, gender: "others" })}
                            />

                            <Label htmlFor="others">Otros</Label>
                        </div>
                    </div>
                </div>

                <div>
                    <Checkbox />
                </div>

                <div>
                    <Button type='submit' className='Login__Button--Submit'>Regístrate</Button>
                </div>
            </div>
        </form>
    )
}