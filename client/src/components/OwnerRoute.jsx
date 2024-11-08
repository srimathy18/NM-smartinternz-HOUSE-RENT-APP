import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OwnerRoute() {
  const { currentUser } = useSelector((state) => {
    return state.user
  });
  //if there is current user then we wanted to show Outlet
  //otherwise we wanted user to navigate to sign-in page
  //Navigate is a component & useNavigate is a hook
  return currentUser.userType === "owner" ? <Outlet /> : <Navigate to='/' />;
}
