const gameBoard = document.getElementById('BoardTetris');

var board = {
    row: 20,
    col: 10,
    gravity: 2000,
    reset: 50,
    num_bag: 1000,
    delay: 4000
};



var cur_time, end_game, start_time;
// 0 -> blank
// 1 -> I (light blue)
// 2 -> L (blue)
// 3 -> L (orange)
// 4 -> O (yellow)
// 5 -> Z (red)
// 6 -> Z (green)
// 7 -> T (purple)

let piece = [];
let state = new Array(board.row + 1);
var moveable = false, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0, degree = 90;

function time_elapsed(){
    osu = setInterval(function() {
        cur_time = Date.now();
        // console.log(cur_time);
    }, board.gravity);
}

function reset_all(){
    clearInterval(osu); moveable = false; end_game = 0; cur_piece = 0; board.gravity = 1000;
    piece = [];
    for(var i = 1; i <= board.row; i++){
        state[i] = new Array(board.col + 1).fill(0);
    }
}
function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
    return (i - 1) * board.col + j;
}

function ok(a){
    // console.log(a);
    if(a && a < 8) return true;
    else return false;
}

function check(index, r, c){
    if(index == 1){
        if(c + 3 > board.col || r > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r][c + 2]) || ok(state[r][c + 3])) return false;
    }
    if(index == 2){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c])) return false;
    }
    if(index == 3){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c + 2])) return false;
    }
    if(index == 4){
        if(c + 1 > board.col || r + 1 > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r + 1][c]) || ok(state[r + 1][c + 1])) return false;
    }
    if(index == 5){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2])) return false; 
    }
    if(index == 6){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r][c + 1]) || ok(state[r][c + 2])) return false;
    }
    if(index == 7){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c + 1])) return false;
    }
    return true;
}
function current_piece(id){
    moveable = true; degree = 90;
    r = 1, c = 4, index = id;
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); update_color();
    if(index == 1) r = 1, c = 5;
    else r = 2, c = 5;
    var dropable = 0;
    var lap = setInterval(function(){
        if(dropable == 1){
            board.gravity /= 3; 
            fill();
            if(cur_piece + 1 == board.num_bag * 7) clearInterval(lap);
            current_piece(piece[++cur_piece]);
            clearInterval(lap);
        }
        if(dropping() == true);
        else{
            dropable = 1; 
            board.gravity *= 3;
        }
    }, board.gravity);
}

function init(){
    create_board();
    create_bag();
}

function game_over(){
   end_game = 1; return; 
}
window.addEventListener('load', function(){
    init();
});
function New_game(){
    reset_all();
	window.location.reload();
}
