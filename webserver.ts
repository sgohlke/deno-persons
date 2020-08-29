import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.67.0/http/server.ts";
import { PersonService } from "./personservice.ts";
const portToRun = 3017;
const s = serve({ port: portToRun });
console.log(`Running person server on  http://localhost:${portToRun}/`);

for await (const req of s) {
  if (req.method === "GET" && req.url.includes("/person")) {
    //Set response headers to return application/json for all responses
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/json");

    if (req.url === "/person" || req.url === "/person/") {
      req.respond(
        {
          headers: responseHeaders,
          body: JSON.stringify(PersonService.getAllPersons()),
        },
      );
    } else {
      const userId = req.url.substring(8);
      req.respond({
        headers: responseHeaders,
        body: JSON.stringify(PersonService.getPersonForId(userId)),
      });
    }
  } else {
    req.respond(
      {
        status: 404
      },
    );
  }
}
