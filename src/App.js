import React, { useState, useEffect } from "react";

import api from './services/api'

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
      title: `Novo repositorio ${Date.now()}`,
      url: `https://github.com/repo${Date.now()}`,
      techs: [
        "Javascript",
        "HTML"
      ]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories(newRepositories);

    // if (response.status === 200) {
    //   const newRepositories = repositories.filter(repository => repository.id !== id)
    //   setRepositories(newRepositories);
    // }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <h2>{repository.title}</h2>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
