import plaid from "plaid";
import moment from "moment";
import { prettyPrint } from "../utils";

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID || "",
  process.env.PLAID_SECRET || "",
  process.env.PLAID_PUBLIC_KEY || "",
  plaid.environments.development || "",
  {
    version: "2019-05-29" // specify API version
  }
);
export const getAccounts = (plaidAccessToken: string) => {
  return new Promise((resolve, reject) => {
    client.getAccounts(plaidAccessToken, function(error, response) {
      if (error) {
        reject(error);
      }
      const balanceResponse = response.accounts;
      resolve(balanceResponse);
    });
  });
};

export const getTransactions = (accessToken: string, offset = 0) => {
  return new Promise((resolve, reject) => {
    const startDate = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(
      accessToken,
      startDate,
      endDate,
      {
        count: 250,
        offset
      },
      (error, response) => {
        if (error) {
          prettyPrint(error);
          reject(error);
        }
        prettyPrint(response);
        resolve(response.transactions);
      }
    );
  });
};

export const exchangePublicToken = (publicToken: string) => {
  return new Promise((resolve, reject) => {
    client.exchangePublicToken(publicToken, (error, response) => {
      if (response && response.access_token) {
        resolve(response.access_token)
      } else {
        prettyPrint(error)
        reject(error)
      }
    })
  })
}

export default null;
