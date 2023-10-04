import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../view/page/login/Login.vue')
    },
      {
        path: '/register',
        name: 'register',
        component: () => import('../view/page/register/Register.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: ()=> import('../view/page/home/Home.vue')
      },
      {
        path: '/hosts',
        name: 'hosts',
        component: ()=> import('../view/page/host/Host.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: ()=> import('../view/page/settings/Settings.vue')
      },
      {
        path: '/script',
        name: 'script',
        component: ()=> import('../view/page/scripts/Scripts.vue')
      },
      {
        path: '/chat',
        name: 'chat',
        component: ()=> import('../view/page/chat/Chat.vue')
      },
      {
        path: '/chat/:id',
        name: 'conversations',
        component: ()=> import('../view/page/conversations/Conversations.vue'),
        props: true
      },
      {
      path: '/app',
      name: 'app',
      component: ()=> import('../view/page/app/App.vue')
      },
      {
        path: '/whatsapphome',
        name: 'whatsapphome',
        component: ()=> import('../view/page/app/tabs/WhatsappHome.vue'),
      },
      {
        path: '/whatsappbot',
        name: 'whatsappbot',
        component: ()=> import('../view/page/app/tabs/WhatsappBot.vue'),
      },
      {
        path: '/whatsappchat',
        name: 'whatsappchat',
        component: ()=> import('../view/page/app/tabs/WhatsappChat.vue'),
      },
      {
        path: '/whatsappsettings',
        name: 'whatsappSettings',
        component: ()=> import('../view/page/app/tabs/WhatsappSettings.vue'),
      },
      {
        path: '/codemaker',
        name: 'codemaker',
        component: ()=> import('../view/page/codeMaker/CodeMaker.vue'),
      },
      {
        path: '/codejava',
        name: 'codejava',
        component: ()=> import('../view/page/codeMaker/codeMakerJava/Java.vue'),
      },
      {
        path: '/invite',
        name: 'invite',
        component: ()=> import('../view/page/invite/Invite.vue'),
      },
      {
        path: '/pagamento',
        name: 'pagamento',
        component: ()=> import('../view/page/payment/Payment.vue'),
      },
      {
        path: '/password',
        name: 'password',
        component: ()=> import('../view/page/SenhaRecover/SenhaRecover.vue'),
      },
      {
        path: '/javacodebox/:id',
        name: 'javacodebox',
        props: true,
        component: ()=> import('../view/page/codeMaker/codeMakerJava/JavaChat.vue'),
      },
   
      {
        path: '/jobs/:id',
        name: 'JobDetails',
        // component: JobDetails,
        props: true
      },
     
      
  ]
});

router.beforeResolve((to, from, next)=>{
  if(to.name){
    nProgress.start();
  }
  next();
})  

router.afterEach((to, from)=>{
  nProgress.done();
})

export default router
