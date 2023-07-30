import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { WEEKDAYS } from '../lib/calendar';
import { DayOfWeek } from '../features/habits/habitsSlice';

type Props = {
  formTitle: string;
  visible: boolean;
  onClose: () => void;
  handleSubmit: ({
    title,
    frequency,
  }: {
    title: string;
    frequency: DayOfWeek[];
  }) => void;
};

export const HabitForm = ({
  formTitle,
  visible,
  onClose,
  handleSubmit,
}: Props) => {
  const [title, setTitle] = useState('');
  const [checkModelList, setCheckModelList] = useState<DayOfWeek[]>([]);
  const bankDays = WEEKDAYS.slice(0, 5);

  const onChangeModel = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const dataId = e.target.dataset.id;

    if (dataId === 'checkall') {
      if (isChecked) {
        setCheckModelList(WEEKDAYS);
      } else {
        setCheckModelList([]);
      }
    } else if (dataId === 'checkWeekDays') {
      if (isChecked) {
        setCheckModelList(bankDays);
      } else {
        const resultFilter = checkModelList.filter(
          (d) => !bankDays.includes(d)
        );
        setCheckModelList(resultFilter);
      }
    } else {
      if (isChecked) {
        setCheckModelList((prevValue) => [...prevValue, dataId as DayOfWeek]);
      } else {
        const resultFilter = checkModelList.filter((d) => d !== dataId);
        setCheckModelList(resultFilter);
      }
    }
  };

  useEffect(() => {
    setCheckModelList([]);
  }, []);

  const canSave = [title, checkModelList.length].every(Boolean);
  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ title, frequency: checkModelList });
    setTitle('');
    onClose();
  };
  return (
    <form
      onSubmit={onSave}
      data-visible={visible}
      id='habit-form'
      className='habit-form flex'
    >
      <IoCloseSharp
        aria-controls='habit-form'
        aria-expanded={visible}
        className='habit-form-toggle'
        onClick={onClose}
      />
      <h2>{formTitle}</h2>
      <fieldset>
        <h3>1. Name this habit</h3>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <h3>2. Habit type</h3>
        <input type='radio' id='todo' /> <label htmlFor='todo'>To do</label>
        <input type='radio' id='not_todo' />{' '}
        <label htmlFor='not_todo'>To do</label>
      </fieldset>
      <fieldset>
        <h3>3. Weekly frequency</h3>
        {WEEKDAYS.map((day, i) => (
          <label htmlFor={day} key={i}>
            <input
              id={day}
              type='checkbox'
              data-id={day}
              value={day}
              checked={checkModelList.includes(day)}
              onChange={onChangeModel}
            />
            {day}
          </label>
        ))}
        <div className='flex'>
          <label htmlFor='checkWeekDays'>
            <input
              type='checkbox'
              data-id='checkWeekDays'
              id='checkWeekDays'
              value='checkWeekDays'
              onChange={onChangeModel}
              checked={
                bankDays.every((day) => checkModelList.includes(day)) &&
                checkModelList.length === bankDays.length
              }
            />
            Week Days
          </label>
          <label htmlFor='checkall'>
            <input
              type='checkbox'
              data-id='checkall'
              id='checkall'
              value='checkall'
              onChange={onChangeModel}
              checked={checkModelList.length === WEEKDAYS.length}
            />
            Every Day
          </label>
        </div>
      </fieldset>
      <fieldset className='flex'>
        <button type='submit' disabled={!canSave}>
          Save
        </button>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </fieldset>
    </form>
  );
};
