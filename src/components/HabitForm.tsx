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
  defaultTitle?: string;
};

export const HabitForm = ({
  formTitle,
  visible,
  onClose,
  handleSubmit,
  defaultTitle,
}: Props) => {
  const [title, setTitle] = useState(defaultTitle ?? '');
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
      className='habit-form'
    >
      <IoCloseSharp
        aria-controls='habit-form'
        aria-expanded={visible}
        className='habit-form-toggle'
        onClick={onClose}
      />
      <h2>{formTitle}</h2>
      <fieldset>
        <h5>1. Name this habit</h5>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <h5>2. Habit type</h5>
        <input type='radio' id='todo' /> <label htmlFor='todo'>To do</label>
        <input type='radio' id='not_todo' />{' '}
        <label htmlFor='not_todo'>Not to do</label>
      </fieldset>
      <fieldset>
        <h5>3. Weekly frequency</h5>
        <div className='grid grid-col-7'>
          {WEEKDAYS.map((day, i) => (
            <CheckboxBtn
              title={day}
              key={i}
              onChange={onChangeModel}
              isChecked={checkModelList.includes(day)}
            />
          ))}
        </div>
        <div className='grid grid-col-2'>
          <CheckboxBtn
            title='Week Days'
            dataId='checkWeekDays'
            isChecked={
              bankDays.every((day) => checkModelList.includes(day)) &&
              checkModelList.length === bankDays.length
            }
            onChange={onChangeModel}
          />
          <CheckboxBtn
            title='Every Day'
            dataId='checkall'
            isChecked={checkModelList.length === WEEKDAYS.length}
            onChange={onChangeModel}
          />
        </div>
      </fieldset>
      <fieldset className='flex'>
        <button className='primary-btn' type='submit' disabled={!canSave}>
          Save
        </button>
        <button type='button' className='secondary-btn' onClick={onClose}>
          Cancel
        </button>
      </fieldset>
    </form>
  );
};

export const CheckboxBtn = ({
  title,
  isChecked,
  onChange,
  dataId,
}: {
  title: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  dataId?: string;
}) => {
  return (
    <div className='check-button'>
      <label htmlFor={dataId ?? title}>
        <input
          type='checkbox'
          name={dataId ?? title}
          id={dataId ?? title}
          data-id={dataId ?? title}
          value={dataId ?? title}
          checked={isChecked}
          onChange={onChange}
          hidden
        />
        <span>{title}</span>
      </label>
    </div>
  );
};
