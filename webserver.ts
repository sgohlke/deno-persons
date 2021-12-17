import { PersonService, Server } from "./deps.ts";
const port = 3017;
const handler = (req: Request) => {
  if (req.method === 'GET' && req.url.includes('/person')) {
    //Set response headers to return application/json for all responses
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/json');

    if (req.url.endsWith('/person') || req.url.endsWith('/person/')) {
      return new Response(JSON.stringify(PersonService.getAllPersons()), {headers: responseHeaders}); 
    } else {
      const userId = req.url.substring(req.url.lastIndexOf('/') + 1);
      return new Response(JSON.stringify(PersonService.getPersonForId(userId)), {headers: responseHeaders });
    }
  } else {
    return new Response(undefined, {status: 404});
  }
}

const server = new Server({port, handler});
console.log(`Running person server on  http://localhost:${port}/`);
await server.listenAndServe();
