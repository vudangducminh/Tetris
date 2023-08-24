const gameBoard = document.getElementById('BoardTetris');
const score = document.getElementById("ScoreTetris");
var board = {
    row: 20,
    col: 10,
    gravity: 750,
    reset: 30,
    num_bag: 1000,
    pc_score: 1000,
};



var cur_time, end_game, start_time, dropable, lap, num_lap, cur_score, is_pc = 0;
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
let shadow_state = new Array(board.row + 1);
var pressed = {};
var moveable = false, crr, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0, degree = 1, num_lap = 0, hold = -1, holdable = false;

function time_elapsed(){
    osu = setInterval(function() {
        cur_time = Date.now();
        // console.log(cur_time);
    }, board.reset);
}

function reset_all(){
    clearInterval(osu); clearInterval(lap); 
    moveable = false; end_game = false;dropable = true;  
    cur_piece = 0; cur_score = 0; is_pc = 0;
    hold = -1; holdable = false;
    piece = [];  
    for(var i = 1; i <= board.row; i++){
        state[i] = new Array(board.col + 1).fill(0);
        shadow_state[i] = new Array(board.col + 1).fill(0);
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
