import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export const ArrowButtons = ({
  goPrev,
  goNext,
  isNextDisabled,
}: {
  goPrev: () => void;
  goNext: () => void;
  isNextDisabled: boolean;
}) => {
  return (
    <div>
      <button onClick={goPrev}>
        <BiLeftArrowAlt />
      </button>
      <button onClick={goNext} disabled={isNextDisabled}>
        <BiRightArrowAlt />
      </button>
    </div>
  );
};
