import { MainContainerPropsType } from '../../utils/types';

const MainContainer: React.FC<MainContainerPropsType> = ({ children }) => (
  <main>{children}</main>
);

export default MainContainer;
