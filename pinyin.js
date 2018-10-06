const app = new Vue({
  el: '#app',
  data: {
    ShengMuList: [
      {text: 'b', voice: "./mp3/b的读音.mp3"},
      {text: 'p', voice: "./mp3/p的读音.mp3"},
      {text: 'm', voice: "./mp3/m的读音.mp3"},
      {text: 'f', voice: "./mp3/f的读音.mp3"},
      {text: 'y'},
      {text: 'w'}
    ],
    YunMuList: [
      [
        {text: "ā", key: "a1"},
        {text: "á", key: "a2"},
        {text: "ǎ", key: "a3"},
        {text: "à", key: "a4"}
      ],
      [
        {text: "ō", key: "o1"},
        {text: "ó", key: "o2"},
        {text: "ǒ", key: "o3"},
        {text: "ò", key: "o4"},
      ],
      [
        {text: "ē", key: "e1"},
        {text: "é", key: "e2"},
        {text: "ě", key: "e3"},
        {text: "è", key: "e4"}
      ],
      [
        {text: "ī", key: "i1"},
        {text: "í", key: "i2"},
        {text: "ǐ", key: "i3"},
        {text: "ì", key: "i4"}
      ],
      [{text: "ū", key: "u1"},
        {text: "ú", key: "u2"},
        {text: "ǔ", key: "u3"},
        {text: "ù", key: "u4"}
      ],
      [
        {text: "ǖ", key: "v1"},
        {text: "ǘ", key: "v2"},
        {text: "ǚ", key: "v3"},
        {text: "ǜ", key: "v4"}
      ]
    ],
    shengMu: null,
    yunMu: null,
    answerKey: "",
    correct: null,
    questionKey: null
  },
  methods: {
    onClickShengMu: (e) => {
      app.shengMu = e;
      app.yunMu = null;
      const audio = new Audio(e.voice);
      audio.play();
    },
    onClickYunMu: (e) => {
      app.yunMu = e;
      app.checkResult();
    },
    checkResult: function () {
      app.answerKey = app.shengMu.text + app.yunMu.key;

      app.playPinyin(app.answerKey);
      app.correct = app.answerKey === app.questionKey;

      if (app.correct) {
        setTimeout(() => {
          new Audio("./mp3/correct.mp3").play()
        }, 500);
      } else {
        new Audio("./mp3/incorrect.mp3").play()
      }
    },
    playPinyin: (key) => {
      const audio = new Audio(`https://ss2.bdstatic.com/9_QWbzqaKgAFnsKb8IqW0jdnxx1xbK/zhdict/mp3/${key}.mp3`);
      audio.play();
    },
    repeatAnswer: (e) => {
      app.playPinyin(app.answerKey);
    },
    repeatQuestion: () => {
      app.playPinyin(app.questionKey)
    },
    next: () => {
      app.shengMu = null;
      app.yunMu = null;
      app.correct = null;
      const shenMu = _.sample(app.ShengMuList).text;
      const yunMu = _.sample(_.sample(app.YunMuList)).key;
      const key = shenMu + yunMu;
      console.log(key)
      app.playPinyin(key)
      app.questionKey = key
    }
  },
  watch: {}
});