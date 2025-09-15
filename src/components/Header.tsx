type HeaderProps = {
  count: number;
};

function Header({ count }: HeaderProps) {
  return (
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
      To-Do List ({count})
    </h1>
  );
}

export default Header;