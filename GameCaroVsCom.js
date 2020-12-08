const DEFAULT_ROW = 20;
const DEFAULT_COL = 20;
const WINNER_COUNT = 5;
let mangDiemTanCong = [0, 3, 24,192,1536,12288,98304];
let mangDiemPhongNgu = [0, 1, 9, 81, 729, 6561, 59049];
let toaDo_X = 0, toaDo_Y = 0;
let board = [];
let currentTurn = 'X';
let countTurn = 1;

function start() {
    for(let i = 0; i < DEFAULT_ROW; i++){
        board[i] = [];
        for(let j = 0; j < DEFAULT_COL; j++){
            board[i][j] = '';
        }
    }
}

function draw() {
    let output = '<table>';
    for(let i = 0; i < DEFAULT_ROW; i++)
    {
        if(countTurn === 1){
            console.log("count == 0")
            board[Math.floor(DEFAULT_ROW/2)][Math.floor(DEFAULT_COL/2)] = 'O';
        }
        output += '<tr>';
        for(let j = 0; j < DEFAULT_COL; j++){
            output += '<td class="cell" onclick="clickCell(' + i + ', ' + j + ')">' + board[i][j] + '</td>'
        }
        output += '</tr>';
    }

    output += '</table>';
    document.getElementById('display').innerHTML = output;
}

function clickCell(row, col) {
    if(board[row][col] != ''){
        alert("Ban phai nhap vao o trong");
    }
    else{
        board[row][col] = currentTurn;
        draw();
        if(checkWinner(row, col))
        {
                alert("bạn đã chiến thắng!!!");
        }
        countTurn++;
        changeTurn(countTurn);
        xuLyAI();
    }

}

function xuLyAI() {
    timKiemNuocDi();
    board[toaDo_X][toaDo_Y] = currentTurn;
    draw();
    if(checkWinner(toaDo_X, toaDo_Y))
    {
        alert("Chủ tịch gà quá à!!!");
    }
    countTurn++;
    changeTurn(countTurn);
}

function changeTurn(number) {
    if(number % 2 == 1){
        currentTurn = 'X'
    }
    else{
        currentTurn = 'O';
    }
}

function checkWinner(row,col) {
    if(checkRow(row) || checkCol(col) || checkCross1() || checkCross2())
        return true;
    else
        return false;
}

function checkRow(row) {
    let count = 1;
    for(let i = 0; i < DEFAULT_COL - WINNER_COUNT + 1; i++){
        while(board[row][i] == board[row][i+1] && board[row][i] == currentTurn){
            count++;
            if(count == WINNER_COUNT){
                return true;
            }
            i++;
        }
        i - count + 1;
        count = 1;
    }
    return false;
}

function checkCol(col) {
    let count = 1;
    for(let i = 0; i < DEFAULT_ROW - WINNER_COUNT + 1; i++){
        while(board[i][col] == board[i+1][col] && board[i][col] == currentTurn){
            count++;
            if(count == WINNER_COUNT){
                return true;
            }
            i++;
        }
        i - count + 1;
        count = 1;
    }
    return false;
}

function checkCross1() {
    let count = 1;
    for(let i = 0; i < DEFAULT_ROW - WINNER_COUNT + 1; i++){
        for(let j = 0; j < DEFAULT_COL - WINNER_COUNT +1; j++){
            while(board[i][j] == board[i+1][j+1] && board[i][j] == currentTurn){
                count++;
                if(count == WINNER_COUNT){
                    return true;
                }
                i++;
                j++;
            }
            i - count + 1;
            j - count + 1;
            count = 1;
        }
    }
    return false;
}

function checkCross2() {
    let count = 1;
    for(let i = DEFAULT_ROW -1; i >= WINNER_COUNT - 1; i--){
        for(let j = 0; j < DEFAULT_COL - WINNER_COUNT +1; j++){
            while(board[i][j] == board[i-1][j+1] && board[i][j] == currentTurn){
                count++;
                if(count == WINNER_COUNT){
                    return true;
                }
                i--;
                j++;
            }
            i + count - 1;
            j - count + 1;
            count = 1;
        }
    }
    return false;
}



function timKiemNuocDi() {
    let pointMax = 0;
    for(let i = 0; i < DEFAULT_ROW; i++){
        for(let j = 0; j < DEFAULT_COL; j++) {
            if (board[i][j] == '') {
                let pointAttack = pointAttack_row(i, j) + pointAttack_col(i, j) + pointAttack_cross1(i, j) + pointAttack_cross2(i, j);
                let pointDefense = pointDefense_row(i, j) + pointDefense_col(i, j) + pointDefense_cross1(i, j) + pointDefense_cross2(i, j);
                let temp = pointAttack > pointDefense ? pointAttack : pointDefense;
                if (pointMax < temp) {
                    pointMax = temp;
                    toaDo_X = i;
                    toaDo_Y = j;
                }
            }
        }
    }
    console.log("toa do x: " + toaDo_X);
    console.log('toa do y: ' + toaDo_Y);
    console.log('diem max:' + pointMax);
}

