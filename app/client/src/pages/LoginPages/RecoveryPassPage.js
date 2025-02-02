import React, { useState } from "react";
import Label from "../../components/GeneralComponents/Label";
import Input from "../../components/GeneralComponents/Input";
import Button from "../../components/LoginComponents/Button";
import { useNavigation } from "../../utils/hooks/useNavigation";
import "../../styles/login/login.css";

export const RecoveryPassPage = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/dmusic/recovery-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token.split(' ')[1];
                console.log(`http://localhost:3001/user/confirm-recovery/${token}`);
                setMessage('Revisa tu correo para restablecer la contraseña.');
            } else {
                setMessage('El mail introducido no existe.');
            }
        } catch(err){
            console.log('Error en la solicitud: ', err);
        }
    };

    return (
        <form className='Login__Form' onSubmit={handleSubmit} method='POST'>
            <div className='Login__HeaderContainer'>
                <h1 className='Login__HeaderContainer--Title'>DMusic</h1>
                <h2 id='Login_HeaderContainer--Description'>Restablece la contraseña</h2>
            </div>

            <div className='Login__InputContainer--Recovery'>
                <div className='Login__FieldContainer'>
                    <Label htmlFor={'email'}>Escribe la dirección de correo electrónico vinculado a tu cuenta</Label>

                    <Input
                        type={'email'}
                        id={'email'}
                        placeholder={'Introduces tu correo electrónico'}
                        name={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {message && 
                <div className='Login__Error-Confirma'>
                    <p className="Login__Error-Confirma">{message}</p>
                </div>
            }

            <div>
                <Button type="submit" className='Login__Button--Submit'>
                    Enviar enlace
                </Button>
            </div>

            <div>
                <Button className='Login__Button--Routes' onClick={() => navigate('/')}>
                    Volver al login
                </Button>
            </div>

        </form>
    );
}