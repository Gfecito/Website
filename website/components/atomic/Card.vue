<template>
  <div
    class="max-w-full mx-auto bg-white bg-opacity-40 shadow-lg rounded-lg overflow-hidden flex h-max mb-5"
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

<style scoped></style>
