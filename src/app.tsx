import { history } from "umi"
// 导航守卫
const whiteArr = ["/login", "403", "404", "/chat"]
export function onRouteChange({ matchedRoutes, location }: any) {
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
  // // 首页重定向到/postskill
  if (location.pathname === "/") {
    history.replace("/study")
  }
}