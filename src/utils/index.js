import { addListener, launch, stop } from 'devtools-detector';


const getRandomIndex = (n, m) => {
  return Math.floor(Math.random() * (m - n)) + n;
};

const getRandomItem = (arr) => {
  return arr[getRandomIndex(0, arr.length)];
}

const getRibbonRandomItem = (arr, index) => {
  return arr[index % arr.length];
}


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


export {
  getRandomIndex,
  getRandomItem,
  getRibbonRandomItem,
  listenerConsole,
}