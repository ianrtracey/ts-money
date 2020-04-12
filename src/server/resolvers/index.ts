import { IResolvers } from "graphql-tools";
import { MongooseDocument } from "mongoose";
import { Product } from "../models/product.model";
import { getAccounts, getTransactions } from "../plaid/api";

const resolvers: IResolvers = {
  Query: {
    products: (_: void, args: void) => {
      return Product.find({}, (error: Error, products: MongooseDocument) => {
        if (error) {
          return null;
        }

        return products;
      });
    },
    accounts: async (_: void, args: void) => {
      const accounts: any = await getAccounts();
      return accounts.map((account: any) => ({
        name: account.name,
        balance_available: account.balances.available,
        balance_current: account.balances.current,
        currency_code: account.balances.iso_currency_code
      }));
    },
    transactions: async (_: void, args: void) => {
      const txns: any = await getTransactions();
      return txns.map((txn: any) => ({
        name: txn.name,
        amount: txn.amount,
        currency_code: txn.iso_currency_code,
        date: txn.date,
        category: txn.category,
        pending: txn.pending
      }));
    }
  },
  Mutation: {
    createProduct: async (_: void, { input }) => {
      const product = await Product.create(input);
      return product;
    }
  }
};

export default resolvers;
