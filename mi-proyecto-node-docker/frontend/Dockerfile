# frontend/Dockerfile
FROM node:20-alpine

# Crear el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el frontend
COPY . .

# Exponer el puerto por defecto de create-react-app
EXPOSE 5173

# Comando para desarrollo (muestra en localhost:3000)
CMD ["npm", "run", "dev"]
