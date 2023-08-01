import { DayOfWeek, createHabit } from '../features/habits/habitsSlice';
import { useAppDispatch } from '../app/hooks';
import { HabitForm } from './HabitForm';

export const AddHabitForm = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = ({
    title,
    frequency,
  }: {
    title: string;
    frequency: DayOfWeek[];
  }) => {
    void dispatch(createHabit({ title, frequency }));
  };
  if (!isVisible) return null;
  return (
    <HabitForm
      formTitle='Add Habit'
      visible={isVisible}
      onClose={onClose}
      handleSubmit={handleSubmit}
    />
  );
};
