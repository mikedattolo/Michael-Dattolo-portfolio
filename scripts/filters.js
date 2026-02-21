(() => {
  const chipNodes = Array.from(document.querySelectorAll(".chip[data-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-tags]"));

  if (!chipNodes.length || !cards.length) {
    return;
  }

  const getFilterFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("filter") || "all";
  };

  const setFilterInURL = (filter) => {
    const params = new URLSearchParams(window.location.search);
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    const query = params.toString();
    const nextURL = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState({}, "", nextURL);
  };

  const applyFilter = (filter) => {
    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      const visible = filter === "all" || tags.includes(filter);
      card.hidden = !visible;
    });

    chipNodes.forEach((chip) => {
      const active = chip.dataset.filter === filter;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
  };

  chipNodes.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter || "all";
      applyFilter(filter);
      setFilterInURL(filter);
    });
  });

  const initialFilter = chipNodes.some((chip) => chip.dataset.filter === getFilterFromURL())
    ? getFilterFromURL()
    : "all";

  applyFilter(initialFilter);
})();
