<template>
  <div
    id="parent"
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center overflow-y-scroll z-10"
  >
    <div
      class="max-w-xl w-full bg-[#11101A] text-white absolute left-0 right-0 ml-auto mr-auto z-10 top-0"
    >
      <section
        class="flex items-center justify-between py-5 border-[#EFEFEF] border-b-2"
      >
        <div class="w-1 h-1"></div>
        <h1>{{ $t("movie.edit_movie") }}</h1>
        <div class="pr-6 hover:cursor-pointer">
          <RouterLink :to="{ name: 'movie', params: { id: route.params.id } }">
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
        <VeeForm
          as="div"
          v-slot="{ handleSubmit }"
          :initial-values="initialValues"
        >
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
            <DropDown />
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
                  <CameraIcon />
                  {{ $t("input.placeholders.upload_image_short") }}
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
              :text="$t('movie.edit_movie')"
            />
          </form>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/assets/icons/movie/CrossIcon.vue";
import SelectedCategories from "@/components/movie/SelectedCategories.vue";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import { useMovieStore } from "@/stores/movie";
import FormInput from "@/components/movie/FormInput.vue";
import FormTextarea from "@/components/movie/FormTextarea.vue";
import DropDown from "@/components/movie/AvailableCategories.vue";
import CameraIcon from "@/assets/icons/movie/CameraIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { inject, onMounted, reactive, ref } from "vue";
import useFetch from "@/hooks/useFetch";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const store = useMovieStore();
store.resetGenres();
const router = useRouter();
const route = useRoute();
const movie = inject("movie");

const avatar = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatar.value = file;
  }
};

const initialValues = reactive({
  movie_title_en: "",
  movie_title_ka: "",
  director_en: "",
  director_ka: "",
  release_year: "",
  budget: "",
  description_en: "",
  description_ka: "",
  avatar: "",
});

const getInitialValues = async () => {
  const state = await useFetch({
    url: `/movies/${route.params.id}`,
    method: "get",
  });
  if (state.status.value === 200) {
    const data = state.response.value.movie;
    initialValues.movie_title_en = data.title.en;
    initialValues.movie_title_ka = data.title.ka;
    for (let i of data.categories) {
      store.addToChosenCategories(i);
    }
    initialValues.director_en = data.director.en;
    initialValues.director_ka = data.director.ka;
    initialValues.release_year = data.release_year;
    initialValues.budget = data.budget;
    initialValues.description_en = data.description.en;
    initialValues.description_ka = data.description.ka;
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
    url: `/movies/${route.params.id}?_method=patch`,
    method: "post",
    data: form,
  });
  if (state.status.value === 200) {
    // store.updateMovie(state.response.value.movie);
    movie.value = state.response.value.movie;
    console.log(movie.value);
    router.push({ name: "movie", params: { id: route.params.id } });
  } else {
    const titleError = state.error.value.response.data.errors.title;
    if (titleError) {
      if (titleError.length === 2) {
        const [enError, kaError] = titleError;
        actions.setFieldError("movie_title_en", enError);
        actions.setFieldError("movie_title_ka", kaError);
      } else {
        const [error] = titleError;
        if (error.includes("Georgian")) {
          actions.setFieldError("movie_title_ka", error);
        } else {
          actions.setFieldError("movie_title_en", error);
        }
      }
    }
  }
};

onMounted(() => {
  getInitialValues();
});
</script>

<style scoped>
#parent {
  background: rgba(0, 0, 0, 0.4);
}
</style>
