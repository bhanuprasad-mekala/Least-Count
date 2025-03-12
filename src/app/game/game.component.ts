import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  noOfPlayers: number = 2;
  targetScore: number = 0;
  playerForm!: FormGroup;
  playerInfo!: FormArray;
  playerList: any[] = [];
  leaderboard: any[] = [];
  gameStarted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      playerDetails: this.fb.array([])
    });
    this.playerInfo = this.playerForm.get('playerDetails') as FormArray;
  }

  GetPlayerDetails() {
    return (this.playerForm.controls["playerDetails"] as FormArray).controls;
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.playerInfo.clear();
    for (var i = 0; i < this.noOfPlayers; i++) {
      this.playerInfo.push(this.fb.group({
        playerName: ['Player ' + (i + 1), Validators.required],
        currentScore: [0],
        totalScore: [0]
      }));
    }
    this.playerList = this.playerForm.value.playerDetails;
    this.leaderboard = [...this.playerList]; // Create a copy of playerList for leaderboard
  }

  updateTotalScore(i: any) {
    this.playerList[i].totalScore += Number(this.playerList[i].currentScore);
    this.playerList[i].currentScore = 0;
    var playerName = this.playerList[i].playerName;
    var index = this.leaderboard.findIndex((x: any) => x.playerName == playerName);
    if (index != -1) {
      this.leaderboard[index].totalScore = this.playerList[i].totalScore;
      this.leaderboard.sort((a, b) => a.totalScore - b.totalScore);
    }
    if (this.playerList[i].totalScore > this.targetScore) {
      this.playerList.splice(i, 1);
    }
    if(this.playerList.length == 1) {
      alert("Game Over! " + this.playerList[0].playerName + " wins the game.");
      this.playerForm.reset();
      this.targetScore = 0;
      this.noOfPlayers = 2;
      this.loadUsers();
      this.gameStarted = false;
    }
  }

  startGame() {
    this.gameStarted = true;
  }
}
