import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.png';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

export default function Profile() {

    const [aulas, setAulas] = useState([]);

    const history = useHistory();

    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: teacherId,
            }
        }).then(response => {
            setAulas(response.data);
        })
    }, [teacherId]);

    async function handleDeleteAulas(id) {
        try {
            await api.delete(`aulas/${id}`, {
                headers: {
                    Authorization: teacherId,
                }
            });


            setAulas(aulas.filter(aula => aula.id !== id));
        } catch (err) {
            alert('Erro ao  deletar caso tente novamtne ');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda {teacherName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo agendamento</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Aulas Cadastradas</h1>

            <ul>
                {aulas.map(aula => (
                    <li key={aula.id}>
                        <strong>AGENDAMENTO:</strong>
                        <p>{aula.subject}</p>

                        <strong>PROFESSOR:</strong>
                        <p>{aula.prof}</p>

                        <strong>CURSO:</strong>
                        <p>{aula.curso}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{aula.description}</p>

                        <strong>DATA DA AULA</strong>
                        <p>{aula.data_aula}</p>
                        <strong>DATA DA AULA</strong>
                        <p>{aula.hora_aula}</p>

                        <button onClick={() => handleDeleteAulas(aula.id)} type="button">
                            <FiTrash2 siz={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}


            </ul>
        </div>
    );
}