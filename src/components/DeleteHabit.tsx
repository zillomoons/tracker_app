import { useAppDispatch } from '../app/hooks';
import { deleteHabit } from '../features/habits/habitsSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const DeleteHabit = ({
  habitName,
  id,
  onClose,
}: {
  habitName: string;
  id: number;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const onDelete = () => {
    void dispatch(deleteHabit({ id }));
  };
  return (
    <>
      <h2 className='flex flex-row'>
        <RiDeleteBin6Line />
        Delete Habit
      </h2>
      <p>Are you sure you want to delete this habit?</p>
      <p>You won't be able to see your history.</p>
      <p className='accent text-center'>{habitName}</p>
      <div
        className='flex'
        style={{ justifyContent: 'space-evenly', marginTop: '1em' }}
      >
        <button className='secondary-btn' onClick={onClose}>
          Cancel
        </button>
        <button className='primary-btn' onClick={onDelete}>
          Delete
        </button>
      </div>
    </>
  );
};
