import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from './components/Button';
import ResponseTable from './components/ResponsableTable';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

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
    if (!file) {
      toast.error('Por favor, selecciona un archivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:3003/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorMessage = response.status === 404 ? 'No se encontraron tokens válidos en el archivo analizado' : await response.text();
      toast.error(errorMessage);
      return;
    }
    const data = await response.json();
    setResponse(data);
    toast.success('Tu archivo ha sido analizado con éxito');
  };

  const onCodeFormSubmit = async (event) => {
    event.preventDefault();
    if (!code.trim()) {
      toast.error('Por favor, introduce código');
      return;
    }
    const responseOnCode = await fetch('http://localhost:3003/analyze', {
      method: 'POST',
      body: code,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    if (!responseOnCode.ok) {
      const errorMessage = responseOnCode.status === 404 ? 'No se encontraron tokens válidos en el código analizado' : await responseOnCode.text();
      toast.error(errorMessage);
      return;
    }
    const data = await responseOnCode.json();
    setResponseOnCode(data);
    toast.success('Tu código ha sido analizado con éxito');
  };


  return (
    <div>
      <h1 className='title'>Analizador Léxico Web</h1>
      <div className='container'>
        <div className='container-A'>
          <form className='form-A' onSubmit={onFileFormSubmit}>
            <label className="custum-file-upload" for="file">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                  <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                  <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click to upload File</span>
              </div>
              <input className='upload-file' id='file' type="file" onChange={onFileChange} />
            </label>
            <Button text='Generar Análisis' />
          </form>
          <ResponseTable response={response} />
        </div>
        <div className='container-B'>
          <form className='form-B' onSubmit={onCodeFormSubmit}>
            <textarea placeholder='Introduce el código que deseas analizar' className='text-area-B' onChange={onCodeChange} value={code} />
            <Button text='Generar Análisis' />
          </form>
          <ResponseTable response={responseOnCode} />
        </div>
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;
