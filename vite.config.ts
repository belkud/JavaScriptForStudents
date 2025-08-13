import { resolve } from "path";

export default {
    base: '/JavaScriptForStudents/',
    build: {
      rollupOptions: {
        input: {
          // @ts-ignore
          main: resolve(__dirname, 'index.html'),
          // @ts-ignore
        //   chat: resolve(__dirname, 'chat.html'),
        }
      }
    }
  }