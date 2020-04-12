import plaid from "plaid";
import { prettyPrint } from "../utils";
let PUBLIC_TOKEN = null;
let ACCESS_TOKEN = null;
let ITEM_ID = null;

const addPlaidRoutes = (app: any) => {
  app.post("/get_access_token", (req: any, resp: any, next: any) => {
    PUBLIC_TOKEN = req.body.public_token;
    client.exchangePublicToken(PUBLIC_TOKEN, (err, tokenResponse) => {
      if (err != null) {
        prettyPrint(err);
        return resp.json({
          error: err
        });
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      prettyPrint(tokenResponse);
      resp.json({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: null
      });
    });
  });
};

export default addPlaidRoutes;
