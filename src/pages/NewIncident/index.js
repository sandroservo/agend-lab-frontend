import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.png'

export default function NewAulas() {
    const [subject, setSubject] = useState('');
    const [prof, setProf] = useState('');
    const [curso, setCurso] = useState('');
    const [description, setDescription] = useState('');
    const [data_aula, setData_Aula] = useState('');
    const [hora_aula, setHora_Aula] = useState('');

    const history = useHistory();

    const teacherId = localStorage.getItem('teacherId')

    async function handleNewAula(e) {
        e.preventDefault();

        const data = {
            subject,
            prof,
            curso,
            description,
            data_aula,
            hora_aula
        };

        try {
            await api.post('aulas', data, {
                headers: {
                    Authorization: teacherId,
                }
            })

            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=" Be the Hero" />

                    <h1>Cadastrar agendamento</h1>
                    <p>Descreva os detalhes da aula no agendamento.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft className="icon" size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewAula}>
                    <input
                        placeholder="Digite o Laboratório"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                    />
                    <input
                        placeholder="Professor"
                        value={prof}
                        onChange={e => setProf(e.target.value)}
                    />
                    <input
                        placeholder="Curso"
                        value={curso}
                        onChange={e => setCurso(e.target.value)}
                    />

                    {/* <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}

                    /> */}

                    <input
                        placeholder="__ / __ / __"
                        value={data_aula}
                        onChange={e => setData_Aula(e.target.value)}
                    />
                    <input
                        placeholder="00:00"
                        value={hora_aula}
                        onChange={e => setHora_Aula(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}