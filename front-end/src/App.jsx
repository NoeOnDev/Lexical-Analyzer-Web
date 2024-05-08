import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [response, setResponse] = useState(null);
  const [responseOnCode, setResponseOnCode] = useState(null);

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
    const data = await response.json(); // Parse JSON response
    setResponse(data);
  };

  const onCodeFormSubmit = async (event) => {
    event.preventDefault();
    const responseOnCode = await fetch('http://localhost:3003/analyze', {
      method: 'POST',
      body: code,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const data = await responseOnCode.json(); // Parse JSON response
    setResponseOnCode(data);
  };

  return (
    <div className='container'>
      <div className='container-A'>
        <form className='form-A' onSubmit={onFileFormSubmit}>
          <input id='file' type="file" onChange={onFileChange} />
          <button type="submit">Subir y Analizar</button>
        </form>
        {response && (
          <table>
            <thead>
              <tr>
                <th>Línea</th>
                <th>Símbolo</th>
              </tr>
            </thead>
            <tbody>
              {response.map((item, index) => (
                <tr key={index}>
                  <td>{item.linea}</td>
                  <td>{item.simbolo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='container-B'>
        <form className='form-B' onSubmit={onCodeFormSubmit}>
          <textarea className='text-area-B' onChange={onCodeChange} value={code} />
          <button type="submit">Analizar Código</button>
        </form>
        {responseOnCode && (
          <table>
            <thead>
              <tr>
                <th>Línea</th>
                <th>Símbolo</th>
              </tr>
            </thead>
            <tbody>
              {responseOnCode.map((item, index) => (
                <tr key={index}>
                  <td>{item.linea}</td>
                  <td>{item.simbolo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
