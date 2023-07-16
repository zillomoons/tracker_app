import { forwardRef } from 'react';
import { WeekPanel } from '../HabitsContainer/WeekPanel';
import { Habit } from '../Main';

type Ref = HTMLDivElement;

type Props = {
  habits: Habit[];
};

export const ProgressView = forwardRef<Ref, Props>(function Progress(
  props: Props,
  ref
) {
  return (
    <div className='dashboard__left' ref={ref}>
      <h1 className='dashboard__top'>Good afternoon, Zillowmoon</h1>
      <WeekPanel {...props} />
    </div>
  );
});
