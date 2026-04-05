import Realm from 'realm';

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  amount!: number;
  type!: 'income' | 'expense';
  category!: string;
  categoryIcon!: string;
  categoryColor!: string;
  date!: Date;
  notes!: string;
  goalId!: string;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      amount: 'double',
      type: 'string',
      category: 'string',
      categoryIcon: { type: 'string', default: 'dots-horizontal-circle' },
      categoryColor: { type: 'string', default: '#6B7280' },
      date: 'date',
      notes: { type: 'string', default: '' },
      goalId: { type: 'string', default: '' },
      createdAt: 'date',
    },
  };
}
