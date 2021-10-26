
function ad_pr_cart(id){
    localStorage.setItem(`prd${id}`, id);
    x = localStorage.getItem(`prd${id}`);
}
