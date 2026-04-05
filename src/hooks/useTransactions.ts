import { useCallback } from 'react';
import { useRealm, useQuery } from '@realm/react';
import { useAppDispatch } from '../app/hooks';
import { Transaction } from '../db/schemas/TransactionSchema';
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  SerializedTransaction,
} from '../features/transactions/transactionsSlice';
import { showSnackbar } from '../features/ui/uiSlice';
import Realm from 'realm';

export const serializeTransaction = (
  t: Transaction,
): SerializedTransaction => ({
  id: t._id.toString(),
  amount: t.amount,
  type: t.type as 'income' | 'expense',
  category: t.category,
  categoryIcon: t.categoryIcon,
  categoryColor: t.categoryColor,
  date: t.date.toISOString(),
  notes: t.notes,
  goalId: t.goalId,
  createdAt: t.createdAt.toISOString(),
});

export const useTransactions = () => {
  const realm = useRealm();
  const dispatch = useAppDispatch();
  const realmTransactions = useQuery(Transaction);

  const createTransaction = useCallback(
    (data: Omit<SerializedTransaction, 'id' | 'createdAt'>) => {
      let created: Transaction | null = null;
      realm.write(() => {
        created = realm.create<Transaction>('Transaction', {
          _id: new Realm.BSON.ObjectId(),
          amount: data.amount,
          type: data.type,
          category: data.category,
          categoryIcon: data.categoryIcon,
          categoryColor: data.categoryColor,
          date: new Date(data.date),
          notes: data.notes,
          goalId: data.goalId,
          createdAt: new Date(),
        });
      });
      if (created) {
        dispatch(addTransaction(serializeTransaction(created as Transaction)));
        dispatch(showSnackbar('Transaction added!'));
      }
    },
    [realm, dispatch],
  );

  const editTransaction = useCallback(
    (
      id: string,
      data: Partial<Omit<SerializedTransaction, 'id' | 'createdAt'>>,
    ) => {
      const objectId = new Realm.BSON.ObjectId(id);
      const t = realm.objectForPrimaryKey<Transaction>('Transaction', objectId);
      if (!t) {
        return;
      }
      realm.write(() => {
        if (data.amount !== undefined) {
          t.amount = data.amount;
        }
        if (data.type !== undefined) {
          t.type = data.type as 'income' | 'expense';
        }
        if (data.category !== undefined) {
          t.category = data.category;
        }
        if (data.categoryIcon !== undefined) {
          t.categoryIcon = data.categoryIcon;
        }
        if (data.categoryColor !== undefined) {
          t.categoryColor = data.categoryColor;
        }
        if (data.date !== undefined) {
          t.date = new Date(data.date);
        }
        if (data.notes !== undefined) {
          t.notes = data.notes;
        }
        if (data.goalId !== undefined) {
          t.goalId = data.goalId;
        }
      });
      dispatch(updateTransaction(serializeTransaction(t)));
      dispatch(showSnackbar('Transaction updated!'));
    },
    [realm, dispatch],
  );

  const removeTransaction = useCallback(
    (id: string) => {
      const objectId = new Realm.BSON.ObjectId(id);
      const t = realm.objectForPrimaryKey<Transaction>('Transaction', objectId);
      if (!t) {
        return;
      }
      realm.write(() => {
        realm.delete(t);
      });
      dispatch(deleteTransaction(id));
      dispatch(showSnackbar('Transaction deleted'));
    },
    [realm, dispatch],
  );

  const seedTransactions = useCallback(
    (transactions: SerializedTransaction[]) => {
      realm.write(() => {
        transactions.forEach(data => {
          realm.create<Transaction>('Transaction', {
            _id: new Realm.BSON.ObjectId(),
            amount: data.amount,
            type: data.type as 'income' | 'expense',
            category: data.category,
            categoryIcon: data.categoryIcon,
            categoryColor: data.categoryColor,
            date: new Date(data.date),
            notes: data.notes,
            goalId: data.goalId,
            createdAt: new Date(data.createdAt),
          });
        });
      });
    },
    [realm],
  );

  return {
    realmTransactions,
    createTransaction,
    editTransaction,
    removeTransaction,
    seedTransactions,
    serializeTransaction,
  };
};
