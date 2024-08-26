<template>
  <div
    class="max-w-full mx-auto glass-card shadow-lg rounded-lg overflow-hidden flex h-max mb-5"
  >
    <slot name="first"></slot>
    <div>
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.glass-card {
}

.glass-card::before,
.glass-card::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px; /* Width of the side borders */
}

.glass-card::before {
  left: 0;
}

.glass-card::after {
  right: 0;
}
</style>
