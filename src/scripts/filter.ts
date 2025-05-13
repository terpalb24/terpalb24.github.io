interface HandleFilterOptions {
    filterSelector: string;
    filterAttribute: string;
    itemSelector: string;
    itemAttribute: string;
}

export class Filter {
    private filterSelector: string;
    private filterAttribute: string;
    private itemSelector: string;
    private itemAttribute: string;
    private filterButtons: NodeListOf<Element>;
    private items: NodeListOf<Element>;
    constructor(options: HandleFilterOptions) {
        this.filterSelector = options.filterSelector;
        this.filterAttribute = options.filterAttribute;
        this.itemSelector = options.itemSelector;
        this.itemAttribute = options.itemAttribute;
        this.filterButtons = document.querySelectorAll(this.filterSelector);
        this.items = document.querySelectorAll(this.itemSelector);

        this.initListener();
    }

    initListener(){
        this.filterButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const filterValue = button.getAttribute(this.filterAttribute);
            this.setFilter(filterValue!);
          });
        });
    }

    setFilter(value: string){
        this.items.forEach((item) => {
          if (value === "ALL" || item.getAttribute(this.itemAttribute) === value) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
        this.filterButtons.forEach((btn) => {
          if (btn.getAttribute(this.filterAttribute) === value) {
            btn.classList.remove("ripple-white");
          } else {
            btn.classList.add("ripple-white");
          }
        });
    }
}
