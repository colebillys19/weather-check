import { HomeSectionPropsType } from '../../utils/types';

const HomeSection: React.FC<HomeSectionPropsType> = ({ name, children }) => {
  //

  return (
    <div>
      <h2>{name}</h2>
      {children}
    </div>
  );
};

export default HomeSection;
