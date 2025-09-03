import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (to.fullPath === "/") {
    return navigateTo("/main", { redirectCode: 301 })
  }

});