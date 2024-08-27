<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="flex justify-center">
      <a
        class="link spacious hover:bg-pink-600"
        href="https://github.com/Gfecito"
        target="_blank"
      >
        <img
          src="~/assets/githubIcon.svg"
          alt="Icon 1"
          class="icon-image mr-auto ml-auto rounded-lg"
        />
      </a>
      <a
        class="link hover:bg-pink-600"
        href="https://www.linkedin.com/in/santiago-gomez-maqueo-anaya/"
        target="_blank"
      >
        <img
          src="~/assets/linkedinIcon.svg"
          alt="Icon 2"
          class="icon-image mr-auto ml-auto rounded-lg"
        />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999; /* Adjust the z-index as needed */
}

.spacious {
  margin-right: 30%;
}

.link {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.icon-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: auto;
  margin-top: 0.25rem;
}
</style>
