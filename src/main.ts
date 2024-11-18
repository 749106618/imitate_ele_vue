import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const rootValue = 37.5 // 根元素字体大小
const rootWidth = 375
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize =
  (deviceWidth * rootValue) / rootWidth + 'px'

// 1. 引入vant组件
import {
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Loading,
  Skeleton,
  Tabs,
  Tab,
  Sticky,
  NavBar,
  Form,
  CellGroup,
  Field,
  Button,
} from 'vant'
// 2. 引入vant样式
import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)
app.use(Tabs)
app.use(Tab)
app.use(Sticky)
app.use(NavBar)
app.use(Form)
app.use(CellGroup)
app.use(Field)
app.use(Button)

app.mount('#app')
