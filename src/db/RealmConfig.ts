import { Transaction } from './schemas/TransactionSchema';
import { Goal } from './schemas/GoalSchema';
import { UserProfile } from './schemas/UserProfileSchema';

export const RealmConfig = {
  schema: [Transaction, Goal, UserProfile],
  schemaVersion: 2,
};
