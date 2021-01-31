<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{"History" | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{recordType}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>{{"Description" | localize}}: {{record.description}}</p>
              <p>{{"Amount" | localize}}: {{record.amount | currency("UAH")}}</p>
              <p>{{"Category" | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('date')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{"Record_With" | localize}}{{$route.params.id}} {{"Not_found" | localize}}.</p>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  metaInfo(){
    return {
      title: this.$title('Detail_Title')
    }
  },
  name: "detail",
  data() {
    return {
      record: null,
      loading: true,
    };
  },
  computed: {
    recordType() {
     if(this.record.type === 'income') {
       return localizeFilter("Income") ;
     }
     return localizeFilter("Outcome") ;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
