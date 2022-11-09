import { reactive, toRefs } from "vue";
import axios from "axios";

const useFetch = async (options) => {
  const state = reactive({
    loading: false,
    error: null,
    response: null,
    status: null,
  });

  const fetchData = async () => {
    state.loading = true;
    try {
      const res = await axios(options);
      state.response = res.data;
      state.status = res.status;
    } catch (e) {
      state.error = e;
      state.status = e.response.status;
    } finally {
      state.loading = false;
    }
  };

  await fetchData();

  return toRefs(state);
};

export default useFetch;
