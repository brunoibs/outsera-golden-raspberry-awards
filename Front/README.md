# Teste OutSera - Raspberry Awards Frontend

SPA desenvolvida em Angular 17+ para exibir informações sobre os indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards, conforme especificações do desafio OutSera.

## Technologies

- **Angular 17+** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **Angular Router** - Navegação entre páginas
- **HttpClient** - Comunicação com API

## Funcionalidades Implementadas

## Dashboard View
- **Anos com Múltiplos Vencedores**: Tabela exibindo anos que tiveram mais de um vencedor
- **Top 3 Estúdios**: Ranking dos estúdios com mais vitórias
- **Intervalos de Produtores**: Tabelas com produtores de maior e menor intervalo entre vitórias
- **Busca por Ano**: Campo expandido (800px) para buscar vencedores de um ano específico

## Lista de Filmes View
- **Tabela Paginada**: Lista completa de filmes com paginação
- **Filtros Avançados**: Por ano e status (vencedor/indicado) com atualização automática
- **Ordenação**: Suporte a ordenação dos dados
- **Detalhes**: Navegação para página de detalhes do filme

## Design Responsivo
- Interface moderna com fundo branco e elementos em cinza/laranja
- Totalmente responsiva para dispositivos móveis (768x1280+)

## Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Navegar para a pasta do projeto
cd Front

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start
```

A aplicação estará disponível em: `http://localhost:4201`

### Build para Produção
```bash
npm run build
```

### Testes
```bash
npm test
```

## Estrutura do Projeto

```
src/
    app/
        components/
            dashboard/           # Dashboard principal
            movie-list/          # Lista de filmes com paginação
            movie-detail/        # Detalhes do filme
        models/
            movie.model.ts       # Interfaces TypeScript (OpenAPI 3.1.0)
        services/
            movie.service.ts     # Serviços para API
        app.component.ts         # Componente principal com navegação
        app.config.ts           # Configuração da aplicação
        app.routes.ts           # Configuração de rotas
    styles.scss                # Estilos globais
    ```

## API Integration

A aplicação consome a API: `https://challenge.outsera.tech/api/movies`

### Endpoints Utilizados:
- `GET /api/movies/yearsWithMultipleWinners` - Anos com múltiplos vencedores
- `GET /api/movies/studiosWithWinCount` - Estúdios com contagem de vitórias
- `GET /api/movies/maxMinWinIntervalForProducers` - Intervalos de produtores
- `GET /api/movies/winnersByYear?year={ano}` - Vencedores por ano
- `GET /api/movies?page=0&size=10&year=2020&winner=true` - Lista paginada com filtros
- `GET /api/movies/{id}` - Detalhes de um filme específico


## Testes

### Estrutura de Testes
- **Testes Unitários**: Para componentes e serviços
- **Testes de Integração**: Para comunicação com API
- **Karma + Jasmine**: Framework de testes

### Executar Testes
```bash
# Testes unitários
npm test

# Testes com coverage
npm run test:coverage
```

## Deploy

Para fazer deploy da aplicação:

1. Execute `npm run build`
2. Os arquivos estarão em `dist/raspberry-awards-frontend/`
3. Faça upload para seu servidor web

## Desenvolvedor

**Bruno Mazzinghy**
- LinkedIn: [Bruno Mazzinghy](https://www.linkedin.com/in/bruno-mazzinghy-78779145/)