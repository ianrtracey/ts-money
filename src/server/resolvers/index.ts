import { IResolvers, buildSchemaFromTypeDefinitions } from "graphql-tools";
import { getAccounts, getTransactions, exchangePublicToken } from "../plaid/api";
// @ts-ignore
import{ User }  from '../models'
import { ValidationError } from 'sequelize'
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import { isContext } from 'vm';
import { v4 as uuidv4} from 'uuid'
type Store = {
  email: string
  income: number | null
  savingsRate: number | null
  expenses: number | null
}


type Context = {
    plaidAccessToken: string | null
    getUser: () => any
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
    me: async (_: void, args, context) => {
      return context.getUser()
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
    login: async(_: void, { input: { email, password }}, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password});
      await context.login(user)
      return { user }
    },
    createUser: async(_: void, { input: { email, password }}, context) => {
      const existingUser = await context.User.findOne({
        where: { email }
      })
      if (existingUser) {
        throw new Error('User with email already exists')
      }

      const newUser = { email, password}
      const user = await context.User.create(newUser)


      await context.login({...newUser, id: user.dataValues.id})
      return { email: newUser.email}
    }
  }
};

export default resolvers;
