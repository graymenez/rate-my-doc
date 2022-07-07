//clicking search bar will give search bar add -hover to class allowing search bar to have an hover effect
function hoverEffectSearchHelper(e, componentName) {
  let searchBox = document.getElementById(`${componentName}SearchBar`);

  e.target.className = `${componentName}SearchIco-hover`;

  if (searchBox.className === `${componentName}SearchBar`) {
    searchBox.className = `${componentName}SearchBar-hover`;
  }
}
export default { hoverEffectSearchHelper };
