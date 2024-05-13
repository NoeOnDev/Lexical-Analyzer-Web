import '../styles/ResponsableTable.css';

const ResponseTable = ({ response }) => {
    const totals = response ? response.reduce((acc, item) => {
        acc.PR += item.type === 'PR' ? 1 : 0;
        acc.ID += item.type === 'ID' ? 1 : 0;
        acc.PI += item.type === 'PI' ? 1 : 0;
        acc.PD += item.type === 'PD' ? 1 : 0;
        acc.LI += item.type === 'LI' ? 1 : 0;
        acc.LD += item.type === 'LD' ? 1 : 0;
        acc.PC += item.type === 'PC' ? 1 : 0;
        acc.VAR += item.type === 'VAR' ? 1 : 0;
        acc.SUM += item.type === 'SUM' ? 1 : 0;
        acc.CO += item.type === 'CO' ? 1 : 0;
        acc.ER += item.type === 'ER' ? 1 : 0;
        return acc;
    }, {PR: 0, ID: 0, PI: 0, PD: 0, LI: 0, LD: 0, PC: 0, VAR: 0, SUM: 0, CO: 0, ER: 0}) : {PR: 0, ID: 0, PI: 0, PD: 0, LI: 0, LD: 0, PC: 0, VAR: 0, SUM: 0, CO: 0, ER: 0};

    return (
        response && (
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Línea</th>
                            <th>Token</th>
                            <th>PR</th>
                            <th>ID</th>
                            <th>PI</th>
                            <th>PD</th>
                            <th>LI</th>
                            <th>LD</th>
                            <th>PC</th>
                            <th>VAR</th>
                            <th>SUM</th>
                            <th>CO</th>
                            <th>ER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((item, index) => (
                            <tr key={index}>
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
                                <td>{item.type === 'SUM' ? 'x' : ''}</td>
                                <td>{item.type === 'CO' ? 'x' : ''}</td>
                                <td>{item.type === 'ER' ? 'x' : ''}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{totals.PR}</td>
                            <td>{totals.ID}</td>
                            <td>{totals.PI}</td>
                            <td>{totals.PD}</td>
                            <td>{totals.LI}</td>
                            <td>{totals.LD}</td>
                            <td>{totals.PC}</td>
                            <td>{totals.VAR}</td>
                            <td>{totals.SUM}</td>
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