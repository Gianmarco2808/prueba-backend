import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options : swaggerJSDoc.Options = {
     swaggerDefinition: {
          openapi: '3.0.2',
          tags: [
               {
                    name: 'Products',
                    description: 'API operations related to products'
               }
          ],
          info: {
               title: 'REST API Node.js / express / Typescript',
               version: '1.0.0',
               description: 'API Docs for Products'
          }
     },
     apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
     customCss: `
          .topbar-wrapper .link {
               content: url('https://applicantes.com/wp-content/uploads/2023/03/crear-logotipo-empresa-financiera.jpeg')
               height: 120px;
               width: auto;
          }
     `,
     customSiteTitle: 'Documentacion REST API Express / Typescript'
}

export default swaggerSpec
export {
     swaggerUiOptions
}