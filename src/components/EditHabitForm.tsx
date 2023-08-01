import {
  DayOfWeek,
  Habit,
  selectAllHabits,
  updateHabit,
} from '../features/habits/habitsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { HabitForm } from './HabitForm';

export const EditHabitForm = ({
  isVisible,
  onClose,
  id,
}: {
  isVisible: boolean;
  onClose: () => void;
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const { title } = useAppSelector(selectAllHabits).find(
    (habit) => habit.id === id
  ) as Habit;

  const handleSubmit = ({
    title,
    frequency,
  }: {
    title: string;
    frequency: DayOfWeek[];
  }) => {
    void dispatch(updateHabit({ id, title, frequency }));
  };
  if (!isVisible) return null;
  return (
    <HabitForm
      formTitle='Edit Habit'
      visible={isVisible}
      onClose={onClose}
      handleSubmit={handleSubmit}
      defaultTitle={title}
    />
  );
};
