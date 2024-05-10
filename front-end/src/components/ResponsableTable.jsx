import '../styles/ResponsableTable.css';

const ResponseTable = ({ response }) => {
    return (
        response && (
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Línea</th>
                            <th>Reservada</th>
                            <th>Símbolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((item, index) => (
                            <tr key={index}>
                                <td>{item.linea}</td>
                                <td>{item.reserved}</td>
                                <td>{item.symbol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
};

export default ResponseTable;