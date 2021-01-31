<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Category_Edit" | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{"Category_Pick_Category" | localize}}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{"Category_Create_Name" | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{"Message_Category_Name" | localize}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{"Category_Limit" | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{"Message_Min_Value" | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"Category_Update" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';

export default {
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch();
        return;
      };

      const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(localizeFilter(''));
        this.$emit('updated', categoryData);
      } catch (e) {};
    }
  },
  watch: {
    current(value) {
      const {id, title, limit} = this.categories.find(c => c.id === value);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeDestroy() {
    if(this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
}
</script>
