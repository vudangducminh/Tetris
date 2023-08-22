const gameBoard = document.getElementById('BoardTetris');

var board = {
    row: 20,
    col: 10,
    gravity: 500,
    current_gravity: 500,
    reset: 50,
    num_bag: 1000,
    delay: 3000
};



var cur_time, end_game, start_time, dropable, lap, num_lap;
// 0 -> blank
// 1 -> I (light blue)
// 2 -> L (blue)
// 3 -> L (orange)
// 4 -> O (yellow)
// 5 -> Z (red)
// 6 -> Z (green)
// 7 -> T (purple)

let priority_other = new Array(9), priority_I = new Array(9);
for(var i = 1; i <= 8; i++){    
    priority_other[i] = new Array(5).fill([0, 0]);
    priority_I[i] = new Array(5).fill([0, 0]);
}
// cw
priority_other[1] = [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]]; // 0 -> 1
priority_other[2] = [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]];  // 1 -> 2
priority_other[3] = [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]]; // 2 -> 3
priority_other[4] = [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]]; // 3 -> 0
priority_I[1] = [[0, 0], [0, -2], [0, 1], [-1, -2], [2, 1]]; // 0 -> 1
priority_I[2] = [[0, 0], [0, -2], [0, 1], [-2, 1], [1, -2]];  // 1 -> 2
priority_I[3] = [[0, 0], [0, -1], [0, 2], [-2, -1], [1, 2]]; // 2 -> 3
priority_I[4] = [[0, 0], [0, 2], [0, -1], [-1, 2], [1, -1]]; // 3 -> 0
// ccw
priority_other[5] = [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]]; // 0 -> 3
priority_other[6] = [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]]; // 1 -> 0
priority_other[7] = [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]]; // 2 -> 1
priority_other[8] = [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]]; // 3 -> 2
priority_I[5] = [[0, 0], [0, 1], [0, -2], [-2, 1], [1, -2]]; // 0 -> 3
priority_I[6] = [[0, 0], [0, 2], [0, -1], [-2, -1], [1, 2]];  // 1 -> 0
priority_I[7] = [[0, 0], [0, 2], [0, -1], [-1, 2], [2, -1]]; // 2 -> 1
priority_I[8] = [[0, 0], [0, -2], [0, 1], [-1, -2], [1, 1]]; // 3 -> 2
let piece = [];
let state = new Array(board.row + 1);
var moveable = false, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0, degree = 1, num_lap = 0;

function time_elapsed(){
    osu = setInterval(function() {
        cur_time = Date.now();
        // console.log(cur_time);
    }, board.reset);
}

function reset_all(){
    clearInterval(osu); clearInterval(lap); moveable = false; end_game = 0; cur_piece = 0; dropable = 1; board.current_gravity = board.gravity;
    piece = []; priority = [];
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
function min(i, j){
    return i > j ? j : i;
}
function max(i, j){
    return i < j ? j : i;
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
