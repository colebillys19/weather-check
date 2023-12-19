import { FC, ReactNode } from 'react';

interface MainContainerPropsType {
  children: ReactNode;
}

const MainContainer: FC<MainContainerPropsType> = ({ children }) => (
  <main>{children}</main>
);

export default MainContainer;
