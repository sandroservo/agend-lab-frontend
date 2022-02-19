import React,{ useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logoimg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Login() {

    const [ id, setId ] = useState('');
    const history = useHistory();

    async function handlerLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            //console.log(response.data.name);
            localStorage.setItem('teacherId', id);
            localStorage.setItem('teacherName', response.data.name);

            history.push('/profile')

        } catch(erro){
            alert('Falha no  login, tente novamente.');
        }
    }
    
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoimg} alt="" />

                <form onSubmit={handlerLogin}>
                    <h1>Faça seu Login</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)} 
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link"to="/register">
                    <FiLogIn className="icon" size={16} color="#E02041"/>
                        Não tenho Cadastro
                        </Link>


                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );

}