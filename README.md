
![Logo](https://i.pinimg.com/originals/21/11/61/21116158daaeb1459b4ec0758505e1ad.gif)


# AEMINA JPT

## Resumo do Projeto

Aemina é uma plataforma de streaming onde os usuários criam perfis e compartilham filmes, séries e animes. Utiliza **AWS Minio** para armazenamento, **FFmpeg** para conversão de vídeos e **Laravel Horizon** para processamento em segundo plano com filas e jobs. Recentemente, integrou o **Reverb** para notificações em tempo real via WebSocket. Desenvolvido em um ambiente dockerizado, o projeto prioriza eficiência, escalabilidade e uma experiência de usuário fluida, reunindo tecnologias modernas e conhecimentos técnicos adquiridos ao longo do tempo.

## Tecnologias Utilizadas

- **Inertia.js** (React) com **Tailwind CSS**
- **Laravel**
- **PostgreSQL**
- **Redis**
- **Nginx**
- **Reverb**
- **Horizon** 
- **Docker** 
- **AWS** (Minio) 

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
docker compose run --rm composer install
```
5. **Execute as migrations**
```bash
docker compose run --rm artisan migrate
```

6. **Instale as dependências do Node.js:**
```bash
docker compose run --rm node npm i
```
7. **Inicie o front-end**
```bash
docker compose run --rm --service-ports node npm run dev
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
> - ~~Criar um container para minio~~
> - ~~Criar um container para Queues e Horizon.~~
> - ~~Criar seed com usuário adm.~~
> - ~~Importar XLS e Importar no banco com regras.~~
> - ~~Importar Filme MP4 e MKV~~
> - ~~Converter Filme MKV para Mp4~~
> - ~~Converter Filme Mp4 Profile 10 para um mais comum~~
> - ~~Executar Filmes~~
> - ~~Selecionar Perfis~~
> - ~~Inserir Reverb~~
> - Notificação utilizando Reverb para Falhas
> - Notificação utilizando Reverb para Sucesso
> - Inserir Legendas
> - Update Filmes 
> - ~~Listagem de Filmes ( Administrador )~~
> - ~~Listagem de Filmes usuário~~
> - Pesquisa por Filmes usuário
> - ~~Pesquisa por filmes administrador~~
> - Avaliações
> - Comentários
> - Importar séries e Episódios
> - Conversão de Séries e Episódios 

> #### Melhorias
> 
> - ~~Utilizar Redis para Sessão, Queues e Cache~~
> - ~~Utilização de Modais ao invés de pages para criação e login de usuário.~~
> - ~~Atualização para a ultima versão do inertia~~
> -  ~~Container do Horizon~~
> - ~~Reformular o body da homepage~~
> - ~~Reformular a header, utilizar icons com dropdown para Login~~
> - ~~Schemas para cada projeto~~


> #### Logs
> 
> - Dificuldade em inserir uma tabela com 42 mil linhas usando Maatwebsite, houve uma tentiva utilizando Spout, mas não há compatibilidade com arquivos xlsx. ( Apesar da documentação dizer o contrário.)
> - .
> - .
>
> 

