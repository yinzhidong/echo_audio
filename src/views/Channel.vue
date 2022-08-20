<template>
  <div class="channels">
    <div v-if="errorMsg" class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <div class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-pink-400">{{ errorMsg }}</p>
      </div>
    </div>

    <div v-if="!errorMsg" class="grid place-items-center min-h-screen">
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <!-- CARD 1 -->
        <div class="bg-gray-900 shadow-lg rounded p-3" v-for="(item, index) in itemList" :key="index">
          <div class="group relative">
            <img class="w-full md:w-72 block rounded" :src="item.bgUrl" alt=""/>
            <div
              class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
            >
              <!-- <button
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path
                  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </button> -->

              <button
                width="40"
                height="40"
                class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                @click="playItem(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-play-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                  />
                </svg>
              </button>

              <!-- <button
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                />
              </svg>
            </button> -->
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-white text-lg">{{ item.title }}</h3>
            <p class="text-gray-400">Echo</p>
          </div>
        </div>
        <!-- END OF CARD 1 -->
      </section>

      <!-- <audio @src="audioSrc" controls ref="echoaudio"></audio> -->
      <div id="player" style="display:none;"></div>
    </div>
  </div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import { ref, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
// useRouter
// import store from "../store/index";
// import { uid } from "uid";

import img1 from '@/assets/images/Tycho_-_Epoch.jpg'
import img2 from '@/assets/images/Tycho_-_Awake.png'
import img3 from '@/assets/images/Dive_tycho_album.jpg'

const bgList = [
  img1,img2,img3
];

const getIndex = (n, m) => {
  return Math.floor(Math.random() * (m - n)) + n;
};

const channelIds = ['kyeng', 'ztzc', 'xbradio'];

export default {
  name: 'view-workout',
  setup() {
    // Create data / vars
    const errorMsg = ref(null);
    const itemList = ref([]);

    // 获取vue的实例
    const { proxy } = getCurrentInstance();

    const aplayerState = reactive({
      instance: null
    });

    const route = useRoute();
    // const router = useRouter();
    // const user = computed(() => store.state.user);

    // Get current Id of route
    const currentId = route.params.channelId;
    // console.log(currentId);
    if (!currentId || !channelIds.includes(currentId)) {
      errorMsg.value = `页面404了 😄`;
    }

    // 获取列表
    const getItemList = async currentId => {
      let data = await proxy.BKAPI.getList(currentId);
      if (data && data?.data) {
        itemList.value = data.data.map(item => {
          return {
            ...item,
            bgUrl: `${bgList[getIndex(0, bgList.length)]}`
          };
        });
      }
    };

    // 播放
    const playItem = async index => {
      // console.log(index);
      // aplayerState.instance.skipForward();
      if (index === aplayerState.instance.list.index) {
        return;
      }
      // this.list.switch(this.nextIndex());
      aplayerState.instance.list.switch(index);
      await aplayerState.instance.play();
    };

    // 初始化播放器
    const initAplayer = async currentId => {
      await getItemList(currentId);
      let audioList = itemList.value.map(it => {
        return {
          url: it.audioUrl,
          theme: '#ebd0c2'
        };
      });
      // console.log('getItemList===', audioList);

      aplayerState.instance = new APlayer({
        container: document.getElementById('player'),
        mini: true,
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: 90,
        audio: audioList
      });
    };

    onMounted(() => {
      !errorMsg.value && initAplayer(currentId);
    });

    onUnmounted(() => {
      aplayerState.instance && aplayerState.instance.destroy();
    });

    return {
      playItem,
      itemList,
      errorMsg
    };
  }
};

// https://mdbootstrap.com/img/new/standard/nature/191.jpg
</script>

<style scoped>
button {
  outline: none;
}
</style>
