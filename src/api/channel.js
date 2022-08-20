
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
  getList,
}