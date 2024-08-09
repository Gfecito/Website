<template>
  <div class="work p-8">
    <h2 class="text-2xl font-bold">Employment</h2>
    <div class="mt-4">
      <Card
        v-for="(position, index) in data.positions"
        :key="index"
        :class="cardSideClass(index)"
      >
        <template v-slot:first>
          <div class="image_container flex-shrink-0">
            <img
              :src="position.image"
              :alt="position.title"
              :class="[imageSideClass(index), 'object-cover h-full']"
            />
          </div>
        </template>
        <template v-slot:second>
          <div class="p-4 mr-8 w-full">
            <div :class="[contentSideClass(index), 'mt-2']">
              <h3 class="text-xl font-semibold">{{ title }}</h3>
              <section class="description" :class="textAlignment(index)">
                <!-- Need to make this more sophisticated. Add lists and paragraph support as we do for vlogs -->
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
                      <li
                        class=""
                        v-for="(item, index) in item.list"
                        :key="index"
                      >
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
  methods: {
    textAlignment(index) {
      return this.isImageOnLeft(index) ? "right" : "left";
    },
    cardSideClass(index) {
      return this.isImageOnLeft(index) ? "flex-row" : "flex-row-reverse";
    },
    imageSideClass(index) {
      return this.isImageOnLeft(index) ? "float-right" : "float-left";
    },
    contentSideClass(index) {
      return this.isImageOnLeft(index) ? "float-left" : "float-right";
    },
    isImageOnLeft(index) {
      return index % 2 === 0;
    },
  },
};
</script>

<style scoped>
.description {
  font-weight: 400;
}

li {
  font-weight: 500;
  list-style-type: disc;
  margin-left: 30px;
}

.work {
  max-width: 80%;
  margin: auto;
}

.description {
  max-width: 50em;
  text-align: justify;
}

.right {
  margin-left: 5%;
}

.left {
  margin-right: 5%;
}

.image_container {
  width: 20%;
  height: 100%;
}
</style>
