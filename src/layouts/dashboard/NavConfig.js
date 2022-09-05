// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={33} height={33} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'stores',
    path: '/dashboard/stores',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'tickets',
    path: '/dashboard/tickets',
    icon: getIcon('fontisto:ticket-alt'),
  }
];

export default navConfig;
