import plaid from "plaid";
import moment from "moment";
import { prettyPrint } from "../utils";

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID || "",
  process.env.PLAID_SECRET || "",
  process.env.PLAID_PUBLIC_KEY || "",
  plaid.environments.sandbox || "",
  {
    version: "2019-05-29" // specify API version
  }
);
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    client.getBalance(ACCESS_TOKEN, function(error, response) {
      if (error) {
        console.log(error);
        reject(error);
      }
      const balanceResponse = response.accounts;
      resolve(balanceResponse);
    });
  });
};

export const getTransactions = (offset = 0) => {
  return new Promise((resolve, reject) => {
    const startDate = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(
      ACCESS_TOKEN,
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

export default null;
