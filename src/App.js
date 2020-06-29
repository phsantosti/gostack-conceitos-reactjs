import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);



    async function handleAddRepository() {
        const response = await api.post('repositories', {
            title: 'Projeto HTML5 S',
            url: 'https://github.com/phsantosti/projeto-html5-s',
            techs: [
                'HTML5', 'CSS3', 'JQUERY'
            ]
        });
        const repository = response.data;
        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        const items = [...repositories];
        const index = items.findIndex(item => item.id === id);

        if(index !== -1){
            items.splice(index, 1);
            const response = await api.delete(`repositories/${id}`);
            if(response.status === 204){
                setRepositories(items);
            }
        }
    }

    return (
        <div>
            <ul data-testid="repository-list" className="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id} className="repository-list-item">
                        <span className="repository-list-item-title">{repository.title}</span>
                        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
