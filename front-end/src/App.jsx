import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:3003/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.text();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Subir</button>
      </form>
      {response && <pre>{response}</pre>}
    </div>
  );
}

export default App;