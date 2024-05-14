import '../styles/ResponsableTable.css';

const ResponseTable = ({ response }) => {
    const totals = response ? response.reduce((acc, item) => {
        acc.TOKEN = item.token ? acc.TOKEN + 1 : acc.TOKEN;
        acc.PR += item.type === 'PR' ? 1 : 0;
        acc.ID += item.type === 'ID' ? 1 : 0;
        acc.PI += item.type === 'PI' ? 1 : 0;
        acc.PD += item.type === 'PD' ? 1 : 0;
        acc.LI += item.type === 'LI' ? 1 : 0;
        acc.LD += item.type === 'LD' ? 1 : 0;
        acc.PC += item.type === 'PC' ? 1 : 0;
        acc.VAR += item.type === 'VAR' ? 1 : 0;
        acc.OP += item.type === 'OP' ? 1 : 0;
        acc.CO += item.type === 'CO' ? 1 : 0;
        acc.ER += item.type === 'ER' ? 1 : 0;
        return acc;
    }, { TOKEN: 0, PR: 0, ID: 0, PI: 0, PD: 0, LI: 0, LD: 0, PC: 0, VAR: 0, OP: 0, CO: 0, ER: 0 }) : { TOKEN: 0, PR: 0, ID: 0, PI: 0, PD: 0, LI: 0, LD: 0, PC: 0, VAR: 0, OP: 0, CO: 0, ER: 0 };

    return (
        response && (
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th title="Línea de código">Línea</th>
                            <th title="Token encontrado">Token</th>
                            <th title="Palabra Reservada">PR</th>
                            <th title="Identificador">ID</th>
                            <th title="Paréntesis Izquierdo">PI</th>
                            <th title="Paréntesis Derecho">PD</th>
                            <th title="Llave Izquierda">LI</th>
                            <th title="Llave Derecha">LD</th>
                            <th title="Punto y Coma">PC</th>
                            <th title="Variable">VAR</th>
                            <th title="Operador">OP</th>
                            <th title="Comentario">CO</th>
                            <th title="Error">ER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((item) => (
                            <tr key={item.id}>
                                <td>{item.linea}</td>
                                <td>{item.token}</td>
                                <td>{item.type === 'PR' ? 'x' : ''}</td>
                                <td>{item.type === 'ID' ? 'x' : ''}</td>
                                <td>{item.type === 'PI' ? 'x' : ''}</td>
                                <td>{item.type === 'PD' ? 'x' : ''}</td>
                                <td>{item.type === 'LI' ? 'x' : ''}</td>
                                <td>{item.type === 'LD' ? 'x' : ''}</td>
                                <td>{item.type === 'PC' ? 'x' : ''}</td>
                                <td>{item.type === 'VAR' ? 'x' : ''}</td>
                                <td>{item.type === 'OP' ? 'x' : ''}</td>
                                <td>{item.type === 'CO' ? 'x' : ''}</td>
                                <td>{item.type === 'ER' ? 'x' : ''}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total</td>
                            <td>{totals.TOKEN}</td>
                            <td>{totals.PR}</td>
                            <td>{totals.ID}</td>
                            <td>{totals.PI}</td>
                            <td>{totals.PD}</td>
                            <td>{totals.LI}</td>
                            <td>{totals.LD}</td>
                            <td>{totals.PC}</td>
                            <td>{totals.VAR}</td>
                            <td>{totals.OP}</td>
                            <td>{totals.CO}</td>
                            <td>{totals.ER}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    );
};

export default ResponseTable;