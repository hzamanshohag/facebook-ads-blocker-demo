// Define the function first
function scanAndHide(root) {
  const ads = root.querySelectorAll(
    '[aria-label="Sponsored"], [data-ad-preview="message"]'
  );
  ads.forEach((ad) => {
    ad.style.display = "none";
  });
  console.log(`🧹 Removed ${ads.length} ads`);
}

// Mutation observer to watch for new content
function onMutations(mutations) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) scanAndHide(node);
    });
  });
}

// Run immediately once page loads
scanAndHide(document);

// Start observing changes on Facebook feed
const observer = new MutationObserver(onMutations);
observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true,
});

// Keep scanning every 2.5 seconds
setInterval(() => scanAndHide(document), 2500);

console.log("🧱 Facebook Ads Blocker running...");
