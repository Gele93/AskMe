# AskMe Documentation

## Project Overview
**Name:** AskMe  

**Description:**  
*AskMe* is a full-stack web application built with *ASP.NET* and *React* that allows users to transform plain `.txt` files into interactive study material.

## Snapshots:

##  1. Main features: 
- 📄 **Import Raw Text**: Upload and parse `.txt` files into organized learning sets.
- 🧠 **Create Learning Sets**: Structure your content into reusable, editable sets.
- 🃏 **Interactive Flashcards**: Study using card-based sessions that reinforce retention.
- 🔁 **Session-Based Learning**: Cycle through cards in a focused, engaging learning mode.

## 2. Technology Stack

### 🚀 Frontend
[![npm][npm-logo]][npm-link]  
[![React][React-logo]][React-url]
[![Vite][Vite-logo]][Vite-url]  
[![TailwindCSS][Tailwind-logo]][Tailwind-url]  
[![TypeScript][TypeScript-logo]][TypeScript-url]

### 🔧 Backend
[![ASP.NET Core][AspNet-logo]][AspNet-url]  
[![C#][Csharp-logo]][Csharp-url]

### 🗄️ Database
[![MSSQL][Mssql-logo]][Mssql-url]  
[![Entity Framework][Ef-logo]][Ef-url]

### 🐳 Containerization
[![Docker][Docker-logo]][Docker-url]

### 🗂️ Version Control
[![Git][Git-logo]][Git-url]  
[![GitHub][Github-logo]][Github-url]

 
## 3. Installation and Running

### 3.1. Prerequisites
-Docker

### 3.2 Enviroment variables
- **DB_CONNECTION_STRING**
- **DB_PASSWORD**
- **DEEPSEEK_API_KEY**

### 3.3 Compose
```sh
docker compose --build
```
### 3.5 External dependencies
- https://openrouter.ai

## 4. Architecture
The project is built with a **RESTful API backend with ASP.NET** which is using an **MSSQL database** and a **component-based frontend with React**.

## 5. Contact
Developer: **[Gelecsák Tamás]**  
Email: **[gelecsak.tamas@gmail.com]**  
LinkedIn: **[https://www.linkedin.com/in/tamasgelecsak]**

<!-- Badge References -->
[npm-logo]: https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[npm-link]: https://www.npmjs.com/

[React-logo]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Vite-logo]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/

[Tailwind-logo]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[TypeScript-logo]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[AspNet-logo]: https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=.net&logoColor=white
[AspNet-url]: https://docs.microsoft.com/en-us/aspnet/core/

[Csharp-logo]: https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white
[Csharp-url]: https://learn.microsoft.com/en-us/dotnet/csharp/

[Mssql-logo]: https://img.shields.io/badge/MSSQL-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
[Mssql-url]: https://www.microsoft.com/en-us/sql-server

[Ef-logo]: https://img.shields.io/badge/Entity_Framework_Core-512BD4?style=for-the-badge&logo=.net&logoColor=white
[Ef-url]: https://learn.microsoft.com/en-us/ef/core/

[Docker-logo]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Git-logo]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/

[Github-logo]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[Github-url]: https://github.com/
