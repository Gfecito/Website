<template>
  <div class="work">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="cards-container">
      <Card
        v-for="(position, index) in data.positions"
        :key="index"
        :class="cardSideClass(index)"
      >
        <template v-slot:first>
          <div class="image_overlap">
            <div class="image_container">
              <img
                :src="position.image"
                :alt="position.title"
                :class="[imageSideClass(index), 'image-opacity']"
              />
            </div>
          </div>
        </template>
        <template v-slot:second>
          <div class="content">
            <div :class="[contentSideClass(index), 'content-text']">
              <h3 class="position-title">{{ position.title }}</h3>
              <section class="description" :class="textAlignment(index)">
                <div
                  class="pt-4"
                  v-for="(item, index) in position.description"
                  :key="index"
                >
                  <template v-if="item.paragraph">
                    <p>{{ item.paragraph }}</p>
                  </template>
                  <template v-else-if="item.list">
                    <ul>
                      <li v-for="(item, index) in item.list" :key="index">
                        {{ item }}
                      </li>
                    </ul>
                  </template>
                </div>
              </section>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    useHead({
      title: "Work",
      meta: [{ name: "description", content: "My work." }],
    });
  },
  methods: {
    textAlignment(index) {
      return this.isImageOnLeft(index) ? "right" : "left";
    },
    cardSideClass(index) {
      return this.isImageOnLeft(index) ? "flex-row" : "flex-row-reverse";
    },
    imageSideClass(index) {
      return this.isImageOnLeft(index)
        ? "float-right margin-right"
        : "float-left margin-left";
    },
    contentSideClass(index) {
      return this.isImageOnLeft(index) ? "float-left" : "float-right";
    },
    isImageOnLeft(index) {
      return index % 2 === 1;
    },
  },
};
</script>

<style scoped>
.work {
  max-width: 80%;
  margin: auto;
  padding: 2rem; /* Equivalent to Tailwind's `p-8` */
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.cards-container {
  margin-top: 1rem;
}

.content {
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
}

.position-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.description {
  font-weight: 400;
  max-width: 50em;
  text-align: justify;
  padding-bottom: 1rem;
}

li {
  font-weight: 500;
  list-style-type: disc;
  margin-left: 30px;
}

.right {
  margin-left: 5%;
}

.left {
  margin-right: 5%;
}

.image_container {
  width: 130%;
}

.image_overlap {
  max-width: 33%;
  height: 90%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.margin-left {
  margin-left: -25%;
}

.margin-right {
  margin-right: -5%;
}

.image-opacity {
  opacity: 0.7;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .work {
    max-width: 90%;
    margin: auto;
    padding: 0.5rem;
  }

  .description {
    text-align: left;
  }

  .image_container {
    width: 780%;
  }

  .image_overlap {
    max-width: 5%;
  }

  .cards-container {
    display: flex;
    flex-direction: column;
  }

  .margin-left {
    margin-left: -80%;
  }

  .margin-right {
    margin-right: -15%;
  }
}
</style>
