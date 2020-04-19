import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import $ from "jquery";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
class Sudoku extends Component {
  state = {
    grid: "None",
    gridValue: {},
    button: "Submit"
  };
  chooseGrid = event => {
    this.setState({ grid: event.target.value, button: "Submit" });
    this.makeGrid(event.target.value);
  };
  makeGrid = grid => {
    // var grid=this.state.grid;
    var row = [];
    var gridValue = {};
    for (var i = 0; i < grid; i++) {
      var col = [];
      for (var j = 0; j < grid; j++) {
        gridValue[i + "" + j] = 0;
        col.push(
          <TextField
            onChange={this.fillText}
            style={{ width: 50, padding: "5px 5px 5px 5px" }}
            id={i + "" + j}
            label=""
            // value={this.state.gridValue[i+''+j]}
            variant="outlined"
          />
        );
      }
      row.push(<div>{col}</div>);
    }
    this.setState({ row: row, gridValue: gridValue });
    // return row;
  };
  fillText = event => {
    var id = event.target.id;
    var gridValue = this.state.gridValue;
    gridValue[id] = event.target.value;
    this.setState({ gridValue: gridValue, button: "Submit" });
    // console.log(gridValue)
  };
  solveSudoku = () => {
    var gridSize = this.state.grid;
    var gridValue = this.state.gridValue;
    var row = [];
    for (var i = 0; i < gridSize; i++) {
      var col = [];
      for (var j = 0; j < gridSize; j++) {
        var color = gridValue[i + "" + j] !== 0 ? "blue" : "pink";
        col.push(
          <Card
            id={i + "" + j}
            style={{
              maxWidth: 50,
              minWidth: 50,
              marginLeft: 25,
              marginTop: 25,
              backgroundColor: color
            }}
          >
            <CardContent style={{ maxHeight: 50 }}>
              {this.state.gridValue[i + "" + j]}
            </CardContent>
          </Card>
        );
      }
      row.push(
        <div style={{ display: "flex", textAlign: "center" }}>{col}</div>
      );
    }
    this.setState({ row: row });
    var arr = new Array(gridSize);
    for (var i = 0; i < gridSize; i++) arr[i] = new Array(gridSize);

    for (var i = 0; i < gridSize; i++) {
      for (j = 0; j < gridSize; j++) {
        if (gridValue[i + "" + j]) arr[i][j] = +gridValue[i + "" + j];
        else arr[i][j] = -1;
      }
    }
    const checkRow = (row, val) => {
      for (var i = 0; i < gridSize; i++) {
        if (arr[row][i] === val) return false;
      }
      return true;
    };
    const checkCol = (col, val) => {
      for (var i = 0; i < gridSize; i++) {
        if (arr[i][col] === val) return false;
      }
      return true;
    };
    const checkGrid = (r, c, val) => {
      for (var i = r; i < r + Math.sqrt(gridSize); i++)
        for (var j = c; j < c + Math.sqrt(gridSize); j++) {
          if (arr[i][j] === val) return false;
        }
      return true;
    };
    const solve = it => {
      var checkFull = true;
      var row, col;
      for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++)
          if (arr[i][j] === -1) {
            checkFull = false;
            row = i;
            col = j;
            break;
          }
        if (checkFull === false) break;
      }
      if (checkFull) return true;
      for (var k = 1; k < gridSize + 1; k++) {
        if (
          checkRow(row, k) &&
          checkCol(col, k) &&
          checkGrid(
            row - (row % Math.sqrt(gridSize)),
            col - (col % Math.sqrt(gridSize)),
            k
          )
        ) {
          // cout<<'r';
          arr[row][col] = k;
          if (solve(it)) return true;
        }
      }
      arr[row][col] = -1;
      return false;
    };
    var it = 1;
    solve(it);
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        gridValue[i + "" + j] = arr[i][j];
        // $("#00").text("2");
      }
    }
    this.setState({ gridValue: gridValue, button: "Solve" });
    // console.log(gridValue);
  };
  render() {
    return (
      <div>
        <Chip
          style={{ marginTop: 5 }}
          color="Primary"
          label={"Sudoke Solver"}
        />
        <div>
          <Chip
            style={{ marginTop: 5 }}
            color="secondary"
            label={
              "This App will solve the sudoku for given NxN Size by selecting a permutation of between 1 to N"
            }
          />
        </div>
        <div>
          <Chip
            style={{ marginTop: 5, marginBottom: 50 }}
            color="secondary"
            label={"Fill any grid or LEAVE it"}
          />
        </div>
        <div>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.state.grid}
            onChange={this.chooseGrid}
            label="Grid"
            style={{ marginBottom: 25 }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value={4}>4x4</MenuItem>
            <MenuItem value={9}>9x9</MenuItem>
            <MenuItem value={16}>16x16</MenuItem>
          </Select>
        </div>
        {/* <p id='11'>hg</p> */}
        {/* <Card style={{maxWidth:50}}> */}
        {/* <CardContent style={{maxHeight:50}} id='12'>18</CardContent> */}
        {/* </Card> */}
        {this.state.row ? (
          <div style={{ display: "inline-block" }}>{this.state.row}</div>
        ) : null}
        <div>
          <Fab variant="extended" onClick={this.solveSudoku}>
            {this.state.button}
          </Fab>
        </div>
      </div>
    );
  }
}
export default Sudoku;
