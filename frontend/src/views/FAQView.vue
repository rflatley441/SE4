<template>
  <div id="app">
    <NavBar/>
    <div class="content">
      <header class = "header">
        <h1 style="font-size: 60px">Frequently Asked Questions</h1>
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

  </div>    
</template>

<script>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

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
      NavBar
  }
};
</script>


<style scoped>
/* css */ /* basic styles  */
* {
  font-size:1.1em;
  box-sizing: border-box;
}

.content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 90px;
    box-sizing: border-box;
    background-color: #FDF5E6;
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
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
    background-color: #FDF5E6;
}

::selection {
  user-select: none;
}

/* style the FAQ section */

.question {
  max-width: 900px;
  background: #e5b2e5;
  cursor: pointer;
  font-weight: 600;
  font-size: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 10px 0;
  transition: transform 0.2s;
  border-radius: 10px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 30px; /* Add some margin between FAQ items */
}

.question:hover {
  background: #f2d8f2;
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
  top: 50%;
  transform: translateY(-50%); 
  line-height: 0.5;
  color: #353839;
}
</style>
