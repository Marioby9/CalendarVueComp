import './assets/styles.css'

import { createApp } from 'vue'
import App from '@/App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faChevronLeft, faChevronRight, faPlus} from '@fortawesome/free-solid-svg-icons'
library.add( faChevronLeft, faChevronRight, faPlus )

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')