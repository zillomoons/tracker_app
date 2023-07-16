import { forwardRef } from 'react';
import { Habit } from '../Main';

type Ref = HTMLDivElement;
type Props = {
  habits: Habit[];
};

export const HabitsContainer = forwardRef<Ref, Props>(function Habits(
  props,
  ref
) {
  const { habits } = props;
  return (
    <div className='dashboard__right' ref={ref}>
      <div className='day__container'>
        <div className='day__top'>
          <div className='day-top__dateHeader'>Mon, Jul 10</div>
          <div className='dateSelectors'>
            <button type='button'>&lt;</button>
            <button type='button'>&gt;</button>
          </div>
        </div>
        <div className='day__main'>
          {habits.map((habit) => (
            <DayItem
              key={habit.id}
              habitTitle={habit.title}
              backgroundColor='#9c5cff'
            />
          ))}
        </div>
        <div className='day-addTask--mobile'>
          <button className='whiteButton'>Add Habit</button>
        </div>
      </div>
    </div>
  );
});

type DayItemProps = {
  habitTitle: string;
  backgroundColor: string;
};

const DayItem = ({ habitTitle, backgroundColor }: DayItemProps) => {
  return (
    <div className='dayItem'>
      <div className='dayItem__highlight' style={{ backgroundColor }}></div>
      <div className='dayItem__leftSide'>
        <div className='color-indicator' style={{ backgroundColor }}></div>
      </div>
      <div className='dayItem__topLeft'>
        <h2 className='dayItem__header'>{habitTitle}</h2>
      </div>
      <div className='dayItem__topRight'>...</div>
      <div className='dayItem__submit'>
        <button className='dayItem__completeButton'>Mark Complete</button>
      </div>
    </div>
  );
};
