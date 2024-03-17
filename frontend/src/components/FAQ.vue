<template>
  <!-- html -->
  <div id="faq-page">

  </div>
</template>

<script>


export default {
  name: "FAQPage",

  data() {
    return {
      faqItems: [
        {
          q: "What is Qwirkle?",
          a:
            "Qwirkle combines the game play of Dominoes and Scrabble and is the perfect combination of skill and chance!",
        },
        {
          q: "How do I play?",
          a:
            "On your turn you can do one of three things: 1) Add one tile to the grid, then draw a tile to bring your hand up to six. 2) Add two or more tiles to the grid. All touching tiles must share color or shape. 3) Trade some or all tiles in for different tiles.",
        },
        {
          q: "When does someone win?",
          a:
            "The first player to use all their tiles recieves a 6 point bonus and then score is calculated!",
        },
      ],
      isOpen: new Array(3).fill(false), // Array to track whether each answer is open or closed
    };
  },
  methods: {
    toggleAnswer(index) {
      // Toggle the answer for the given index
      this.$set(this.isOpen, index, !this.isOpen[index]);
    },
  },
};
</script>

<style scoped>
/* CSS */

#faq-page {
  font-family: system-ui;
  text-align: left;
  color: #2c3e50;
}

.faq {
  margin-bottom: 20px;
}

.question {
  background: hsl(35 10% 30% / 0.1);
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 0px 0 #88888855;
  padding: 10px 40px 10px 10px;
  transition: transform 0.2s;
  position: relative;
}

.question:hover {
  background: hsl(35 10% 30% / 0.15);
}

.question::before {
  content: "✅";
  margin-right: 10px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.question:active {
  transform: translateY(4px);
  box-shadow: none;
}

.answer {
  transition: height 0.25s; /* smooth slide-in */
  height: 0; /* starts collapsed */
  overflow: hidden;
  line-height: 1.5;
}

.answer::before {
  content: "👉";
  margin-right: 10px;
}

.toggleIcon {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}
</style>
