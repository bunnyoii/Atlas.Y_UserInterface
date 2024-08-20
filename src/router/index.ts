import {createRouter, createWebHistory} from 'vue-router/auto'
import {Router, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/basic-designer'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {title: 'Atlas.Y - Not Found'}
  },
  {
    path: '/basic-designer',
    component: () => import('@/pages/BasicDesignerPage.vue'),
    meta: {title: 'Atlas.Y - Basic Designer'}
  },
  {
    path: '/dynamic-designer',
    component: () => import('@/pages/DynamicDesignerPage.vue'),
    meta: {title: 'Atlas.Y - Dynamic Designer'}
  },
  {
    path: '/introduction',
    component: () => import('@/pages/IntroductionPage.vue'),
    meta: {title: 'Atlas.Y - Introduction'}
  },
  {
    path: '/user-guide',
    component: () => import('@/pages/UserGuidePage.vue'),
    meta: {title: 'Atlas.Y - User Guide'}
  },
  {
    path: '/technical-resources',
    component: () => import('@/pages/TechnicalResourcesPage.vue'),
    meta: {title: 'Atlas.Y - Technical Resources'}
  },
  {
    path: '/team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: {title: 'Atlas.Y - Team'}
  },
  {
    path: '/wiki',
    component: () => import('@/pages/WikiPage.vue'),
    meta: {title: 'Atlas.Y - Wiki'}
  },
  {
    path: '/contact-us',
    component: () => import('@/pages/ContactUsPage.vue'),
    meta: {title: 'Atlas.Y - Contact Us'}
  },
  {
    path: '/feedback',
    component: () => import('@/pages/FeedbackPage.vue'),
    meta: {title: 'Atlas.Y - Feedback'}
  }
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'Atlas.Y'
  }
  next()
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router