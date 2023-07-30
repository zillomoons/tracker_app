import { DayOfWeek, createHabit } from '../features/habits/habitsSlice';
import { useAppDispatch } from '../app/hooks';
import { HabitForm } from './HabitForm';

export const AddHabitForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
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

  return (
    <HabitForm
      formTitle='Add Habit'
      visible={visible}
      onClose={onClose}
      handleSubmit={handleSubmit}
    />
  );
};
