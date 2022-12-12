<template>
  <div
    id="parent"
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center overflow-y-scroll w-full h-full z-20"
    v-if="Object.keys(quote.value).length"
  >
    <div
      class="min-h-[650px] w-[428px] bg-[#11101A] text-white sm:w-[650px] top-28 absolute"
    >
      <div
        class="flex justify-between border-b-[1px] border-[#EFEFEF] h-20 items-center"
      >
        <TrashIcon class="ml-8 hover:cursor-pointer" @click="handleDelete" />
        <h1 class="text-2xl">{{ $t("quote.edit_quote") }}</h1>
        <RouterLink :to="{ name: 'movie', params: { id: route.params.id } }">
          <CrossIcon class="mr-8" />
        </RouterLink>
      </div>
      <div class="flex items-center gap-4 text-xl px-8 py-2">
        <img
          src="https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          class="h-[60px] w-[60px] rounded-full object-cover"
        />
        <p>{{ quote.value.user.name }}</p>
      </div>
      <Form as="div" v-slot="{ handleSubmit }">
        <form
          @submit="handleSubmit($event, onSubmit)"
          class="px-8 flex flex-col gap-6 mt-7"
        >
          <div class="flex flex-col gap-3">
            <FormTextarea
              name="quote_en"
              language="Eng"
              :initialValue="quote.value.title.en"
              rules="required"
            />
            <FormTextarea
              name="quote_ka"
              language="ქარ"
              :initialValue="quote.value.title.ka"
              rules="required"
            />
          </div>
          <div class="mt-6 w-full">
            <div
              class="sm:w-[586px] w-[364px] h-[370px] absolute flex justify-center items-center"
            >
              <label for="avatar">
                <ChangePhoto />
              </label>
            </div>
            <Field
              type="file"
              name="avatar"
              id="avatar"
              hidden
              @change="handleImageChange"
              accept="image/*"
            />
            <img
              :src="quote.value.avatar"
              alt=""
              class="h-[370px] w-full rounded-xl object-cover"
              ref="avatarRef"
            />
            <BaseButton
              class="h-10 w-full bg-[#E31221] mt-10 mb-10"
              :text="$t('common.save_changes')"
            />
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script setup>
import TrashIcon from "@/assets/icons/quote/TrashIcon.vue";
import CrossIcon from "@/assets/icons/quote/CrossIcon.vue";
import FormTextarea from "@/components/quote/FormTextarea.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import ChangePhoto from "@/components/quote/ChangePhoto.vue";
import { onMounted, reactive, ref } from "vue";
import useFetch from "@/hooks/useFetch";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import { Form, Field } from "vee-validate";

const route = useRoute();
const router = useRouter();
const avatarRef = ref(null);
const quotes = inject("quotes");

const quote = reactive({ value: {} });

const getQuote = async () => {
  const state = await useFetch({
    url: `/quote/${route.params.quoteId}`,
    method: "get",
  });
  if (state.status.value === 200) {
    quote.value = state.response.value.quote;
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatarRef.value.src = URL.createObjectURL(file);
  }
};

const handleDelete = async () => {
  const state = await useFetch({
    url: `/quote/${quote.value.id}`,
    method: "delete",
  });
  if (state.status.value === 204) {
    quotes.value = quotes.value.filter((q) => q.id !== quote.value.id);
    router.push({ name: "movie", params: { id: route.params.id } });
  }
};

const onSubmit = async (values) => {
  const form = new FormData();
  form.append(
    "title",
    JSON.stringify({
      en: values.quote_en,
      ka: values.quote_ka,
    })
  );
  if (values.avatar) {
    form.append("avatar", values.avatar);
  }
  form.append("movie_id", route.params.id);
  const state = await useFetch({
    url: `/quote/${route.params.quoteId}?_method=patch`,
    method: "post",
    data: form,
  });
  if (state.status.value === 200) {
    quotes.value = quotes.value.map((q) => {
      if (q.id === quote.value.id) {
        return state.response.value.quote;
      }
      return q;
    });
    router.push(`/movie/${route.params.id}`);
  }
};

onMounted(() => {
  getQuote();
});
</script>

<style scoped>
#parent {
  background: rgba(0, 0, 0, 0.4);
}
</style>