function pointAttack_row(row, col) {
let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL; i++){
        if(board[row][col + i]=='O'){
            soQuanTa++;
        }else if(board[row][col+i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0; i++){
        if(board[row][col - i]=='O'){
            soQuanTa++;
        }else if(board[row][col-i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    console.log('so quan dich' + soQuanDich);
    console.log('so quan ta' + soQuanTa);
    if(soQuanDich == 2){
        return 0;
    }

    sum -= mangDiemPhongNgu[soQuanDich];
    sum += mangDiemTanCong[soQuanTa];
    console.log('sum: ' + sum);
return sum;
}

function pointAttack_col(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && row + i < DEFAULT_ROW; i++){
        if(board[row+i][col]=='O'){
            soQuanTa++;
        }else if(board[row+i][col]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    for(let i = 1; i < 6 && row - i >= 0; i++){
        if(board[row-i][col]=='O'){
            soQuanTa++;
        }else if(board[row-i][col]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    if(soQuanDich == 2){
        return 0;
    }

    sum -= mangDiemPhongNgu[soQuanDich];
    sum += mangDiemTanCong[soQuanTa];
    return sum;
}

function pointAttack_cross1(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL && row - i >= 0; i++){
        if(board[row - i][col + i]=='O'){
            soQuanTa++;
        }else if(board[row - i][col+i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0 && row + i < DEFAULT_ROW; i++){
        if(board[row + i][col - i]=='O'){
            soQuanTa++;
        }else if(board[row + i][col-i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    if(soQuanDich == 2){
        return 0;
    }

    sum -= mangDiemPhongNgu[soQuanDich];
    sum += mangDiemTanCong[soQuanTa];
    return sum;
}

function pointAttack_cross2(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL && row + i < DEFAULT_ROW; i++){
        if(board[row + i][col + i]=='O'){
            soQuanTa++;
        }else if(board[row + i][col+i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0 && row - i >= 0; i++){
        if(board[row - i][col - i]=='O'){
            soQuanTa++;
        }else if(board[row - i][col-i]=='X'){
            soQuanDich++;
            break;
        }else
            break;
    }

    if(soQuanDich == 2){
        return 0;
    }

    sum -= mangDiemPhongNgu[soQuanDich];
    sum += mangDiemTanCong[soQuanTa];
    return sum;
}

function pointDefense_row(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL; i++){
        if(board[row][col + i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row][col+i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0; i++){
        if(board[row][col - i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row][col-i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    if(soQuanTa == 2){
        return 0;
    }

    sum += mangDiemPhongNgu[soQuanDich];
    return sum;
}

function pointDefense_col(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && row + i < DEFAULT_ROW; i++){
        if(board[row+i][col]=='O'){
            soQuanTa++;
            break;
        }else if(board[row+i][col]=='X'){
            soQuanDich++;
        }else
            break;
    }

    for(let i = 1; i < 6 && row - i >= 0; i++){
        if(board[row-i][col]=='O'){
            soQuanTa++;
            break;
        }else if(board[row-i][col]=='X'){
            soQuanDich++;
        }else
            break;
    }

    if(soQuanTa == 2){
        return 0;
    }

    sum += mangDiemPhongNgu[soQuanDich];
    return sum;
}

function pointDefense_cross1(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL && row - i >= 0; i++){
        if(board[row - i][col + i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row - i][col+i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0 && row + i < DEFAULT_ROW; i++){
        if(board[row + i][col - i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row + i][col-i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    if(soQuanTa == 2){
        return 0;
    }

    sum += mangDiemPhongNgu[soQuanDich];
    return sum;
}

function pointDefense_cross2(row, col) {
    let sum = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    for(let i = 1; i < 6 && col + i < DEFAULT_COL && row + i < DEFAULT_ROW; i++){
        if(board[row + i][col + i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row + i][col+i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    for(let i = 1; i < 6 && col - i >= 0 && row - i >= 0; i++){
        if(board[row - i][col - i]=='O'){
            soQuanTa++;
            break;
        }else if(board[row - i][col-i]=='X'){
            soQuanDich++;
        }else
            break;
    }

    if(soQuanTa == 2){
        return 0;
    }

    sum += mangDiemPhongNgu[soQuanDich];
    return sum;
}
start();
draw();

