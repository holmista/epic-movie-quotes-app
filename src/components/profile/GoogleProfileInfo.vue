<template>
  <div class="ml-24 mt-8">
    <h1 class="text-2xl">My profile</h1>
    <div class="flex flex-col items-center mt-10">
      <img
        :src="store.avatarSrc"
        class="w-[188px] h-[188px] rounded-full object-cover absolute top-40"
        alt=""
        ref="avatarRef"
      />
      <Form
        v-slot="{ meta, handleSubmit }"
        :initial-values="formValues"
        as="div"
      >
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="flex flex-col gap-6 mt-14 max-w-[998px] h-full px-20 pb-20 bg-[#11101a]"
        >
          <Field
            name="avatar"
            type="file"
            id="actual-btn"
            hidden
            @change="handleImageChange"
            accept="image/*"
          />

          <div class="flex justify-center pt-28">
            <label for="actual-btn" class="hover:cursor-pointer"
              >Upload new photo</label
            >
          </div>
          <ProfileInput class="">
            <template #input>
              <BaseInput
                name="name"
                label="Name"
                type="text"
                class="w-[360px]"
                rules="required|min:3|max:15|lower"
              />
            </template>
            <template #button>
              <BaseButton text="edit" class="mt-7" />
            </template>
          </ProfileInput>
          <div class="flex flex-col gap-8">
            <input
              name="email"
              label="Email"
              type="email"
              :value="store.primaryEmail"
              class="w-[360px] border-t-2 border-[#CED4DA] text-black rounded"
              readonly
            />
          </div>

          <div
            v-if="meta.touched || imageInputTouched"
            class="flex justify-end"
          >
            <BaseButton type="reset" text="Cancel" />
            <BaseButton text="Save changes" class="bg-[#E31221]" />
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script setup>
// import { Form, Field } from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import ProfileInput from "@/components/profile/ProfileInput.vue";
import { ref, onMounted, reactive } from "vue";
import { Form, Field } from "vee-validate";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/stores/profile";

const store = useProfileStore();

const imageInputTouched = ref(false);
const avatarRef = ref(null);
const avatar = ref(null);
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatar.value = file;
    avatarRef.value.src = URL.createObjectURL(file);
    imageInputTouched.value = true;
  }
};

// const secondaryEmails = reactive([]);

const onSubmit = async (values) => {
  const body = {
    name: values.name,
    avatar: avatar.value,
  };
  if (body.name === store.name || body.name === "") {
    delete body.name;
  }
  for (let [k, v] of Object.entries(body)) {
    if (!v) {
      delete body[k];
    }
  }
  const form = new FormData();
  body.name && form.append("name", body.name);
  body.avatar && form.append("avatar", body.avatar);
  const state = await useFetch({
    url: "/user",
    method: "post",
    data: form,
  });
  console.log(state.error.value);
  if (state.status.value === 200) {
    store.setName(state.response.value.user.name);
    store.setEmail(state.response.value.user.email);
    store.setAvatarSrc(state.response.value.user.avatar);
  }
};

const formValues = reactive({
  name: "",
});

onMounted(async () => {
  const state = await useFetch({ method: "get", url: "/user" });
  if (state.status.value === 200) {
    store.setName(state.response.value.name);
    store.setAvatarSrc(state.response.value.avatar);
    formValues.name = state.response.value.name;
  }
});
</script>
