<template>
  <router-view />
  <div
    :class="blur ? 'overflow-x-hidden overflow-y-hidden h-screen' : 'h-screen'"
    @click="goBack"
  >
    <div :class="blur ? 'blur-sm scale-[1.01] h-screen' : 'h-screen'">
      <div id="get-started" class="h-4/5">
        <nav class="text-white flex px-16 justify-between pt-7">
          <p class="text-[#DDCCAA] font-medium">
            {{ $t("landing.movie_quotes") }}
          </p>
          <div class="flex items-center space-x-4">
            <div class="pr-6">
              <LanguageDropDown />
            </div>
            <BaseButton
              @click="signupClick"
              :text="$t('landing.sign_up')"
              class="bg-[#E31221] border-[#E31221] border w-[109px] hidden h-10 sm:flex"
            />
            <BaseButton
              @click="signinClick"
              :text="$t('landing.log_in')"
              class="border-white border w-[109px] h-10"
            />
          </div>
        </nav>
        <div class="flex justify-center items-center flex-col gap-7 mt-60">
          <h1
            class="text-[#DDCCAA] font-bold text-2xl sm:text-6xl sm:leading-[90px] font-montserrat max-w-[703px] text-center"
          >
            {{ $t("landing.find_any_quote") }}
          </h1>
          <BaseButton
            class="bg-[#E31221] border-[#E31221]"
            :text="$t('common.get_started')"
            @click="signinClick"
          />
        </div>
      </div>

      <LandingImage
        image="interstellar"
        :quote="$t('landing.movie_texts.interstellar_quote')"
        :movie="$t('landing.movie_texts.interstellar')"
      />
      <LandingImage
        image="royal"
        :quote="$t('landing.movie_texts.the_royal_tenenbaums_quote')"
        :movie="$t('landing.movie_texts.the_royal_tenenbaums')"
      />
      <LandingImage
        image="lotr"
        :quote="$t('landing.movie_texts.lotr_quote')"
        :movie="$t('landing.movie_texts.lotr')"
      />
      <div class="bg-[#181623] text-[#DDCCAA]">
        <p class="py-4 px-16">© {{ $t("landing.rights_reserved") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import LandingImage from "@/components/landing/LandingImage.vue";
import LanguageDropDown from "@/components/base/LanguageDropDown.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, provide } from "vue";

const route = useRoute();
const router = useRouter();

const blur = ref(false);
provide("blur", blur);

const goBack = () => {
  blur.value = false;
  router.push("/");
};

const signupClick = (e) => {
  router.push("/signup");
  blur.value = true;
  e.stopPropagation();
};

const signinClick = (e) => {
  router.push("/login");
  blur.value = true;
  e.stopPropagation();
};

onMounted(() => {
  if (route.fullPath.length > 1) {
    blur.value = true;
  }
});
</script>

<style scoped>
#get-started {
  background: linear-gradient(#11101a 100%, #08080d 100%, #000000 0%);
}
</style>
