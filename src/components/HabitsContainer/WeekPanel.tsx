import { useEffect, useState } from 'react';
import { Habit } from '../Main';
import { supabase } from '../../config/supabaseClient';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = {
  habits: Habit[];
};

export const WeekPanel = (props: Props) => {
  const { habits } = props;
  return (
    <div className='week__main'>
      <GridRow isWeekdays={true} habit={null} />
      {habits.map((habit) => (
        <GridRow key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

type GridRowTypes = {
  habit: Habit | null;
  isWeekdays?: boolean;
};

type Checkin = {
  id: string;
  habitId: string;
  created_at: Date;
};

export const GridRow: React.FC<GridRowTypes> = ({
  habit,
  isWeekdays = false,
}) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchCheckins = async () => {
      const { data, error } = await supabase
        .from('checkins')
        .select()
        .eq('habitId', habit?.id);

      if (error) {
        setFetchError('Could not fetch checkins');
        setCheckins([]);
        console.log(error);
      }
      if (data) {
        setCheckins(data);
        setFetchError('');
      }
    };
    habit && void fetchCheckins();
  }, [habit]);
  console.log(fetchError);
  return (
    <div className='week_gridRow'>
      <div className='week_gridRow_heading'>{habit?.title}</div>
      <div className='week_gridRow_main'>
        {isWeekdays
          ? weekdays.map((el, i) => {
              return <div key={i}>{el}</div>;
            })
          : checkins.map((item) => {
              return (
                <button key={item.id} className='checkins_complete'></button>
              );
            })}
      </div>
      <div className='week_gridRow_end'>{checkins.length || null}</div>
    </div>
  );
};
