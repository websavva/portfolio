export const useSidebarToggler = () => {
  const $ua = useUa();

  const isSidebarOpen = useState(
    'isSidebarOpen',
    () => $ua.isDesktop,
  );

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };

  const openSidebar = () => {
    isSidebarOpen.value = true;
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
};
