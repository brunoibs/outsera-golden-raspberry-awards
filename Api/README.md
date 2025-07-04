# API Golden Raspberry Awards

Esta é uma API RESTful que permite consultar a lista de indicados e vencedores da categoria "Pior Filme" dos Golden Raspberry Awards.

## Sobre o Projeto

A API analisa dados históricos dos Golden Raspberry Awards e identifica:
- **Produtor com menor intervalo**: Quem ganhou dois prêmios no menor tempo
- **Produtor com maior intervalo**: Quem teve o maior tempo entre duas vitórias consecutivas

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Express** - Framework web para Node.js
- **Better-SQLite3** - Banco de dados SQLite em memória
- **Swagger UI** - Documentação interativa da API
- **Jest + Supertest** - Testes de integração
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## Pré-requisitos

- **Node.js** instalado (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)
- **Docker** (opcional, para execução em container)

## Instalação

1. **Clone o repositório**:
   ```bash   
   git clone https://github.com/brunoibs/outsera-golden-raspberry-awards.git
   cd Api
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

## Configuração

O projeto não requer configurações adicionais de ambiente, pois utiliza:
- Banco de dados SQLite em memória
- Carregamento automático de dados do arquivo CSV
- Certifique-se de que o arquivo `movielist.csv` está localizado na pasta `data/` na raiz do projeto

## Execução com Docker

Se você quiser executar a aplicação em um container Docker:

1. **Certifique-se de ter o Docker instalado**
2. **Execute o comando**:
   ```bash
   docker-compose up -d
   ```

## Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm run build
npm start
```

### Com Docker
```bash
docker-compose up -d
```

## Documentação da API

### Swagger UI
Acesse a documentação interativa da API em:
**http://localhost:3000/api-docs**

## Endpoints
A API estará disponível em **http://localhost:3000**
  API Principal: **http://localhost:3000/api/awards/producer-intervals**
  Documentação Swagger: **http://localhost:3000/api-docs/**
  Interface Swagger UI: **http://localhost:3000/api-docs/**

### GET /api/awards/producer-intervals

Retorna os produtores com o maior e menor intervalo entre duas vitórias consecutivas.

#### Resposta de Exemplo

```json
{
  "min": [
    {
      "producers": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producers": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## Testes

### Executar Testes de Integração
```bash
npm run test
```

Os testes verificam:
- Funcionamento correto do endpoint principal
- Estrutura da resposta JSON
- Valores esperados baseados nos dados do CSV

## Desenvolvedor

**Bruno Mazzinghy**
- LinkedIn: [Bruno Mazzinghy](https://www.linkedin.com/in/bruno-mazzinghy-78779145/)


