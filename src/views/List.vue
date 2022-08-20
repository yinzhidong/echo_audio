<template>
  <div class="">
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <!--Card 1-->
      <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="@/assets/images/card_1.jpeg" alt="Mountain" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">开言英语</div>
          <p class="text-gray-700 text-base">
            英语频道，中英文串讲，但英文为主。内容很结地气，而且有老外的言传身教，教的内容也非常贴近日常生活，是学习美式英语的好节目
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
            @click="goto('kyeng')"
            >View</span
          >
        </div>
      </div>

      <!--Card 2-->
      <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="@/assets/images/card_2.jpg" alt="River" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">字谈字畅</div>
          <p class="text-gray-700 text-base">
            涉及中文世界和西方世界，字体、排印、设计有关，不管设计师还是工程师都可以来听听
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
          @click="goto('ztzc')"
            >View</span
          >
        </div>
      </div>

      <!--Card 3-->
      <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="@/assets/images/card_3.jpg" alt="Forest" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">山丘电台</div>
          <p class="text-gray-700 text-base">
            这是一个送个小白的电台，希望她开心一点，每天晚上睡个好觉
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
          @click="goto('xbradio')"
            >View</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'list',
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);

    const goto = tag => {
      router.push({ name: 'Channel', params: { channelId: tag } });
    };

    return { email, goto };
  }
};
</script>
