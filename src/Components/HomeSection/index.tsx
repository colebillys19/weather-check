interface HomeSectionPropsType {
  children: React.ReactNode;
}

const HomeSection: React.FC<HomeSectionPropsType> = ({ children }) => (
  <div style={{ position: 'relative' }}>{children}</div>
);

export default HomeSection;
