<template>
  <div>hello</div>
</template>

<script>
import { createApp } from 'vue';

// javascript
const app = createApp({
  data() {
    return {
      faqItems: [
        {
          q: "What is Qwirkle?",
          a:
            "Qwirkle combines the game play of Dominoes and Scarbble and is the perfect combination of skill and chance!"
        },
        {
          q: "How do I play?",
          a:
            "On your turn you can do one of three things: 1) Add one tile to the grid, then draw a tile to bring your hand up to six. 2) Add two or more tiles to the grid. All touching tiles must share color or shape. 3) Trade some or all tiles in for different tiles."
        },
        {
          q: "When does someone win?",
          a:
            "The first player to use all their tiles recieves a 6 point bonus and then score is calculated!"
        }
      ]
    };
  }
});

app.component("faq-question", {
  template: `
  <div class="faq">
    <p class="question" @click="toggleAnswer">
      {{ faq.q }}
       <span class="toggleIcon">
         {{ this.isOpen ? "—" : "＋" }}
       </span>
    </p>
    <p class="answer" ref="answer">
      {{ faq.a }}
    </p>
  </div>
  `,
  // faq prop is passed down from app in each iteration
  props: ["faq"],
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleAnswer() {
      // collapse if open, expand if not.
      if (this.isOpen) {
        this.collapse();
      } else {
        this.expand();
      }
      this.isOpen = !this.isOpen;
    },
    collapse() {
      // select the answer element
      const answer = this.$refs.answer;
      answer.style.height = 0; // set its height to 0
    },
    expand() {
      // select answer element
      const answer = this.$refs.answer;

      // set its height to its normal scroll height to expand it fully
      answer.style.height = answer.scrollHeight + "px";
    }
  }

});
app.mount("#app");

</script>

<style scoped>
/* css *//* basic styles  */
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
  height: 0; /* starts collapsed */
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
