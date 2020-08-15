import { serve, ServerRequest } from "https://deno.land/std@0.65.0/http/server.ts";
import {Person} from './person.ts';
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

const personList = new Map( [
  ["1", new Person(1, "Meier", "Hans", 40)],
  ["2", new Person(2, "Mahler", "Sandra", 32)],
  ["3", new Person(3, "Huber", "Franz", 56)]
]); 

function sendErrorMessage(req: ServerRequest): Promise<void> {
  return req.respond({ body: 'An error occured') ) });
}

for await (const req of s) {
  //console.log('Req is ', req);
    if (req.method === 'GET' && req.url.includes('/person') ) {
      console.log('PersonList is ', JSON.stringify(Array.from( personList.values())));
        if (req.url === '/person' || req.url === '/person/'  ) {
          console.log('person root route');
          req.respond({ body: JSON.stringify(Array.from( personList.values()))});
        } else {
          const userId = req.url.substring(8);
          console.log('person detail route', userId);

          // Find user with userId
          req.respond({ body: JSON.stringify(personList.get(userId) ) });
        }
    }
}