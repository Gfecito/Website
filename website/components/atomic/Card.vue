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
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    /* maximum opacity at the top */ rgba(255, 255, 255, 0.01)
      /* more transparency at the bottom */
  );
  backdrop-filter: blur(10px); /* Creates a glassy effect */
  position: relative; /* Required for positioning pseudo-elements */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px; /* Rounded corners only on top */
}

.glass-card::before,
.glass-card::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px; /* Width of the side borders */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.02)
  );
}

.glass-card::before {
  left: 0;
}

.glass-card::after {
  right: 0;
}
</style>
