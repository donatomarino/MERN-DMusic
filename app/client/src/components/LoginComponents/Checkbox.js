import React from 'react';
import Input from '../GeneralComponents/Input';

export default function Checkbox() {

    return (
        <div className="Checkbox__Container">
            <Input 
                type="checkbox" 
                id="lopd" 
                name="lopd" 
                required 
                // checked={acceptLopd}
                // onChange={toggleLopd}
            /> 
            <a href="/lopd" className="Checkbox__Container--link">
                Acepto términos y condiciones
            </a>
        </div>
    );
}