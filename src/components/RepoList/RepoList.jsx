import './RepoList.css';
import isGerman from "../../scripts/is-german";
import { useEffect, useState } from 'react';

function RepoList() {
    const [repos, setRepos] = useState([]);
    const componentContent = isGerman() ? {
        componentTitle: "Projekte"
    } : {
        componentTitle: "Projects"
    }

    useEffect(() => {
        fetch('https://api.github.com/users/JBNCK/repos', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setRepos(data))
            .catch(error => console.error("Couldn't fetch repos"));
    }, []);

    return (
        <div id='repo-list'>
            {repos.map(repo => (
                <a key={repo.id} className="repo-item" href={repo.html_url}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description || 'No description'}</p>
                </a>
            ))}
        </div>
    );
}

export default RepoList;