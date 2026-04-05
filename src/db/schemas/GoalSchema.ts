import Realm from 'realm';

export class Goal extends Realm.Object<Goal> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  emoji!: string;
  targetAmount!: number;
  startDate!: Date;
  endDate!: Date;
  currentStreak!: number;
  bestStreak!: number;
  isActive!: boolean;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Goal',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      emoji: { type: 'string', default: '🎯' },
      targetAmount: 'double',
      startDate: 'date',
      endDate: 'date',
      currentStreak: { type: 'int', default: 0 },
      bestStreak: { type: 'int', default: 0 },
      isActive: { type: 'bool', default: true },
      createdAt: 'date',
    },
  };
}
