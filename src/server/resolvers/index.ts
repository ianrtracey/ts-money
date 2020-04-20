import { IResolvers } from "graphql-tools";
import { MongooseDocument } from "mongoose";
import { Product } from "../models/product.model";
import { getAccounts, getTransactions, exchangePublicToken } from "../plaid/api";
import { access } from 'fs';


const store = {
  income: 0,
  savingsRate: 0,
  expenses: 0,
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
    transactions: async (_: void, {accessToken}) => {
      const txns: any = await getTransactions(accessToken);
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
        savingsRate: store.savingsRate,
        expenses: store.expenses
      })
    }
  },
  Mutation: {
    createProduct: async (_: void, { input }) => {
      const product = await Product.create(input);
      return product;
    },
    updateIncome: async(_: void, { input: { income }}) => {
      const sanitizedIncome = Number(income.replace(/\D/g,''))
      store.income = sanitizedIncome;
      return { success: true, income: sanitizedIncome}
    },
    updateSavingsRate: async(_: void, { input: { savingsRate }}) => {
      store.savingsRate = savingsRate
      return { success: true, savingsRate}
    },
    updateExpenses: async(_: void, { input: { expenses }}) => {
      store.expenses = expenses
      return { success: true, expenses}
    },
    login: async(_: void, { input: { publicToken }}) => {
      try {
        const accessToken = await exchangePublicToken(publicToken)
        return { success: true, access_token: accessToken}
      } catch (e) {
        return {success: false, error: e}
      }
    }
  }
};

export default resolvers;
