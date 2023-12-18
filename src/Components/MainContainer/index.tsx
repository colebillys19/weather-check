interface MainContainerPropsType {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerPropsType> = ({ children }) => (
  <main>{children}</main>
);

export default MainContainer;
