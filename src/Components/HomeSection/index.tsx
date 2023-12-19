import { FC, ReactNode } from 'react';

interface HomeSectionPropsType {
  children: ReactNode;
}

const HomeSection: FC<HomeSectionPropsType> = ({ children }) => (
  <div style={{ position: 'relative' }}>{children}</div>
);

export default HomeSection;
