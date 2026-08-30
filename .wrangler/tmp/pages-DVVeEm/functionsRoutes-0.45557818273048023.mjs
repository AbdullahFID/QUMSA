import { onRequestGet as __api_admin_content_js_onRequestGet } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/content.js"
import { onRequestPut as __api_admin_content_js_onRequestPut } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/content.js"
import { onRequestPost as __api_admin_login_js_onRequestPost } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/login.js"
import { onRequestPost as __api_admin_logout_js_onRequestPost } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/logout.js"
import { onRequestGet as __api_admin_session_js_onRequestGet } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/session.js"
import { onRequestPost as __api_admin_upload_js_onRequestPost } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/upload.js"
import { onRequestGet as __api_prayer_times_js_onRequestGet } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/prayer-times.js"
import { onRequestGet as __api_quran_quotes_js_onRequestGet } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/quran-quotes.js"
import { onRequest as __api_admin__middleware_js_onRequest } from "/Users/abdullahaviator13/Desktop/101APSC/qumsa/functions/api/admin/_middleware.js"

export const routes = [
    {
      routePath: "/api/admin/content",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_content_js_onRequestGet],
    },
  {
      routePath: "/api/admin/content",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_content_js_onRequestPut],
    },
  {
      routePath: "/api/admin/login",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_login_js_onRequestPost],
    },
  {
      routePath: "/api/admin/logout",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_logout_js_onRequestPost],
    },
  {
      routePath: "/api/admin/session",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_session_js_onRequestGet],
    },
  {
      routePath: "/api/admin/upload",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_upload_js_onRequestPost],
    },
  {
      routePath: "/api/prayer-times",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_prayer_times_js_onRequestGet],
    },
  {
      routePath: "/api/quran-quotes",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_quran_quotes_js_onRequestGet],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api/admin",
      method: "",
      middlewares: [__api_admin__middleware_js_onRequest],
      modules: [],
    },
  ]