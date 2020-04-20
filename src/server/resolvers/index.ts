import { IResolvers } from "graphql-tools";
import { getAccounts, getTransactions, exchangePublicToken } from "../plaid/api";
// @ts-ignore
import User from '../../../models/user'
import sequelize from '../db'
import { DataTypes } from 'sequelize'

type Store = {
  email: string
  income: number | null
  savingsRate: number | null
  expenses: number | null
}


type Context = {
    plaidAccessToken: string | null
}

const store: Store = {
  email: "ianrtracey@gmail.com",
  income: 7400,
  savingsRate: 30,
  expenses: 2400,
}


const resolvers: IResolvers = {
  Query: {
    accounts: async (_: void, args: void, context: Context) => {
      console.log({context})
      const plaidAccessToken = context.plaidAccessToken || ''
      const accounts: any = await getAccounts(plaidAccessToken);
      return accounts.map((account: any) => ({
        name: account.name,
        balance_available: account.balances.available,
        balance_current: account.balances.current,
        currency_code: account.balances.iso_currency_code
      }));
    },
    transactions: async (_: void, args: void, context: Context) => {
      const plaidAccessToken = context.plaidAccessToken
      const txns: any = await getTransactions(plaidAccessToken || '');
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
    },
    createUser: async(_: void, { input: { email }}) => {
      const user = await User(sequelize, DataTypes).create({ email, })
      return user
    }
  }
};

export default resolvers;
