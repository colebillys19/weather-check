interface HomeSectionPropsType {
  children: React.ReactNode;
}

const HomeSection: React.FC<HomeSectionPropsType> = ({ children }) => (
  <div>{children}</div>
);

export default HomeSection;
