<template>
  <div class="awards-container">
    <h2 class="section-title">{{ data.title }}</h2>
    <Card>
      <template v-slot:first>
        <div class="awards-list">
          <ul class="awards-grid">
            <li
              v-for="(award, index) in data.awards"
              :key="index"
              class="award-item"
            >
              <div class="award-header">
                <img :src="award.image" alt="Trophy" class="award-icon" />
                <div>{{ award.title }}</div>
              </div>
              <div class="award-date">
                <span class="date-label">{{ data.dateLabel }}</span>
                {{ award.date }}
              </div>
              <div class="award-description">
                <p v-for="sentence in award.description" :key="sentence">
                  {{ sentence }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </Card>
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
};
</script>

<style scoped>
.awards-container {
  padding: 2rem;
  text-align: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.awards-list {
  margin-top: 1rem;
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0;
  list-style-type: none;
}

.award-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.award-header {
  display: flex;
  align-items: center;
  font-size: 1em;
}

.award-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}

.award-date {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: gray;
}

.date-label {
  font-weight: 600;
}

.award-description {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: gray;
  text-align: center;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .awards-container {
    padding: 2rem; /* Adjust padding for mobile */
    font-size: 0.75rem;
  }

  .awards-grid {
    grid-template-columns: 1fr 1fr; /* 2 columns on mobile */
  }

  .award-icon {
    width: 1.25em;
    height: 1.25em;
  }

  .award-date {
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: gray;
  }

  .award-description {
    font-size: 0.75em;
  }
}
</style>
