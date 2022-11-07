<template>
  <router-view />
  <div
    :class="blur ? 'overflow-x-hidden overflow-y-hidden' : ''"
    @click="goBack"
  >
    <div :class="blur ? 'blur-sm scale-[1.01] h-screen' : 'h-screen'">
      <div id="get-started" class="h-4/5">
        <nav class="text-white flex px-16 justify-between pt-7">
          <p class="text-[#DDCCAA] font-medium">MOVIE QUOTES</p>
          <div class="flex items-center space-x-4">
            <div class="pr-6">
              <div
                @click="setShowLocale"
                class="flex items-center space-x-1 hover:cursor-crosshair w-10"
              >
                <p>{{ upperFirst(locale) }}</p>
                <DropDown />
              </div>
              <ul v-if="showLocale" class="absolute">
                <li @click="setLocale('en')" class="hover:cursor-default">
                  En
                </li>
                <li @click="setLocale('ka')" class="hover:cursor-default">
                  Ka
                </li>
              </ul>
            </div>
            <RouterLink to="/signup">
              <BaseButton
                @click="stopPropagation"
                text="Sign Up"
                class="bg-[#E31221] border-[#E31221] border w-[109px] h-10"
              />
            </RouterLink>
            <RouterLink to="/login">
              <BaseButton
                @click="stopPropagation"
                text="Log In"
                class="border-white border w-[109px] h-10"
              />
            </RouterLink>
          </div>
        </nav>
        <div class="flex justify-center items-center flex-col gap-7 mt-60">
          <h1
            class="text-[#DDCCAA] font-bold text-[60px] font-montserrat max-w-[703px] text-center"
          >
            Find any quote in millions of movie lines
          </h1>
          <BaseButton
            class="bg-[#E31221] border-[#E31221]"
            text="Get started"
          />
        </div>
      </div>

      <LandingImage
        image="interstellar"
        quote="“You have to leave somethig 
behind to go forward”"
        movie="Interstellar, 2014"
      />
      <LandingImage
        image="royal"
        quote="“I think we're just gonna have
to be secretly in love with earch other
and leave it that”"
        movie="The Royal Tenenbaums,2001 "
      />
      <LandingImage
        image="lotr"
        quote="“You shall not pass”"
        movie="The Lord of the Rings: The Fellowship of the Ring,2001 "
      />
      <div class="bg-[#181623] text-[#DDCCAA]">
        <p class="py-4 px-16">© 2022 movie quotes. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import DropDown from "@/components/icons/landing-page/DropDown.vue";
import LandingImage from "@/components/landing/LandingImage.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, provide } from "vue";

const route = useRoute();
const router = useRouter();

const locale = ref("en");
const showLocale = ref(false);
const blur = ref(false);
provide("blur", blur);

const setShowLocale = () => {
  showLocale.value = !showLocale.value;
};
const setLocale = (value) => {
  locale.value = value;
  setShowLocale();
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

const goBack = () => {
  blur.value = false;
  router.push("/");
};

const upperFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
onMounted(() => {
  if (route.fullPath.length > 1) {
    blur.value = true;
    console.log(route.fullPath);
  }
});
</script>

<style scoped>
#get-started {
  background: linear-gradient(#11101a 100%, #08080d 100%, #000000 0%);
}
</style>
