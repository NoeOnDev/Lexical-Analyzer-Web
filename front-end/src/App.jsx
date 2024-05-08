import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [response, setResponse] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const onFileFormSubmit = async (event) => {
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

  const onCodeFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3003/analyze', {
      method: 'POST',
      body: code,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const data = await response.text();
    setResponse(data);
  };

  return (
    <div className='container'>
      <div className='container-A'>
        <form className='form-A' onSubmit={onFileFormSubmit}>
          <input id='file' type="file" onChange={onFileChange} />
          <button type="submit">Subir y Analizar</button>
        </form>

      </div>
      <div className='container-B'>
        <form className='form-B' onSubmit={onCodeFormSubmit}>
          <textarea onChange={onCodeChange} value={code} />
          <button type="submit">Analizar Código</button>
        </form>
        {response && <pre>{response}</pre>}
      </div>
    </div>
  );
}

export default App;