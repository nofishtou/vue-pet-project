<template>
  <div>
    <div class="page-title">
      <h3>{{"Category_Name"| localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoriesCreate @created="addNewCategory"/>

        <CategoriesEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">
          {{"Category_Empty" | localize }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoryCreate';
import CategoriesEdit from '@/components/CategoryEdit';

export default {
  metaInfo(){
    return {
      title: this.$title("Category_Name")
    }
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++
    }
  },
  components: {
    CategoriesCreate, CategoriesEdit
  }
}
</script>
