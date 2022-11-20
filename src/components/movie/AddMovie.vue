<template>
  <div
    class="max-w-xl w-full bg-[#11101A] text-white absolute left-0 right-0 ml-auto mr-auto z-10 top-16"
  >
    <section
      class="flex items-center justify-between py-5 border-[#EFEFEF] border-b-2"
    >
      <div class="w-1 h-1"></div>
      <h1>Add movie</h1>
      <div class="pr-6 hover:cursor-pointer">
        <RouterLink :to="{ name: 'movies' }">
          <CrossIcon />
        </RouterLink>
      </div>
    </section>
    <div class="px-6">
      <div class="py-3">
        <img
          :src="store.avatarSrc"
          class="w-[60px] h-[60px] rounded-full object-cover"
        />
        <p>{{ store.name }}</p>
      </div>
      <Form class="flex flex-col gap-3 pb-10">
        <FormInput
          type="text"
          name="title_en"
          language="Eng"
          rules="required"
          placeholder="Movie name"
        />
        <SelectedCategories />
        <DropDown />
        <FormInput
          type="text"
          name="title_ka"
          language="ქარ"
          rules="required"
          placeholder="ფილმის სახელი"
        />
        <FormInput
          type="text"
          name="director_en"
          language="Eng"
          rules="required"
          placeholder="Director"
        />
        <FormInput
          type="text"
          name="title_ka"
          language="ქარ"
          rules="required"
          placeholder="რეჟისორი"
        />
        <FormTextarea
          name="description_en"
          language="Eng"
          rules="required"
          placeholder="Movie discription"
        />
        <FormTextarea
          name="title_ka"
          language="ქარ"
          rules="required"
          placeholder="ფილმის აღწერა"
        />
        <div
          class="border border-gray-500 pl-7 pr-12 bg-transparent rounded-md h-[64px] flex items-center"
        >
          <label for="avatar" class="flex items-center gap-1">
            <CameraIcon /> Drag & drop your image here or
            <span class="p-2 bg-[#9747FF]">Choose file</span>
          </label>
          <input hidden id="avatar" type="file" />
        </div>
        <BaseButton class="h-12 bg-[#E31221] w-full" text="Add movie" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import CrossIcon from "@/assets/icons/movie/CrossIcon.vue";
import SelectedCategories from "./SelectedCategories.vue";
import { Form } from "vee-validate";
import { useProfileStore } from "@/stores/profile";
import FormInput from "@/components/movie/FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
import DropDown from "./AvailableCategories.vue";
import CameraIcon from "@/assets/icons/movie/CameraIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const store = useProfileStore();
</script>
