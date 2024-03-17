  import { notification } from "ant-design-vue/lib";
  import self from "../plugins/global.js";
  export default function ({ $auth, route, redirect }) {

    const alumniOutsideRoutes = ['/', 'register', '/login'];

    const token = localStorage.getItem('auth._token.local');

    if(token && token !== 'false') {
      const bearer = token.split(' ')[1];
      const global = self.methods;
      const isExpired = global.checkToken(bearer);
      if(isExpired) {
        $auth.logout();
        location.href = '/login';
      }
    } else if(token === 'false' && (route.path.includes('/app') || route.path.includes('/alumni'))) {
      redirect('/login');
    }

    if($auth.loggedIn) {
      if($auth.user.accountType === 'ALUMNI' && (alumniOutsideRoutes.includes(route.path) || route.path.includes('/app'))) {
        redirect('/alumni');
      } else if($auth.user.accountType === 'ADMIN' && !route.path.includes('/app')) {
        redirect('/app');
      }
    } else if(!$auth.loggedIn && (route.path.includes('/app') || route.path.includes('/alumni'))) {
      redirect('/login');
    }
  }
