import Realm from 'realm';

export class UserProfile extends Realm.Object<UserProfile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  currency!: string;
  currencySymbol!: string;
  themeMode!: string;
  colorPalette!: string;
  hasSeenOnboarding!: boolean;
  monthlyBudget!: number;

  static schema: Realm.ObjectSchema = {
    name: 'UserProfile',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: { type: 'string', default: 'Friend' },
      currency: { type: 'string', default: 'INR' },
      currencySymbol: { type: 'string', default: '₹' },
      themeMode: { type: 'string', default: 'system' },
      colorPalette: { type: 'string', default: 'default' },
      hasSeenOnboarding: { type: 'bool', default: false },
      monthlyBudget: { type: 'double', default: 50000 },
    },
  };
}
