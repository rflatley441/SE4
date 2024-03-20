<template>
  <div class="faq">
    <header class = "header">
      <h1>Frequently Asked Questions</h1>
    </header>
  
    <div v-for="(faq, index) in faqItems" :key="index">
      <p class="question" @click="toggleAnswer(index)">
        {{ faq.q }}
        <span class="toggleIcon">
          {{ isOpen[index] ? "—" : "＋" }}
        </span>
      </p>
      <p class="answer" :style="{ height: isOpen[index] ? 'auto' : 0 }"
        v-html="faq.a">
      </p>
    </div>
    <header class="footer">
      <h1>Thank You for Playing Qwirkle!</h1>
    </header>

  </div>    
  <div class="tiles-container">
      <Star8ptTile id="starTile" fillColor="yellow" />
      <CircleTile id="circleTile" fillColor="blue" />
      <CloverTile id="cloverTile" fillColor="green" />
      <DiamondTile id="diamondTile" fillColor="red" />
    </div>
</template>

<script>
import { ref } from 'vue';

import Star8ptTile from '@/assets/Star8ptTile.vue';
import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';
import DiamondTile from '@/assets/DiamondTile.vue';

export default {
  name: "FAQView",
  setup() {
    const faqItems = [
      {
        q: "What is Qwirkle?",
        a: "Qwirkle combines the game play of Dominoes and Scrabble and is <br>the perfect combination of skill and chance!",
      },
      {
        q: "How do I play?",
        a: "On your turn you can do one of three things: <br>1) Add one tile to the grid, then draw a tile to bring your hand up to six. <br>2) Add two or more tiles to the grid. All touching tiles must share color or shape. <br>3) Trade some or all tiles in for different tiles.",
      },
      {
        q: "What happens when there are no tiles left?",
        a: "When there are no more tiles left, play continues as before, but <br>players do not replenish their hand until the end of their turn. The<br> game ends when the last player uses their last tile.",
      },
      {
        q: "When does someone win?",
        a: "The first player to use all their tiles receives a 6 point bonus and then score is calculated!",
      },
    ];
    
    const isOpen = ref(Array.from({ length: faqItems.length }, () => false));

    const toggleAnswer = (index) => {
      isOpen.value[index] = !isOpen.value[index];
    };

    return {
      faqItems,
      isOpen,
      toggleAnswer
    };
  },
  components: {
        Star8ptTile, CircleTile, CloverTile, DiamondTile
  }
};
</script>


<style scoped>
/* css */ /* basic styles  */
* {
  font-size:1.1em;
  box-sizing: border-box;
  font-family: system-ui;
}

#starTile {
    position: absolute;
    left: -70px;
    top: 450px;
}
#circleTile {
    position: absolute;
    right: -90px;
    top: 200px;
}
#cloverTile {
  position: absolute;
  right:0px;
}
#diamondTile {
  position: absolute;
  left: 350px;
  bottom: 0px;
}

body {
  padding: 30px 20px;
  max-width: 600px;
  width: 70%;
  margin: auto;
}

.header { 
  font-size:2em;
  text-align: center;
  padding: 20px 0;
}

.footer { 
  font-size:2em;
  text-align: center;
  padding: 5px 0;
}

#app {
  font-family: system-ui;
  text-align: left;
  color: #47502c;
  font-size: 1em;
  padding: 20px 0px;
}

::selection {
  user-select: none;
}

/* style the FAQ section */


.faq {
  justify-content: center; /* Center items horizontally */
  flex-direction: column; /* Stack items vertically */
}

.question {
  max-width: 1000px;
  background: #b3daff;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 0px 0 #1b050555;
  padding: 10px 0;
  transition: transform 0.2s;
  position: relative;
  margin: 0 auto;
  margin-bottom: 30px; /* Add some margin between FAQ items */
}

.question:hover {
  background: hsla(210, 41%, 55%, 0.464);
}

.question::before {
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
  letter-spacing: 0.30px;
}

.answer::before {
  content: "⭐";
  margin-right: 10px;
}

/* style the toggleIcon + and - on the boxes*/
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
