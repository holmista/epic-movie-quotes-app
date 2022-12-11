<template>
  <div
    id="parent"
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10"
  >
    <div
      class="min-h-[670px] w-[428px] bg-[#11101A] text-white sm:w-[650px] z-60 relative rounded-xl"
    >
      <div
        class="grid grid-flow-col-dense border-b-[1px] border-[#EFEFEF] h-20 items-center"
      >
        <div></div>
        <div class="flex justify-center text-xl sm:text-2xl">
          <h1 class="">{{ $t("quote.write_new_quote") }}</h1>
        </div>
        <RouterLink :to="{ name: 'feed' }">
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
        <p>{{ authStore.name }}</p>
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
            language="ქარ"
            placeholder="ახალი ციტატა"
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
          <div class="flex justify-start" v-if="movies.value.length">
            <div
              class="absolute pl-6 flex gap-3 h-[64px] items-center"
              v-if="showMovieLabel"
            >
              <MovieCameraIcon />
              <p>{{ $t("quote.choose_movie") }}</p>
            </div>
            <div class="w-full">
              <Field
                as="select"
                name="movie"
                class="bg-black text-white block w-full p-2.5> border border-black h-[64px]"
                @change="showMovieLabel = false"
                rules="required"
              >
                <option
                  v-for="movie in movies.value"
                  :key="movie.id"
                  :value="movie.id"
                >
                  {{ movie.title.en }}
                </option>
              </Field>
              <ErrorMessage
                name="movie"
                class="text-[#F15524] text-center font-light"
              />
            </div>
          </div>

          <BaseButton
            class="bg-[#E31221] h-12 w-full mb-6"
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
import { useAuthStore } from "@/stores/auth";
import MovieCameraIcon from "@/assets/icons/profile/CameraIcon.vue";
import { reactive, ref, onMounted } from "vue";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "vue-router";
// import useNewsFeedStore from "@/stores/newsFeed";

const authStore = useAuthStore();
// const newsFeedStore = useNewsFeedStore();
const router = useRouter();

const showMovieLabel = ref(true);
const movies = reactive({ value: [] });

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
  form.append("movie_id", values.movie);
  const state = await useFetch({
    url: `/quote`,
    method: "post",
    data: form,
  });
  if (state.status.value === 201) {
    // newsFeedStore.appendQuote(state.response.value.quote);
    router.push("/feed");
  }
};

onMounted(async () => {
  const state = await useFetch({
    url: `/movies`,
    method: "get",
  });
  movies.value = state.response.value.movies;
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
