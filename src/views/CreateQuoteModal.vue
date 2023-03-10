<template>
  <div
    id="parent"
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 overflow-y-auto"
    v-if="Object.keys(movie.value).length > 0"
  >
    <div
      class="min-h-[800px] w-[428px] bg-[#11101A] text-white sm:w-[650px] z-60 relative rounded-xl"
    >
      <div
        class="grid grid-cols-3 border-b-[1px] border-[#EFEFEF] h-20 items-center"
      >
        <div></div>
        <div class="flex justify-center text-xl ml-8 sm:text-2xl">
          <h1 class="">{{ $t("quote.add_quote") }}</h1>
        </div>
        <RouterLink :to="`/movie/${route.params.id}`">
          <div class="flex justify-end">
            <CrossIcon class="mr-8" />
          </div>
        </RouterLink>
      </div>
      <div class="flex items-center gap-4 text-xl px-8 py-2 mt-7">
        <img
          :src="authStore.avatar"
          class="h-[60px] w-[60px] rounded-full object-cover"
        />
        <p>{{ movie.value.user.name }}</p>
      </div>
      <div class="flex gap-6 px-8 mt-7">
        <img class="h-36 w-60 rounded-xl" :src="movie.value.avatar" />
        <aside class="flex flex-col gap-4">
          <p class="text-base text-[#DDCCAA] sm:text-xl">
            {{ movie.value.title[localeStore.locale] }} ({{
              movie.value.release_year
            }})
          </p>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="category in movie.value.categories"
              :key="category.id"
              class="bg-[#6C757D] h-7 flex justify-center p-1 items-center w-fit rounded text-xs sm:text-base sm:p-2"
            >
              <p>
                {{ category.name[localeStore.locale] }}
              </p>
            </div>
          </div>
          <p class="text-base sm:text-lg">
            <span class="font-bold">{{ $t("movie.director") }}:</span>
            {{ movie.value.director[localeStore.locale] }}
          </p>
        </aside>
      </div>
      <Form v-slot="{ handleSubmit }">
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="px-8 flex flex-col gap-6 mt-7"
        >
          <FormTextarea
            name="quote_en"
            language="Eng"
            placeholder="create new quote"
            rules="required"
          />
          <FormTextarea
            name="quote_ka"
            language="?????????"
            placeholder="??????????????? ??????????????????"
            rules="required"
          />
          <div>
            <div
              class="border border-gray-500 px-7 bg-transparent rounded-md h-[64px] flex items-center"
            >
              <label
                for="avatar"
                class="grid grid-cols-8 h-full items-center gap-1 w-full"
              >
                <CameraIcon />
                <p class="hidden sm:block col-span-4">
                  {{ $t("quote.drag_drop") }}
                </p>
                <p class="block sm:hidden col-span-4">Upload image</p>
                <Field
                  name="avatar"
                  id="avatar"
                  type="file"
                  accept="image/*"
                  class="col-span-3"
                  rules="required"
                />
              </label>
            </div>
            <div>
              <ErrorMessage
                name="avatar"
                class="text-[#F15524] text-center font-light"
              />
            </div>
          </div>
          <BaseButton
            class="bg-[#E31221] h-12 w-full"
            :text="$t('quote.add_quote')"
            type="submit"
          />
        </form>
      </Form>
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/assets/icons/quote/CrossIcon.vue";
import FormTextarea from "@/components/quote/FormTextarea.vue";
import CameraIcon from "@/assets/icons/quote/CameraIcon.vue";
import { Field, ErrorMessage, Form } from "vee-validate";
import BaseButton from "@/components/base/BaseButton.vue";
import { onMounted, reactive, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import useFetch from "@/hooks/useFetch";
import { useLocaleStore } from "@/stores/locale";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const localeStore = useLocaleStore();

const route = useRoute();
const router = useRouter();
const movie = reactive({ value: {} });
const quotes = inject("quotes");

const onSubmit = async (values) => {
  const form = new FormData();
  form.append(
    "title",
    JSON.stringify({
      en: values.quote_en,
      ka: values.quote_ka,
    })
  );
  form.append("avatar", values.avatar);
  form.append("movie_id", route.params.id);
  const state = await useFetch({
    url: `/quote`,
    method: "post",
    data: form,
  });
  if (state.status.value === 201) {
    quotes.value.push(state.response.value.quote);
    router.push(`/movie/${route.params.id}`);
  }
};

onMounted(async () => {
  const state = await useFetch({
    url: `/movies/${route.params.id}`,
    method: "get",
  });
  movie.value = state.response.value.movie;
});
</script>

<style scoped>
#parent {
  background: rgba(0, 0, 0, 0.4);
}
input[type="file"]::file-selector-button {
  background-color: #9747ff;
  color: white;
  border: 0;
  height: 40px;
  padding: 4px;
}
</style>
