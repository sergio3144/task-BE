import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Tasks',
        description: 'API Tasks'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript / MongoDB',
      version: "1.0.0",
      description: 'API Docs for Tasks'
    },
  },
  apis: ['./src/routes/taskRoutes.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec