import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const allowedRoutes = ['/ohbo/:path', '/']; // Allow login and home pages without authentication

  

});