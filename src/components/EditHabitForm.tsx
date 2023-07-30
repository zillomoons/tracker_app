import { DayOfWeek, updateHabit } from '../features/habits/habitsSlice';
import { useAppDispatch } from '../app/hooks';
import { HabitForm } from './HabitForm';

export const EditHabitForm = ({
  visible,
  onClose,
  id,
}: {
  visible: boolean;
  onClose: () => void;
  id: number;
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = ({
    title,
    frequency,
  }: {
    title: string;
    frequency: DayOfWeek[];
  }) => {
    void dispatch(updateHabit({ id, title, frequency }));
  };

  return (
    <HabitForm
      formTitle='Edit Habit'
      visible={visible}
      onClose={onClose}
      handleSubmit={handleSubmit}
    />
  );
};
