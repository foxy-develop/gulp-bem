if (document.querySelector(".preloader")) {
  const loader = () => new Promise((resolve) => setTimeout(resolve, 1000));
  loader().then(() => document.querySelector(".preloader").classList.remove("preloader--active"));
}
