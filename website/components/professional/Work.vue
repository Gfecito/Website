<template>
  <div class="work p-8">
    <h2 class="text-2xl font-bold">Employment</h2>
    <div class="mt-4">
      <Card
        v-for="(position, index) in data.positions"
        :key="index"
        :image="position.image"
        :title="position.title"
        :isImageOnLeft="index % 2 === 0"
      >
        <section class="description" :class="textAlignment(index % 2 === 0)">
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
                <li class="" v-for="(item, index) in item.list" :key="index">
                  {{ item }}
                </li>
              </ul>
            </template>
          </div>
        </section>
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
  computed: {
    textAlignment() {
      return (isPair) => (isPair ? "right" : "left");
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
  margin-left: 10em;
}

.left {
  margin-right: 10em;
}
</style>
