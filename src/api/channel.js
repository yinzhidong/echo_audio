const channelList = [
  {
    "title": "开言英语",
    "desc": "英语频道，中英文串讲，但英文为主。内容很结地气，而且有老外的言传身教，教的内容也非常贴近日常生活，是学习美式英语的好节目",
    "channel": "kyeng",
  },
  {
    "title": "字谈字畅",
    "desc": "涉及中文世界和西方世界，字体、排印、设计有关，不管设计师还是工程师都可以来听听",
    "channel": "ztzc",
  },
  {
    "title": "山丘电台",
    "desc": "这是一个送个小白的电台，希望她开心一点，每天晚上睡个好觉",
    "channel": "xbradio",
  },
];

const getChannelList = function () {
  return channelList;
}



const getList = async function(channel) {
  const url = 'https://mqsj7h.lafyun.com/bkList';
  const res = await this.axios.post(url,
    {
      channel
    }
  );
  // console.log(res);
  return res.data;
}

export {
  getChannelList,
  getList,
}