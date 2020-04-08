import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository({title="Project with no name", url="https://none.com", techs=["ReactJS","VueJS","React Native"]}) {
    const response = await api.post('repositories', {
      title,
      url,
      techs,
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    repositories.splice(repositoryIndex,1)

    api.delete(`repositories/${id}`)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button type="submit" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
