import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// HTTP actions can be defined inline...
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async ({ runMutation }, request) => {
    // const { author, body } = await request.json();

    // await runMutation(api.sendMessage.default, { body, author });
    return new Response(null, {
      status: 200,
    });
  })
});
// Convex expects the router to be the default export of `convex/http.js`.
export default http;