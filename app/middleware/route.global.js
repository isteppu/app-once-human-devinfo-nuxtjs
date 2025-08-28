import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const allowedRoutes = ['/ohbo/:path', '/']; 

  if (to.fullPath === "/") {
    return navigateTo("/main", { redirectCode: 301 })
  } 

  else if (to.fullPath === "/ohbo/:path" && !userStore.isLoggedIn){
    return navigateTo("/ohbo", { redirectCode: 301 })
  }

});