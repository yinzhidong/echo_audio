<template>
  <div class="">
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <!--Card start-->
      <div class="rounded overflow-hidden shadow-lg" v-for="(item, index) in channleList" :key="index">
        <img class="w-full" :src="item.bgUrl" alt="Mountain" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{item.title}}</div>
          <p class="text-gray-700 text-base">
            {{item.desc}}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
            @click="goto(item.channel)"
            >View</span
          >
        </div>
      </div>
      <!--Card end-->
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { getRibbonRandomItem } from '../utils/index';

import img1 from '@/assets/images/card_1.jpg'
import img2 from '@/assets/images/card_2.jpg'
import img3 from '@/assets/images/card_3.jpg'

const bgList = [img1, img2, img3];

export default {
  name: 'list',
  setup() {
    // Create data / vars
    const router = useRouter();
    const channleList = ref([]);
    const {proxy} = getCurrentInstance();

    const goto = tag => {
      router.push({ name: 'Channel', params: { channelId: tag } });
    };


    onBeforeMount(() => {
      channleList.value = proxy.BKAPI.getChannelList().map((it, index) => {
        return {
          ...it,
          bgUrl: getRibbonRandomItem(bgList, index)
        }
      })
    });

    return { channleList, goto };
  }
};
</script>
