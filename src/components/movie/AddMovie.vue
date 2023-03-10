<template>
  <div
    class="max-w-xl absolute w-full bg-[#11101A] text-white left-0 right-0 ml-auto mr-auto z-10 top-16"
  >
    <section
      class="flex items-center justify-between py-5 border-[#EFEFEF] border-b-2"
    >
      <div class="w-1 h-1"></div>
      <h1>{{ $t("movie.add_movie") }}</h1>
      <div class="pr-6 hover:cursor-pointer">
        <RouterLink :to="{ name: 'movies' }">
          <CrossIcon />
        </RouterLink>
      </div>
    </section>
    <div class="px-6">
      <div class="py-3">
        <img
          :src="authStore.avatar"
          class="w-[60px] h-[60px] rounded-full object-cover"
        />
        <p>{{ store.name }}</p>
      </div>
      <VeeForm as="div" v-slot="{ handleSubmit }">
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="flex flex-col gap-3 pb-10"
        >
          <FormInput
            type="text"
            name="movie_title_en"
            language="Eng"
            rules="required"
            placeholder="Movie name"
          />
          <FormInput
            type="text"
            name="movie_title_ka"
            language="ქარ"
            rules="required"
            placeholder="ფილმის სახელი"
          />
          <SelectedCategories />
          <FormInput
            type="text"
            name="director_en"
            language="Eng"
            rules="required"
            placeholder="Director"
          />
          <FormInput
            type="text"
            name="director_ka"
            language="ქარ"
            rules="required"
            placeholder="რეჟისორი"
          />
          <FormInput
            type="number"
            name="release_year"
            language=""
            rules="required"
            placeholder="Release year"
          />
          <FormInput
            type="number"
            name="budget"
            language=""
            rules="required"
            placeholder="Budget"
          />
          <FormTextarea
            name="description_en"
            language="Eng"
            rules="required"
            placeholder="Movie discription"
          />
          <FormTextarea
            name="description_ka"
            language="ქარ"
            rules="required"
            placeholder="ფილმის აღწერა"
          />
          <div>
            <div
              class="border border-gray-500 pl-7 pr-12 bg-transparent rounded-md h-[64px] flex items-center"
            >
              <label for="avatar" class="sm:flex hidden items-center gap-1">
                <CameraIcon /> {{ $t("input.placeholders.upload_image") }}
                <span class="p-2 w-28 bg-[#9747FF]">Choose file</span>
              </label>
              <label for="avatar" class="sm:hidden flex items-center gap-1">
                <CameraIcon /> {{ $t("input.placeholders.upload_image_short") }}
                <span class="p-2 w-28 bg-[#9747FF] ml-10">Choose file</span>
              </label>
              <Field
                name="avatar"
                id="avatar"
                type="file"
                hidden
                @change="handleImageChange"
                accept="image/*"
                rules="required"
              />
            </div>
            <div>
              <ErrorMessage
                name="avatar"
                class="text-[#F15524] text-center font-light"
              />
            </div>
          </div>
          <BaseButton
            type="submit"
            class="h-12 bg-[#E31221] w-full"
            :text="$t('movie.add_movie')"
          />
        </form>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/assets/icons/movie/CrossIcon.vue";
import SelectedCategories from "./SelectedCategories.vue";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { useMovieStore } from "@/stores/movie";
import FormInput from "@/components/movie/FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
import CameraIcon from "@/assets/icons/movie/CameraIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const store = useMovieStore();
store.resetGenres();
const router = useRouter();

const avatar = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatar.value = file;
  }
};

const onSubmit = async (values, actions) => {
  if (store.chosenCategories.length === 0) {
    store.setCategoriesError(true);
    return;
  }
  const form = new FormData();
  form.append(
    "title",
    JSON.stringify({
      en: values.movie_title_en,
      ka: values.movie_title_ka,
    })
  );
  form.append(
    "director",
    JSON.stringify({
      en: values.director_en,
      ka: values.director_ka,
    })
  );
  form.append(
    "description",
    JSON.stringify({
      en: values.description_en,
      ka: values.description_ka,
    })
  );
  form.append(
    "categories",
    store.chosenCategories.map((category) => category.id)
  );
  form.append("avatar", avatar.value);
  form.append("release_year", values.release_year);
  form.append("budget", values.budget);
  const state = await useFetch({
    url: "/movies",
    method: "post",
    data: form,
  });
  if (state.status.value === 201) {
    router.push({ name: "movies" });
    store.addMovie(state.response.value.movie);
  } else {
    const titleError = state.error.value.response.data.errors.title;
    if (titleError) {
      if (titleError.length === 2) {
        const [enError, kaError] = titleError;
        actions.setFieldError("movie_title_en", {
          en: enError,
          ka: "ინგლისურად ფილმის სახელი უკვე არსებობს",
        });
        actions.setFieldError("movie_title_ka", {
          en: kaError,
          ka: "ქართულად ფილმის სახელი უკვე არსებობს",
        });
      } else {
        const [error] = titleError;
        if (error.includes("Georgian")) {
          actions.setFieldError("movie_title_ka", {
            en: error,
            ka: "ქართულად ფილმის სახელი უკვე არსებობს",
          });
        } else {
          actions.setFieldError("movie_title_en", {
            en: error,
            ka: "ინგლისურად ფილმის სახელი უკვე არსებობს",
          });
        }
      }
    }
  }
};
</script>
