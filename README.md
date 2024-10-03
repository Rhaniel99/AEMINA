
![Logo](https://i.pinimg.com/originals/21/11/61/21116158daaeb1459b4ec0758505e1ad.gif)


# AEMINA JPT

## Resumo do Projeto

Aemina é um projeto pessoal que explora diversas áreas de conhecimento adquiridas ao longo dos anos. Ele abrange desde a integração com AWS (Minio) e a importação de arquivos Excel até a criação de tabelas e operações CRUD. O projeto é desenvolvido em um ambiente totalmente dockerizado e utiliza tecnologias modernas para garantir eficiência e escalabilidade.

## Tecnologias Utilizadas

- **Inertia.js** (React) com **Tailwind CSS**
- **Laravel**
- **PostgreSQL**
- **Redis**
- **Nginx** 
- **Docker** 
- **AWS** 

## Instalação

Siga os passos abaixo para configurar o projeto AEMINA:

1. **Clone o repositório**
```bash
git clone https://github.com/Rhaniel99/AEMINA.git
```

2. **Configure o arquivo .env**
```bash
Copie o arquivo .env.example para .env e ajuste as credenciais conforme necessário.
```

3. **Inicie os containers com Nginx**
*Todos os containers dependentes do Nginx serão iniciados automaticamente:*
```bash
docker compose up --build nginx -d
```
4. **Instale as dependências do PHP**
```bash
docker-compose run --rm composer install
```
5. **Execute as migrations**
```bash
docker-compose run --rm artisan migrate
```

6. **Instale as dependências do Node.js:**
```bash
docker-compose run --rm node npm i
```
7. **Inicie o front-end**
```bash
docker-compose run --rm --service-ports node npm run dev
```
## Melhorias, Implementações e Logs

> #### Implementações
>
> - ~~Tela de Login.~~
> - ~~Aunteticação.~~
> - ~~Criação de Conta.~~
> - Recuperar Senha
> - ~~Logout~~
> - ~~Instalar Laravel Horizon~~
> - ~~Criar um container para Queues e Horizon.~~
> - ~~Utilizar Redis para Sessão, Queues e Cache.~~
> - ~~Criar seed com usuário adm.~~
> - Importar XLS e Importar no banco com regras.


> #### Melhorias
>
> - .
> - .
>
> 

> #### Logs
>
> - .
> - .
>
> 

