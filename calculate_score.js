function add_score(x){
    if(x == 1) return 40;
    if(x == 2) return 80;
    if(x == 3) return 140;
    if(x == 4) return 250;
    return 0;
}
function update_score(){
    score.textContent = "Score: " + cur_score;
}