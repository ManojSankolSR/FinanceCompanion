import { useCallback } from 'react';
import { useRealm, useQuery } from '@realm/react';
import { useAppDispatch } from '../app/hooks';
import { Goal } from '../db/schemas/GoalSchema';
import {
  addGoal,
  updateGoal,
  deleteGoal,
  SerializedGoal,
} from '../features/goals/goalsSlice';
import { showSnackbar } from '../features/ui/uiSlice';
import Realm from 'realm';

export const serializeGoal = (g: Goal): SerializedGoal => ({
  id: g._id.toString(),
  title: g.title,
  emoji: g.emoji,
  targetAmount: g.targetAmount,
  startDate: g.startDate.toISOString(),
  endDate: g.endDate.toISOString(),
  currentStreak: g.currentStreak,
  bestStreak: g.bestStreak,
  isActive: g.isActive,
  createdAt: g.createdAt.toISOString(),
});

export const useGoals = () => {
  const realm = useRealm();
  const dispatch = useAppDispatch();
  const realmGoals = useQuery(Goal);

  const createGoal = useCallback(
    (
      data: Omit<
        SerializedGoal,
        'id' | 'createdAt' | 'currentStreak' | 'bestStreak'
      >,
    ) => {
      let created: Goal | null = null;
      realm.write(() => {
        created = realm.create<Goal>('Goal', {
          _id: new Realm.BSON.ObjectId(),
          title: data.title,
          emoji: data.emoji,
          targetAmount: data.targetAmount,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          currentStreak: 0,
          bestStreak: 0,
          isActive: data.isActive,
          createdAt: new Date(),
        });
      });
      if (created) {
        dispatch(addGoal(serializeGoal(created as Goal)));
        dispatch(showSnackbar('Goal created! 🎯'));
      }
    },
    [realm, dispatch],
  );

  const editGoal = useCallback(
    (id: string, data: Partial<Omit<SerializedGoal, 'id' | 'createdAt'>>) => {
      const objectId = new Realm.BSON.ObjectId(id);
      const g = realm.objectForPrimaryKey<Goal>('Goal', objectId);
      if (!g) {
        return;
      }
      realm.write(() => {
        if (data.title !== undefined) {
          g.title = data.title;
        }
        if (data.emoji !== undefined) {
          g.emoji = data.emoji;
        }
        if (data.targetAmount !== undefined) {
          g.targetAmount = data.targetAmount;
        }
        if (data.startDate !== undefined) {
          g.startDate = new Date(data.startDate);
        }
        if (data.endDate !== undefined) {
          g.endDate = new Date(data.endDate);
        }
        if (data.isActive !== undefined) {
          g.isActive = data.isActive;
        }
        if (data.currentStreak !== undefined) {
          g.currentStreak = data.currentStreak;
        }
        if (data.bestStreak !== undefined) {
          g.bestStreak = data.bestStreak;
        }
      });
      dispatch(updateGoal(serializeGoal(g)));
      dispatch(showSnackbar('Goal updated!'));
    },
    [realm, dispatch],
  );

  const removeGoal = useCallback(
    (id: string) => {
      const objectId = new Realm.BSON.ObjectId(id);
      const g = realm.objectForPrimaryKey<Goal>('Goal', objectId);
      if (!g) {
        return;
      }
      realm.write(() => {
        realm.delete(g);
      });
      dispatch(deleteGoal(id));
      dispatch(showSnackbar('Goal removed'));
    },
    [realm, dispatch],
  );

  const seedGoals = useCallback(
    (goals: SerializedGoal[]) => {
      realm.write(() => {
        goals.forEach(data => {
          realm.create<Goal>('Goal', {
            _id: new Realm.BSON.ObjectId(),
            title: data.title,
            emoji: data.emoji,
            targetAmount: data.targetAmount,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            currentStreak: data.currentStreak,
            bestStreak: data.bestStreak,
            isActive: data.isActive,
            createdAt: new Date(data.createdAt),
          });
        });
      });
    },
    [realm],
  );

  return {
    realmGoals,
    createGoal,
    editGoal,
    removeGoal,
    seedGoals,
    serializeGoal,
  };
};
