function Header({ isDarkMode }) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Todo App
      </h1>
    </div>
  );
}
export default Header;