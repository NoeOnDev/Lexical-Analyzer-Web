# Analizador léxico web

## Clonar el repositorio

```bash
git clone https://github.com/NoeOnDev/Lexical-Analyzer-Web.git
```

## Empieza con la configuración e instalación de las dependencias de la Api-back-end

1. Asegúrese de tener Python 3.8 o superior instalado en su sistema. Puede verificar su versión de Python con el siguiente comando:

```bash
python --version
```

2. Instale las dependencias de Python necesarias con pip:

```bash
pip install flask flask_cors python-dotenv ply
```

3. Entre a la carpeta donde se encuentra la Api-back-end:

```bash
cd Lexical-Analyzer-Web/Api-back-end/
```

4. Debe crear un archivo .env para almacenar las variables de entorno que necesita la Api-back-end para funcionar;

```bash
touch .env
```

5. Dentro del proyecto de Api-back-end encontrará un archivo .example.env que contiene las varibales de entorno necesarias para que Api-back-end funcione, copie y pegue esas varibales en el archivo .env creado anteiormente, Por ejemplo:

```bash
PORT = 3003
HOST = localhost
ORIGINS = http://localhost:5173
```

6. Una vez completando los pasos anteriores, ahora puede probar iniciando el archivo server.py de la siguiente manera:

```bash
python3 server.py
```