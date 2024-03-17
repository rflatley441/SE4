<template>
  <div id="app">
      <div id="content">
          <div id="faq-title">Frequently Asked Questions</div>
          <div class="faq-item">
              <div class="question">What is Qwirkle?</div>
              <div class="answer">
                  Qwirkle combines the game play of Dominoes and Scrabble and is the perfect combination of skill and chance!
              </div>
          </div>
          <div class="faq-item">
              <div class="question">How do I play?</div>
              <div class="answer">
                  On your turn you can do one of three things: 
                  <ol>
                      <li>Add one tile to the grid, then draw a tile to bring your hand up to six.</li>
                      <li>Add two or more tiles to the grid. All touching tiles must share color or shape.</li>
                      <li>Trade some or all tiles in for different tiles.</li>
                  </ol>
              </div>
          </div>
          <div class="faq-item">
              <div class="question">When does someone win?</div>
              <div class="answer">
                  The first player to use all their tiles receives a 6 point bonus and then score is calculated!
              </div>
          </div>
          <button class="back-to-top-button">
              BACK TO TOP
          </button>
          <DiamondTile id="diamondTile" fillColor="green" />
          <CircleTile id="circleTile" fillColor="red" />
          <CloverTile id="cloverTile" fillColor="orange" />
      </div>
  </div>
</template>


<script>
import { createApp } from "vue";

const app = createApp({
  data() {
    return {
      faqItems: [
        {
          q: "What is Qwirkle?",
          a: "Qwirkle combines the game play of Dominoes and Scrabble and is the perfect combination of skill and chance!",
        },
        {
          q: "How do I play?",
          a: "On your turn you can do one of three things: 1) Add one tile to the grid, then draw a tile to bring your hand up to six. 2) Add two or more tiles to the grid. All touching tiles must share color or shape. 3) Trade some or all tiles in for different tiles.",
        },
        {
          q: "When does someone win?",
          a: "The first player to use all their tiles receives a 6 point bonus and then score is calculated!",
        },
      ],
    };
  },
});

app.component("faq-question", {
  template: `
    <div class="faq">
      <p class="question" @click="toggleAnswer">
        {{ faq.q }}
        <span class="toggleIcon">
          {{ isOpen ? "—" : "＋" }}
        </span>
      </p>
      <p class="answer" :style="{ height: isOpen ? 'auto' : 0px }">
        {{ faq.a }}
      </p>
    </div>
  `,
  props: ["faq"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAnswer() {
      this.isOpen = !this.isOpen;
    },
  }
});

app.mount("#app");
</script>

<style scoped>
/* css */ /* basic styles  */
* {
  box-sizing: border-box;
  font-family: system-ui;
}

body {
  padding: 30px 20px;
  max-width: 600px;
  width: 70%;
  margin: auto;
}

#app {
  font-family: system-ui;
  text-align: left;
  color: #2c3e50;
  font-size: 1em;
  padding: 20px 0px;
}

::selection {
  user-select: none;
}

/* style the FAQ section */
.question {
  background: hsl(35 10% 30% / 0.1);
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 0px 0 #88888855;
  padding: 10px 0;
  transition: transform 0.2s;
  position: relative;
}

.question:hover {
  background: hsl(35 10% 30% / 0.15);
}

.question::before {
  content: "✅";
  margin: 10px;
}

/* styles when the question is clicked */
.question:active {
  transform: translateY(4px);
  box-shadow: none;
}

.answer {
  transition: 0.25s; /* smooth slide-in */
  overflow: hidden;
  line-height: 1.5;
}

.answer::before {
  content: "👉";
  margin-right: 10px;
}

/* style the toggleIcon */
.toggleIcon {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  right: 20px;
  display: inline-block;
  line-height: 0.5;
  color: #666;
}
</style>
