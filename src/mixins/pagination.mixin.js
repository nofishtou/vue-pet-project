export default {
  data() {
    return {
      page: +this.$route.query.page|| 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page -1] || this.allItems[0];
    },
    setupPagination(allItems) {
      let counter = 0;
      let tempArr = [];
      this.allItems = allItems.reduce((acc,item) => {
        tempArr.push(item);
        counter++
        if(counter === this.pageSize) {
          acc.push(tempArr);
          tempArr = [];
          counter = 0;
        }
        return acc;
      }, [])
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page -1] || this.allItems[0];
    }
  }
}
