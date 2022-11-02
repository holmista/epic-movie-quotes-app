<template>
  <SignupModal
    v-if="showSignup"
    class="left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  />
  <SigninModal
    v-if="showSignin"
    class="left-0 right-0 ml-auto mr-auto top-[150px] z-10"
  />
  <div
    :class="
      showSignup || showSignin ? 'overflow-x-hidden overflow-y-hidden' : ''
    "
    @click="setInactivity"
  >
    <div
      :class="
        showSignup || showSignin ? 'blur-sm scale-[1.01] h-screen' : 'h-screen'
      "
    >
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
            <RouterLink to="/login">
              <BaseButton
                @click="setShowSignup($event, true)"
                text="Sign Up"
                class="bg-[#E31221] border-[#E31221] border w-[109px] h-10"
              />
            </RouterLink>
            <BaseButton
              @click="setShowSignin($event, true)"
              text="Log In"
              class="border-white border w-[109px] h-10"
            />
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
import SignupModal from "./SignupModal.vue";
import SigninModal from "./SigninModal.vue";
import { ref } from "vue";

const locale = ref("en");
const showLocale = ref(false);
const showSignup = ref(false);
const showSignin = ref(false);

const setShowLocale = () => {
  showLocale.value = !showLocale.value;
};
const setLocale = (value) => {
  locale.value = value;
  setShowLocale();
};

const setShowSignup = (e, val) => {
  e.stopPropagation();
  showSignup.value = val;
};

const setShowSignin = (e, val) => {
  e.stopPropagation();
  console.log("signin clicked");
  showSignin.value = val;
  console.log(showSignin.value);
};

const setInactivity = () => {
  showSignup.value = false;
  showSignin.value = false;
};

const upperFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<style scoped>
#get-started {
  background: linear-gradient(#11101a 100%, #08080d 100%, #000000 0%);
}
</style>
