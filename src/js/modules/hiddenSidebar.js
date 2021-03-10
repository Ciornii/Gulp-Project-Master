import calcScroll from "./calcScroll";

const hiddenSidebar = () => {
  function bindHiddenSidebar({
    triggerSelector,
    sidebarSelector,
    modalBgSelector,
    categoriesTriggerSelector,
    categoriesParentSelector,
    categoriesSelector,
    subcategoryTriggerSelector,
    subcategoryParentSelector,
    subcategoriesSelector,
  } = {}) {
    const triggers = document.querySelectorAll(triggerSelector),
      sidebar = document.querySelector(sidebarSelector),
      modalBg = document.querySelector(modalBgSelector),
      scroll = calcScroll();

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        sidebar.classList.toggle("hide");
        modalBg.classList.toggle("active");

        if (modalBg.classList.contains("active")) {
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`;
        } else {
          document.body.style.overflow = "";
          document.body.style.marginRight = `0px`;
        }

        // close all subcategories when menu is closed
        const subcategories = document.querySelectorAll(subcategoriesSelector),
          categories = document.querySelectorAll(categoriesSelector);
        categories.forEach((category) => {
          if (category.classList.contains("active")) {
            category.classList.remove("active");
          }
        });
        subcategories.forEach((subcategory) => {
          if (subcategory.classList.contains("active")) {
            subcategory.classList.remove("active");
          }
        });
      });
    });

    // ------------------------------------------------------- Categories
    const categoriesTrigger = document.querySelectorAll(
      categoriesTriggerSelector
    );

    categoriesTrigger.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.scrollTo(0, 0);

        const categoriesParent = e.target.closest(categoriesParentSelector),
          categories = categoriesParent.querySelector(categoriesSelector),
          subcategories = categoriesParent.querySelectorAll(
            subcategoriesSelector
          );

        categories.classList.toggle("active");

        subcategories.forEach((subcategory) => {
          if (subcategory.classList.contains("active")) {
            subcategory.classList.remove("active");
          }
        });
      });
    });

    // ------------------------------------------------------- Subcategories
    const subcategoryTrigger = document.querySelectorAll(
      subcategoryTriggerSelector
    );

    subcategoryTrigger.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.scrollTo(0, 0);

        const subcategoryParent = e.target.closest(subcategoryParentSelector),
          subcategories = subcategoryParent.querySelector(
            subcategoriesSelector
          );
        subcategories.classList.toggle("active");
      });
    });
  }

  bindHiddenSidebar({
    triggerSelector: "[data-mmenu-trigger]",
    sidebarSelector: ".mmenu",
    modalBgSelector: "[data-mmenu-modalBg]",
    categoriesTriggerSelector: "[data-categories-trigger]",
    categoriesParentSelector: "[data-categories-parent]",
    categoriesSelector: "[data-categories]",
    subcategoryTriggerSelector: "[data-subcategory]",
    subcategoryParentSelector: ".mmenu__subcategories",
    subcategoriesSelector: ".mmenu__dropdown",
  });
};

export default hiddenSidebar;
