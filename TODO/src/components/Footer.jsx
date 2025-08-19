function Footer({ isDarkMode }) {
  return (
    <div className={`text-center mt-6 sm:mt-8 text-xs sm:text-sm ${
      isDarkMode ? 'text-gray-300' : 'text-gray-500'
    }`}>
      <p>TODO App 🚀</p>
    </div>
  );
}
export default Footer;