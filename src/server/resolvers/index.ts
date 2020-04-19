import { IResolvers } from "graphql-tools";
import { MongooseDocument } from "mongoose";
import { Product } from "../models/product.model";
import { getAccounts, getTransactions } from "../plaid/api";


const store = {
  income: null
}

const resolvers: IResolvers = {
  Query: {
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
    },
    user: async (_: void, args: void) => {
      return ({
        income: store.income,
      })
    }
  },
  Mutation: {
    createProduct: async (_: void, { input }) => {
      const product = await Product.create(input);
      return product;
    },
    updateIncome: async(_: void, { input: { income }}) => {
      store.income = income
      return {success: true}
    }
  }
};

export default resolvers;
