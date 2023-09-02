function add_score(x){
    var score = 0;
    if(x == 1) score = 40;
    if(x == 2) score = 80;
    if(x == 3) score = 140;
    if(x == 4) score = 250;
    if(!score) return score;
    return score * (1 + time_elapsed() / board.coefficient);
}
function update_score(){
    cur_score = Math.round(cur_score);
    let cell = document.getElementById(hash(200, 200));
    cell.textContent = "Score: " + cur_score;
}