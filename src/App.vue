<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import { ref, nextTick } from 'vue';
import { addListener, launch, stop } from 'devtools-detector';
// import store from "./store/index";

const listenerConsole = () => {
  if (process.env.NODE_ENV === 'production') {
    // 禁用右键
    document.oncontextmenu = new Function('event.returnValue=false');
    // 禁用选择
    document.onselectstart = new Function('event.returnValue=false');
    //禁止f12
    document.οnkeydοwn = function(e) {
      if (e && e.keyCode === 123) {
        e.returnValue = false;
        return false;
      }
    };

    addListener(status => {
      // console.log('addListener status==', status);
      if (status) {
        // this.illegalAction('devtools');
        // setTimeout( () => (stop(), console.clear()), 100 );
        // while (true) {
        //   debugger;
        // }
        alert(`就是个小站点，抬抬手`);
        window.location.href = 'about:blank';
        window.close();
      }
    });

    launch();
  }
};

export default {
  components: {
    Navigation
  },
  setup() {
    nextTick(() => {
      listenerConsole();
    });

    // Create data / vars
    const appReady = ref(null);

    // Check to see if user is already logged in
    const user = null;

    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }

    return { appReady };
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
</style>
