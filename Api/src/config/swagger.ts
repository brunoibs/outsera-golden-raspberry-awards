import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Golden Raspberry Awards API',
      version: '1.0.0',
      description: 'API para análise dos Golden Raspberry Awards - Prêmios para os "piores" filmes do ano',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Awards',
        description: 'Endpoints relacionados aos prêmios'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/types/*.ts']
};

const specs = swaggerJsdoc(options);

export default specs; 