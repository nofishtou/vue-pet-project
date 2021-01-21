<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created="addNewCategory"/>

        <CategoriesEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoryCreate';
import CategoriesEdit from '@/components/CategoryEdit';

export default {
  name: 'categories',
  data: () => ({
    categories: [],
  }),
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
      console.log(this.categories);
    }
  },
  components: {
    CategoriesCreate, CategoriesEdit
  }
}
</script>
